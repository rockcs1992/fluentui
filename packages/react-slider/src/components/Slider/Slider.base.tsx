import * as React from 'react';
import { FocusRects } from '@fluentui/utilities';
import { ISliderProps } from './Slider.types';
import { Label } from '@fluentui/react-internal/lib/Label';
import { useSlider } from './useSlider';
import { useWarnings } from '@fluentui/react-hooks';

const COMPONENT_NAME = 'SliderBase';
export const ONKEYDOWN_TIMEOUT_DURATION = 1000;

export const SliderBase: React.FunctionComponent<ISliderProps> = React.forwardRef<HTMLDivElement, ISliderProps>(
  (props, ref) => {
    const slotProps = useSlider(props, ref);

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
      useWarnings({
        name: COMPONENT_NAME,
        props,
        mutuallyExclusive: { value: 'defaultValue' },
      });
    }

    return (
      <div {...slotProps.root}>
        {slotProps && <Label {...slotProps.label} />}
        <div {...slotProps.container}>
          {slotProps.valueLabel &&
            props.ranged &&
            (props.vertical ? <Label {...slotProps.valueLabel} /> : <Label {...slotProps.lowerValueLabel} />)}
          <div {...slotProps.sliderBox}>
            <div {...slotProps.sliderLine}>
              {props.ranged && <span {...slotProps.lowerValueThumb} />}
              <span {...slotProps.thumb} />
              {slotProps.zeroTick && <span {...slotProps.zeroTick} />}
              <span {...slotProps.bottomInactiveTrack} />
              <span {...slotProps.activeTrack} />
              <span {...slotProps.topInactiveTrack} />
            </div>
          </div>
          {slotProps.valueLabel && props.ranged && props.vertical ? (
            <Label {...slotProps.lowerValueLabel} />
          ) : (
            <Label {...slotProps.valueLabel} />
          )}
        </div>
        <FocusRects />
      </div>
    ) as React.ReactElement<{}>;
  },
);
SliderBase.displayName = COMPONENT_NAME;
