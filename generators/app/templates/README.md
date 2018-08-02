# Your Package Name Here

This is a library for...

## Install

`npm install <package name>`

To use a specific component add the following code:

```javascript
import YourComponent from '<packageName>/lib/components/YourComponent';

const Example = () => {
  return <YourComponent />;
};
```

To include the styles, you can include the styles in a JavaScript file:

```javascript
import '<packageName>/lib/styles/your-component.scss';
```

Or in a SCSS file:

```css
@import '~<packageName>/lib/styles/your-component';
```

## Components

### YourComponent

```javascript
<YourComponent someProp="blah" />
```

#### Props

Name | Description | Default
--- | --- | ---
`someProp` | A property | 

## Contribute

You're welcome to contribute to this library, but please talk to the ______ team first and include all team members on any pull requests.

This library includes storybook, so you can test any changes.

1. Install all dependencies: `npm install`
1. Run storybook: `npm run start`
1. Navigate to example page at http://localhost:9001