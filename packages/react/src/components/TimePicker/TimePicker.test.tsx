import * as React from 'react';
import { TimePicker } from './TimePicker';
import { create } from '@fluentui/utilities/lib/test';
import { mount } from 'enzyme';
import { IComboBox } from '../ComboBox/ComboBox.types';

describe('TimePicker', () => {
  it('renders correctly', () => {
    const component = create(<TimePicker label="I am a TimePicker" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('generates the formatted option', () => {
    const onFormatDate = (date: Date) => {
      return 'custom date option';
    };
    const timePicker = React.createRef<IComboBox>();

    mount(<TimePicker label="I am a TimePicker" onFormatDate={onFormatDate} componentRef={timePicker} />);
    expect(timePicker!.current!.selectedOptions[0].text).toBe('custom date option');
  });
});
