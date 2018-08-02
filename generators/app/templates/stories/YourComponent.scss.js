import React from 'react';
import { storiesOf } from '@storybook/react';
import YourComponent from '../src/components/yourComponent';
import '../src/styles/yourComponent.scss';

storiesOf('YourComponent', module)
  .add('default', () => (
    <YourComponent someProp="hello!" />
  ));
