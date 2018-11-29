import React from 'react';
import {ComboBoxOption} from 'ui/components/controls/ComboBoxControl';
import {ComboBoxField} from './Fields';

export default function BooleanChoice(props) {
  return <ComboBoxField {...props}>
    <ComboBoxOption value=''>{'<none>'}</ComboBoxOption>
    <ComboBoxOption value={'INTERSECT'}>intersect</ComboBoxOption>
    <ComboBoxOption value={'SUBTRACT'}>subtract</ComboBoxOption>
    <ComboBoxOption value={'UNION'}>union</ComboBoxOption>
  </ComboBoxField>
}