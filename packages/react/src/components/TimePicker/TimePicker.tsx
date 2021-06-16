import * as React from 'react';
import { ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react/lib/ComboBox';
import { TimeConstants } from '@fluentui/date-time-utilities';
import { ITimePickerProps, TimeRange } from './TimePicker.types';

// Valid KeyChars for user input
const KEYCHAR_0 = 48;
const KEYCHAR_COLON = 58;
const KEYCHAR_SPACE = 32;
const KEYCHAR_A = 65;
const KEYCHAR_M = 77;
const KEYCHAR_P = 80;

export const TimePicker = ({
  label,
  increments = 30,
  showSeconds = false,
  allowFreeform = true,
  useHour12 = false,
  timeRange = { start: -1, end: -1 },
  onFormatDate,
  onValidateUserInput,
  ...rest
}: ITimePickerProps) => {
  const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>(0);
  const [userText, setUserText] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const defaultTime = generateDefaultTime(increments, timeRange);
  const optionsCount = getDropdownOptionsCount(increments, timeRange);
  const timePickerOptions: IComboBoxOption[] = Array(optionsCount)
    .fill(0)
    .map((_, index) => {
      const option = addMinutesToDate(defaultTime, increments * index);
      option.setSeconds(0);
      return {
        key: index,
        text: onFormatDate ? onFormatDate(option) : `${formatTimeString(option, showSeconds, useHour12)}`,
      };
    });

  const onChange = React.useCallback(
    (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
      let key = option?.key;
      let updatedUserText = '';
      let errorMessage = '';
      if (value) {
        if (allowFreeform && !option) {
          if (!onFormatDate) {
            // Validate only if user did not add onFormatDate
            errorMessage = validateUserInput(value, showSeconds, useHour12);
          } else {
            // Use user provided validation if onFormatDate is provided
            if (onValidateUserInput) {
              errorMessage = onValidateUserInput(value);
            }
          }
        }
        updatedUserText = value;
      } else if (option) {
        updatedUserText = option.text;
      }

      setErrorMessage(errorMessage);
      setUserText(updatedUserText);
      setSelectedKey(key);
    },
    [allowFreeform], // TODO: not sure if we need this dependency list...
  );

  const evaluatePressedKey = (event: React.KeyboardEvent<IComboBox>) => {
    if (
      !onFormatDate &&
      // Only permit input of digits, space, colon, A/P/M characters
      !(
        (event.charCode >= KEYCHAR_0 && event.charCode <= KEYCHAR_COLON) ||
        event.charCode === KEYCHAR_SPACE ||
        event.charCode === KEYCHAR_A ||
        event.charCode === KEYCHAR_M ||
        event.charCode === KEYCHAR_P
      )
    ) {
      event.preventDefault();
    }
  };

  const validateUserInput = (userInput: string, showSeconds: boolean, useHour12: boolean): string => {
    let errorMessage = '';
    let regexString;
    if (useHour12) {
      regexString = showSeconds
        ? /((1[0-2]|0?[1-9]):([0-5][0-9]):(?:[0-5]\d) ?([AaPp][Mm]))$/
        : /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$/;
    } else {
      regexString = showSeconds
        ? /([0-9]|0[0-9]|1[0-9]|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/
        : /([0-9]|0[0-9]|1[0-9]|2[0-3]):(?:[0-5]\d)$/;
    }
    if (!regexString.test(userInput)) {
      let useHour12ErrorMessage = useHour12 ? '12-hour' : '24-hour';
      showSeconds
        ? (errorMessage = `TimePicker format must be valid and in the ${useHour12ErrorMessage} format hh:mm:ss A.`)
        : (errorMessage = `TimePicker format must be valid and in the ${useHour12ErrorMessage} format hh:mm A.`);
    }
    return errorMessage;
  };

  const comboBoxRef = React.useRef<IComboBox>(null);

  return (
    <div>
      <ComboBox
        allowFreeform={allowFreeform}
        componentRef={comboBoxRef}
        selectedKey={selectedKey}
        label={label}
        errorMessage={errorMessage}
        options={timePickerOptions}
        onChange={onChange}
        text={userText}
        onKeyPress={evaluatePressedKey}
        {...rest}
      />
    </div>
  );
};

const generateDefaultTime = (increments: number, timeRange: TimeRange) => {
  const defaultTime = new Date();
  if (timeRange.start >= 0) {
    defaultTime.setHours(timeRange.start);
  }
  if (!(TimeConstants.MinutesInOneHour % increments)) {
    const minute = roundMinute(defaultTime.getMinutes(), increments);
    if (minute) {
      defaultTime.setMinutes(minute);
    }
  }
  return defaultTime;
};

const roundMinute = (minute: number, increments: number) => {
  if (minute === 0) return minute;
  const times = TimeConstants.MinutesInOneHour / increments;
  let rounded;
  for (let i = 1; i <= times; i++) {
    if (minute > increments * (i - 1) && minute <= increments * i) {
      rounded = increments * i;
      return rounded;
    }
  }
};

const getDropdownOptionsCount = (increments: number, timeRange: TimeRange) => {
  let hoursInRange = TimeConstants.HoursInOneDay;
  if (timeRange.start >= 0 && timeRange.end >= 0) {
    if (timeRange.start > timeRange.end) hoursInRange = TimeConstants.HoursInOneDay - timeRange.start - timeRange.end;
    else if (timeRange.end > timeRange.start) hoursInRange = timeRange.end - timeRange.start;
  }
  return Math.floor((TimeConstants.MinutesInOneHour * hoursInRange) / increments);
};

// This functions should be moved to date-time-utilities eventually
const addMinutesToDate = (date: Date, minutes: number): Date => {
  const result = new Date(date.getTime());
  result.setTime(result.getTime() + minutes * TimeConstants.MinutesInOneHour * TimeConstants.MillisecondsIn1Sec);
  return result;
};

// This functions needs to be reimplemented later with proper handling of user region/timezone
const formatTimeString = (date: Date, showSeconds: boolean, useHour12: boolean): string => {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
    hour12: useHour12,
  });
};
