import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/YourComponent.js');
}

configure(loadStories, module);
