# tw-rn

#### 🚧 [WIP] Experimental - Not ready for production. Use at you own risk 🚧

tw-rn is a library that transpiles TaiwindCSS to React Native and React Native web Styles.

The difference between the current solutions is that these are already pre-compiled or harcoded. The intent of this library is to be able to use TailwindCSS and at the same time keeping the flexibility that TailwindCSS brings with the `tailwind.config.js` and also be able to declare your own classes in a .css file.

### Usage

**Note** For now only `<View/>` and `<Text/>` are supported.

```jsx
import "./app.css";
import React from "react";
import { tw, Text, View } from "tw-rn";

export default function App() {
  return (
    <View style={tw`justify-center items-center flex`}>
      <View style={tw`bg-green-500 p-4 h-32 w-32 rounded-lg justify-center`}>
        <Text style={tw`text-white text-center`}>Open up App.js to start working on your app!</Text>
      </View>
    </View>
  );
}
```

### Installation

**This is a work in progress**

#### Expo Only

1. Installation

```shell
# Using npm
npm install tw-rn
npm install --save-dev @tw-rn/transformer

# Using Yarn
yarn add tw-rn
yarn add -D @tw-rn/transformer
```

2. Create file `app.css` and copy and paste this code:

```css
/* We don't need @tailwind base*/
@tailwind components;
@tailwind utilities;

/* Temporary flex polyfill */
.flex {
  flex: 1;
}
```

3. create a `metro.config.js` if is not created and copy and paste this code:

```js
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve("@tw-rn/transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "css"),
      sourceExts: [...sourceExts, "css"],
    },
  };
})();
```

4. In your `app.json` file change or add this line

```diff
{
  "expo": {
    "name": "tw-rn-expo",
    "slug": "tw-rn-expo",
    "platforms": ["ios", "android", "web"],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
+    "packagerOpts": {
+      "config": "./metro.config.js",
+      "sourceExts": ["js", "jsx", "ts", "tsx", "css"]
+    }
  }
}
```

5. Add `app.css` to your entry point.

6. You can test the installation running `yarn start`

#### Expo + Web

TBD

#### React Native

TBD

### Styles

Below you can find the supported styles.

**Note** Breakpoints won't work in React Native, only in React Native Web

#### Layout

<!-- prettier-ignore-start -->
| Name                        | Core plugin      | Supported in    | Supported React Native classes                                                                                                                                            | Supported React Native Web classes                                                                                                                                                                                                              |
| --------------------------- | ---------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Container                   | `container`      | `native` `web`  | `container`                                                                                                                                                               | `container`                                                                                                                                                                                                                                     |
| Box Sizing                  | `boxSizing`      | `web`           |                                                                                                                                                                           | `box-border` `box-content`                                                                                                                                                                                                                      |
| Display                     | `display`        | `native` `web`  | `hidden` `flex`                                                                                                                                                           | `hidden` `flex` `block` `flow-root` `inline-block` `inline` `inline-flex` `grid` `inline-grid` `table` `table-caption` `table-cell` `table-column` `table-column-group` `table-footer-group` `table-header-group` `table-row-group` `table-row` |
| Float                       | `float`          | _not supported_ |                                                                                                                                                                           |                                                                                                                                                                                                                                                 |
| Clear                       | `clear`          | _not supported_ |                                                                                                                                                                           |                                                                                                                                                                                                                                                 |
| Object Fit                  | `objectFit`      | _not supported_ |                                                                                                                                                                           |                                                                                                                                                                                                                                                 |
| Object Position             | `objectPosition` | _not supported_ |                                                                                                                                                                           |                                                                                                                                                                                                                                                 |
| Overflow                    | `overflow`       | `native` `web`  | `overflow-hidden` `overflow-visible` `overflow-scroll`                                                                                                                    | `overflow-hidden` `overflow-visible` `overflow-scroll`                                                                                                                                                                                          |
| Position                    | `position`       | `native` `web`  | `absolute` `relative`                                                                                                                                                     | `static` `fixed` `absolute` `relative` `sticky`                                                                                                                                                                                                 |
| Top / Right / Bottom / Left | `inset`          | `native` `web`  | `inset-{number|string}` `inset-y-{number|string}` `inset-x-{number|string}` `top-{number|string}` `right-{number|string}` `bottom-{number|string}` `left-{number|string}` | `inset-{number|string}` `inset-y-{number|string}` `inset-x-{number|string}` `top-{number|string}` `right-{number|string}` `bottom-{number|string}` `left-{number|string}` `inset-auto`                                                          |
| Visibility                  | `visibility`     | `web`           |                                                                                                                                                                           | `visible` `invisible`                                                                                                                                                                                                                           |
| Z-Index                     | `zIndex`         | `native` `web`  | `z-{number|string}`                                                                                                                                                       | `z-{number|string}`                                                                                                                                                                                                                             |
<!-- prettier-ignore-end -->

#### Flexbox

<!-- prettier-ignore-start -->
| Name                | Core plugin      | Supported in    | Supported React Native classes                                                    | Supported React Native Web classes                                                |
| ------------------- | ---------------- | --------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Flex Direction      | `flexDirection`  | `native` `web`  | `flex-row` `flex-row-reverse` `flex-col` `flex-col-reverse`                       | `flex-row` `flex-row-reverse` `flex-col` `flex-col-reverse`                       |
| Flex Wrap           | `flexWrap`       | `native` `web`  | `flex-no-wrap` `flex-wrap` `flex-wrap-reverse`                                    | `flex-no-wrap` `flex-wrap` `flex-wrap-reverse`                                    |
| Align Items         | `alignItems`     | `native` `web`  | `items-stretch` `items-start` `items-center` `items-end` `items-baseline`         | `items-stretch` `items-start` `items-center` `items-end` `items-baseline`         |
| Align Content [1]   | `alignContent`   | `native` `web`  | `content-start` `content-center` `content-end` `content-between` `content-around` | `content-start` `content-center` `content-end` `content-between` `content-around` |
| Align Self          | `alignSelf`      | `native` `web`  | `self-auto` `self-start` `self-center` `self-end` `self-stretch`                  | `self-auto` `self-start` `self-center` `self-end` `self-stretch`                  |
| Justify Content [2] | `justifyContent` | `native` `web`  | `justify-start` `justify-center` `justify-end` `justify-between` `justify-around` | `justify-start` `justify-center` `justify-end` `justify-between` `justify-around` |
| Flex [3]            | `flex`           | _not supported_ |                                                                                   |                                                                                   |
| Flex Grow           | `flexGrow`       | `native` `web`  | `flex-grow` `flex-grow-{number|string}`                                           | `flex-grow` `flex-grow-{number|string}`                                           |
| Flex Shrink         | `flexShrink`     | `native` `web`  | `flex-shrink` `flex-shrink-{number|string}`                                       | `flex-shrink` `flex-shrink-{number|string}`                                       |
| Order               | `order`          | _not supported_ |                                                                                   |                                                                                   |
<!-- prettier-ignore-end -->

1. **stretch** _property needs to be implemented_
2. **space-evenly** _property needs to be implemented_
3. _**Flex** needs to be reimplemented completely. In the meantime use the style directly_ `{ flex: number }`

#### Grid

<!-- prettier-ignore-start -->
| Name                         | Core plugin                                    | Supported in    | Supported React Native classes | Supported React Native Web classes |
| ---------------------------- | ---------------------------------------------- | --------------- | ------------------------------ | ---------------------------------- |
| Grid Template Columns        | `gridTemplateColumns`                          | _not supported_ |                                |                                    |
| Grid Column Start / End      | `gridColumn` `gridColumnStart` `gridColumnEnd` | _not supported_ |                                |                                    |
| Grid Template Rows           | `gridTemplateRows`                             | _not supported_ |                                |                                    |
| Grid Row Start / End         | `gridRow` `gridRowStart` `gridRowEnd`          | _not supported_ |                                |                                    |
| Gap                          | `gap`                                          | _not supported_ |                                |                                    |
| Grid Auto Flow               | `gridAutoFlow`                                 | _not supported_ |                                |                                    |
<!-- prettier-ignore-end -->

#### Spacing

<!-- prettier-ignore-start -->
| Name          | Core plugin | Supported in    | Supported React Native classes                                                                                                                                                                                                                                                                             | Supported React Native Web classes                                                                                                                                                                                                                                                                         |
| ------------- | ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Padding [1]   | `padding`   | `native` `web`  | `p-{number|string}` `py-{number|string}` `px-{number|string}` `pt-{number|string}` `pr-{number|string}` `pb-{number|string}` `pl-{number|string}`                                                                                                                                                          | `p-{number|string}` `py-{number|string}` `px-{number|string}` `pt-{number|string}` `pr-{number|string}` `pb-{number|string}` `pl-{number|string}`                                                                                                                                                          |
| Margin [2]    | `margin`    | `native` `web`  | `m-{number|string}` `-m-{number|string}` `my-{number|string}` `-my-{number|string}` `mx-{number|string}` `-mx-{number|string}` `mt-{number|string}` `-mt-{number|string}` `mr-{number|string}` `-mr-{number|string}` `mb-{number|string}` `-mb-{number|string}` `ml-{number|string}` `-ml-{number|string}` | `m-{number|string}` `-m-{number|string}` `my-{number|string}` `-my-{number|string}` `mx-{number|string}` `-mx-{number|string}` `mt-{number|string}` `-mt-{number|string}` `mr-{number|string}` `-mr-{number|string}` `mb-{number|string}` `-mb-{number|string}` `ml-{number|string}` `-ml-{number|string}` |
| Space Between | `space`     | _not supported_ |                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                            |
<!-- prettier-ignore-end -->

1. **padding-start** _and_ **padding-end** _properties needs to be implemented_
2. **margin-start** _and_ **margin-end** _properties needs to be implemented_

#### Sizing

<!-- prettier-ignore-start -->
| Name       | Core plugin | Supported in   | Supported React Native classes            | Supported React Native Web classes        |
| ---------- | ----------- | -------------- | ----------------------------------------- | ----------------------------------------- |
| Width      | `width`     | `native` `web` | `w-{number|string}` _no `screen` `auto`_  | `w-{number|string}`  _no `screen` `auto`_ |
| Min-Width  | `minWidth`  | `native` `web` | `min-w-{number|string}`                   | `min-w-{number|string}`                   |
| Max Width  | `maxWidth`  | `native` `web` | `max-w-{number|string}` _no `none`_       | `max-w-{number|string}` _no `none`_       |
| Height     | `height`    | `native` `web` | `h-{number|string}`  _no `screen` `auto`_ | `h-{number|string}`  _no `screen` `auto`_ |
| Min-Height | `minHeight` | `native` `web` | `min-h-{number|string}` _no `screen`_     | `min-h-{number|string}` _no `screen`_     |
| Max Height | `maxHeight` | `native` `web` | `max-h-{number|string}` _no `screen`_     | `max-h-{number|string}` _no `screen`_     |
<!-- prettier-ignore-end -->

#### Typography

<!-- prettier-ignore-start -->
| Name                   | Core plugin          | Supported in    | Supported React Native classes                                                                                                 | Supported React Native Web classes                                                                                             |
| ---------------------- | -------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Font Family            | `fontFamily`         | _not supported_ |                                                                                                                                |                                                                                                                                |
| Font Size              | `fontSize`           | `native` `web`  | `text-{string}`                                                                                                                | `text-{string}`                                                                                                                |
| Font Smoothing         | `fontSmoothing`      | _not supported_ |                                                                                                                                |                                                                                                                                |
| Font Style             | `fontStyle`          | `native` `web`  | `italic` `not-italic`                                                                                                          | `italic` `not-italic`                                                                                                          |
| Font Weight            | `fontWeight`         | `native` `web`  | `font-hairline` `font-thin` `font-light` `font-normal` `font-medium` `font-semibold` `font-bold` `font-extrabold` `font-black` | `font-hairline` `font-thin` `font-light` `font-normal` `font-medium` `font-semibold` `font-bold` `font-extrabold` `font-black` |
| Letter Spacing         | `letterSpacing`      | `native` `web`  | `tracking-{string}`                                                                                                            | `tracking-{string}`                                                                                                            |
| Line Height            | `lineHeight`         | `native` `web`  | `leading-{number|string}` _no `tight` `snug` `normal` `relaxed` `loose`_                                                       | `leading-{number|string}` _no `tight` `snug` `normal` `relaxed` `loose`_                                                       |
| List Style Type        | `listStyleType`      | _not supported_ |                                                                                                                                |                                                                                                                                |
| List Style Position    | `listStylePosition`  | _not supported_ |                                                                                                                                |                                                                                                                                |
| Placeholder Color [1]  | `placeholderColor`   | _not supported_ |                                                                                                                                |                                                                                                                                |
| Placeholder Opacity    | `placeholderOpacity` | _not supported_ |                                                                                                                                |                                                                                                                                |
| Text Alignment         | `textAlign`          | `native` `web`  | `text-left` `text-center` `text-right`                                                                                         | `text-left` `text-center` `text-right`                                                                                         |
| Text Color             | `textColor`          | `native` `web`  | `text-{color}` _no `current`_                                                                                                  | `text-{color}` _no `current`_                                                                                                  |
| Text Opacity           | `textOpacity`        | _not supported_ |                                                                                                                                |                                                                                                                                |
| Text Decoration [2]    | `textDecoration`     | _not supported_ |                                                                                                                                |                                                                                                                                |
| Text Transform         | `textTransform`      | `native` `web`  | `uppercase` `lowercase` `capitalize` `normal-case`                                                                             | `uppercase` `lowercase` `capitalize` `normal-case`                                                                             |
| Vertical Alignment [3] | `verticalAlign`      | _not supported_ |                                                                                                                                |                                                                                                                                |
| Whitespace             | `whitespace`         | _not supported_ |                                                                                                                                |                                                                                                                                |
| Word Break             | `wordBreak`          | _not supported_ |                                                                                                                                |                                                                                                                                |
<!-- prettier-ignore-end -->

1. _**Placeholder Color** needs to be reimplemented completely. In the meantime use the style directly_ `{ placeholderTextColor: color }`
2. _**Text Decoration** needs to be reimplemented completely. In the meantime use the style directly_ `{ textDecorationStyle: string }`
3. _**Vertical Alignment** needs to be reimplemented completely. In the meantime use the style directly_ `{ textAlignVertical: string }`

#### Backgrounds

<!-- prettier-ignore-start -->
| Name                  | Core plugin            | Supported in    | Supported React Native classes | Supported React Native Web classes |
| --------------------- | ---------------------- | --------------- | ------------------------------ | ---------------------------------- |
| Background Attachment | `backgroundAttachment` | _not supported_ |                                |                                    |
| Background Color      | `backgroundColor`      | `native` `web`  | `bg-{color}` _no `current`_    | `bg-{color}` _no `current`_        |
| Background Opacity    | `backgroundOpacity`    | _not supported_ |                                |                                    |
| Background Position   | `backgroundPosition`   | _not supported_ |                                |                                    |
| Background Repeat     | `backgroundRepeat`     | _not supported_ |                                |                                    |
| Background Size       | `backgroundSize`       | _not supported_ |                                |                                    |
<!-- prettier-ignore-end -->

#### Borders

<!-- prettier-ignore-start -->
| Name           | Core plugin     | Supported in    | Supported React Native classes                                      | Supported React Native Web classes                                  |
| -------------- | --------------- | --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Border Radius  | `borderRadius`  | `native` `web`  | `rounded` `rounded-{string}`                                        | `rounded` `rounded-{string}`                                        |
| Border Width   | `borderWidth`   | `native` `web`  | `border` `border-{string|number}`                                   | `border` `border-{string|number}`                                   |
| Border Color   | `borderColor`   | `native` `web`  | `border` `border-{string|number}`                                   | `border` `border-{string|number}`                                   |
| Border Opacity | `borderOpacity` | _not supported_ |                                                                     |                                                                     |
| Border Style   | `borderStyle`   | `native` `web`  | 'border-solid' 'border-dashed' 'border-dotted' _no `double` `none`_ | 'border-solid' 'border-dashed' 'border-dotted' _no `double` `none`_ |
| Divide Width   | `divideWidth`   | _not supported_ |                                                                     |                                                                     |
| Divide Color   | `divideColor`   | _not supported_ |                                                                     |                                                                     |
| Divide Opacity | `divideOpacity` | _not supported_ |                                                                     |                                                                     |
<!-- prettier-ignore-end -->

#### Tables

<!-- prettier-ignore-start -->
| Name            | Core plugin      | Supported in    | Supported React Native classes | Supported React Native Web classes |
| --------------- | ---------------- | --------------- | ------------------------------ | ---------------------------------- |
| Border Collapse | `borderCollapse` | _not supported_ |                                |                                    |
| Table Layout    | `tableLayout`    | _not supported_ |                                |                                    |
<!-- prettier-ignore-end -->

#### Effects

<!-- prettier-ignore-start -->
| Name       | Core plugin   | Supported in    | Supported React Native classes | Supported React Native Web classes |
| ---------- | ------------- | --------------- | ------------------------------ | ---------------------------------- |
| Box Shadow | `boxShadow`   | _not supported_ |                                |                                    |
| Opacity    | `tableLayout` | `native` `web`  | `opactity-{number}`            | `opactity-{number}`                |
<!-- prettier-ignore-end -->

#### Transitions

<!-- prettier-ignore-start -->
| Name                       | Core plugin                | Supported in    | Supported React Native classes | Supported React Native Web classes |
| -------------------------- | -------------------------- | --------------- | ------------------------------ | ---------------------------------- |
| Transition Property        | `transitionProperty`       | _not supported_ |                                |                                    |
| Transition Duration        | `transitionDuration`       | _not supported_ |                                |                                    |
| Transition Timing Function | `transitionTimingFunction` | _not supported_ |                                |                                    |
| Transition Delay           | `transitionDelay`          | _not supported_ |                                |                                    |
<!-- prettier-ignore-end -->

#### Transforms

<!-- prettier-ignore-start -->
| Name             | Core plugin       | Supported in    | Supported React Native classes | Supported React Native Web classes |
| ---------------- | ----------------- | --------------- | ------------------------------ | ---------------------------------- |
| Scale            | `scale`           | _not supported_ |                                |                                    |
| Rotate           | `rotate`          | _not supported_ |                                |                                    |
| Translate        | `translate`       | _not supported_ |                                |                                    |
| Skew             | `skew`            | _not supported_ |                                |                                    |
| Transform Origin | `transformOrigin` | _not supported_ |                                |                                    |
<!-- prettier-ignore-end -->

#### Interactivity

<!-- prettier-ignore-start -->
| Name           | Core plugin     | Supported in    | Supported React Native classes | Supported React Native Web classes                                                                             |
| -------------- | --------------- | --------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Appearance     | `appearance`    | _not supported_ |                                |                                                                                                                |
| Cursor         | `cursor`        | `web`           |                                | `cursor-auto` `cursor-default` `cursor-pointer` `cursor-wait` `cursor-text` `cursor-move` `cursor-not-allowed` |
| Outline        | `outline`       | _not supported_ |                                |                                                                                                                |
| Pointer Events | `pointerEvents` | _not supported_ |                                |                                                                                                                |
| Resize         | `resize`        | _not supported_ |                                |                                                                                                                |
| User Select    | `userSelect`    | `web`           |                                | `select-none` `select-text` `select-all` `select-auto`                                                         |
<!-- prettier-ignore-end -->

#### SVG

<!-- prettier-ignore-start -->
| Name         | Core plugin   | Supported in    | Supported React Native classes | Supported React Native Web classes |
| ------------ | ------------- | --------------- | ------------------------------ | ---------------------------------- |
| Fill         | `fill`        | _not supported_ |                                |                                    |
| Stroke       | `stroke`      | _not supported_ |                                |                                    |
| Stroke Width | `strokeWidth` | _not supported_ |                                |                                    |
<!-- prettier-ignore-end -->

#### Accesibility

<!-- prettier-ignore-start -->
| Name           | Core plugin     | Supported in    | Supported React Native classes | Supported React Native Web classes |
| -------------- | --------------- | --------------- | ------------------------------ | ---------------------------------- |
| Screen readers | `accessibility` | _not supported_ |                                |                                    |
<!-- prettier-ignore-end -->
