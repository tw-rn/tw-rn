(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{215:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return j})),n.d(t,"metadata",(function(){return O})),n.d(t,"rightToc",(function(){return y})),n.d(t,"default",(function(){return h}));var a=n(2),r=n(6),i=n(0),o=n.n(i),c=n(220),l=n(229),s=n(223),p=n(192),u=n.n(p);const b=37,d=39;var m=function(e){const{block:t,children:n,defaultValue:a,values:r,groupId:c}=e,{tabGroupChoices:p,setTabGroupChoices:m}=Object(l.a)(),[f,g]=Object(i.useState)(a);if(null!=c){const e=p[c];null!=e&&e!==f&&r.some(t=>t.value===e)&&g(e)}const j=e=>{g(e),null!=c&&m(c,e)},O=[];return o.a.createElement("div",null,o.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(s.a)("tabs",{"tabs--block":t})},r.map(({value:e,label:t})=>o.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":f===e,className:Object(s.a)("tabs__item",u.a.tabItem,{"tabs__item--active":f===e}),key:e,ref:e=>O.push(e),onKeyDown:e=>((e,t,n)=>{switch(n.keyCode){case d:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case b:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(O,e.target,e),onFocus:()=>j(e),onClick:()=>j(e)},t))),o.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},i.Children.toArray(n).filter(e=>e.props.value===f)[0]))};var f=function(e){return o.a.createElement("div",null,e.children)};var g=({snackId:e,preview:t="true",height:n="400px"})=>(Object(i.useEffect)(()=>{window.ExpoSnack&&window.ExpoSnack.initialize()},[]),o.a.createElement("div",{"data-snack-id":e,"data-snack-platform":"web","data-snack-preview":t,"data-snack-theme":"dark",style:{overflow:"hidden",background:"#212733",border:"1px solid rgba(0,0,0,.08)",borderRadius:"4px",height:n,width:"100%"}})),j={id:"getting-started",title:"Getting Started"},O={id:"fundamentals/getting-started",isDocsHomePage:!1,title:"Getting Started",description:"There are two ways to use tw-rn, precompiled or regular.",source:"@site/docs/fundamentals/getting-started.mdx",permalink:"/tw-rn/docs/fundamentals/getting-started",editUrl:"https://github.com/tw-rn/tw-rn/edit/master/packages/documentation/docs/fundamentals/getting-started.mdx",sidebar:"sidebar",next:{title:"Usage",permalink:"/tw-rn/docs/fundamentals/usage"}},y=[{value:"Precompiled Installation",id:"precompiled-installation",children:[]},{value:"Regular Installation",id:"regular-installation",children:[{value:"Using Expo",id:"using-expo",children:[]},{value:"Using Expo + React Native Web",id:"using-expo--react-native-web",children:[]},{value:"Using React Native",id:"using-react-native",children:[]},{value:"Using React Native + React Native Web",id:"using-react-native--react-native-web",children:[]}]}],v={rightToc:y};function h(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},v,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"There are two ways to use ",Object(c.b)("strong",{parentName:"p"},"tw-rn"),", precompiled or regular."),Object(c.b)("p",null,"Precompiled gets you up and running faster, at the expense of customization. If you use the precompiled mode, you won't be able to modify any of the Tailwind styles. This is not recommended for use in web as is not optimized,"),Object(c.b)("p",null,"Regular installation means that your app is in charge of compiling TailwindCSS. It gives you the flexibility of having the ",Object(c.b)("inlineCode",{parentName:"p"},"tailwind.config.js")," and CSS files, but is a bit more difficult to set up."),Object(c.b)("h2",{id:"precompiled-installation"},"Precompiled Installation"),Object(c.b)(m,{groupId:"installer",defaultValue:"npm",values:[{label:"npm",value:"npm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},Object(c.b)(f,{value:"npm",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"npm install tw-rn @tw-rn/pre-compiled\n"))),Object(c.b)(f,{value:"yarn",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"yarn add tw-rn @tw-rn/pre-compiled\n")))),Object(c.b)("p",null,"Import ",Object(c.b)("inlineCode",{parentName:"p"},"@tw-rn/pre-compiled")," in your app entry point to load the styles. This only needds to be imported just once."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:'title="App.js"',title:'"App.js"'}),'import "@tw-rn/pre-compiled";\nimport * as React from "react";\n// ...\n')),Object(c.b)("p",null,"Then you can use the ",Object(c.b)("inlineCode",{parentName:"p"},"rn-tw")," package anywhere in your application."),Object(c.b)(g,{snackId:"@ericktamayo/tw-rn-precompiled",mdxType:"Snack"}),Object(c.b)("h2",{id:"regular-installation"},"Regular Installation"),Object(c.b)("h3",{id:"using-expo"},"Using Expo"),Object(c.b)("p",null,"Install the required packages in your Expo project:"),Object(c.b)(m,{groupId:"installer",defaultValue:"npm",values:[{label:"npm",value:"npm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},Object(c.b)(f,{value:"npm",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"npm install tw-rn\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"npm install --save-dev @tw-rn/transformer\n"))),Object(c.b)(f,{value:"yarn",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"yarn add tw-rn\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"yarn add -D @tw-rn/transformer\n")))),Object(c.b)("p",null,"Create file ",Object(c.b)("inlineCode",{parentName:"p"},"app.css")," and copy and paste the following code"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-css",metastring:'title="app.css"',title:'"app.css"'}),"/* We don't need @tailwind base*/\n@tailwind components;\n@tailwind utilities;\n\n/* Temporary flex polyfill */\n.flex {\n  flex: 1;\n}\n")),Object(c.b)("p",null,"Create or modify ",Object(c.b)("inlineCode",{parentName:"p"},"metro.config.js")," and copy and paste this code:"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:'title="metro.config.js"',title:'"metro.config.js"'}),'const { getDefaultConfig } = require("metro-config");\n\nmodule.exports = (async () => {\n  const {\n    resolver: { sourceExts, assetExts },\n  } = await getDefaultConfig();\n\n  return {\n    transformer: {\n      babelTransformerPath: require.resolve("@tw-rn/transformer"),\n    },\n    resolver: {\n      assetExts: assetExts.filter((ext) => ext !== "css"),\n      sourceExts: [...sourceExts, "css"],\n    },\n  };\n})();\n')),Object(c.b)("p",null,"In your app.json file change or add the ",Object(c.b)("inlineCode",{parentName:"p"},"packagerOpts")," property"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json",metastring:'title="app.json"',title:'"app.json"'}),'  "packagerOpts": {\n    "config": "./metro.config.js",\n    "sourceExts": ["js", "jsx", "ts", "tsx", "css"]\n  }\n')),Object(c.b)("p",null,"Add app.css to your entry point, in this case would be ",Object(c.b)("inlineCode",{parentName:"p"},"App.js")),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:'title="App.js"',title:'"App.js"'}),'import "./app.css";\nimport React from "react";\n// ...\n')),Object(c.b)("h3",{id:"using-expo--react-native-web"},"Using Expo + React Native Web"),Object(c.b)("p",null,"Coming soon."),Object(c.b)("h3",{id:"using-react-native"},"Using React Native"),Object(c.b)("p",null,"Coming soon."),Object(c.b)("h3",{id:"using-react-native--react-native-web"},"Using React Native + React Native Web"),Object(c.b)("p",null,"Coming soon."))}h.isMDXComponent=!0},220:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),p=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=p(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,m=u["".concat(o,".").concat(d)]||u[d]||b[d]||i;return n?r.a.createElement(m,c(c({ref:t},s),{},{components:n})):r.a.createElement(m,c({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},223:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}},228:function(e,t,n){"use strict";var a=n(0);const r=Object(a.createContext)({tabGroupChoices:{},setTabGroupChoices:()=>{},isAnnouncementBarClosed:!1,closeAnnouncementBar:()=>{}});t.a=r},229:function(e,t,n){"use strict";var a=n(0),r=n(228);t.a=function(){return Object(a.useContext)(r.a)}}}]);