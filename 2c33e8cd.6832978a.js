(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{125:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return u}));var r=n(2),i=n(6),o=(n(0),n(219)),a={id:"pointer-events",title:"Pointer Events"},c={id:"styles/interactivity/pointer-events",isDocsHomePage:!1,title:"Pointer Events",description:"React Native",source:"@site/docs/styles/interactivity/pointer-events.mdx",permalink:"/tw-rn/docs/styles/interactivity/pointer-events",editUrl:"https://github.com/tw-rn/tw-rn/edit/master/packages/documentation/docs/styles/interactivity/pointer-events.mdx",sidebar:"sidebar",previous:{title:"Outline",permalink:"/tw-rn/docs/styles/interactivity/outline"},next:{title:"Resize",permalink:"/tw-rn/docs/styles/interactivity/resize"}},p=[{value:"React Native",id:"react-native",children:[]},{value:"React Native Web",id:"react-native-web",children:[]}],s={rightToc:p};function u(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h3",{id:"react-native"},"React Native"),Object(o.b)("p",null,"Not supported."),Object(o.b)("h3",{id:"react-native-web"},"React Native Web"),Object(o.b)("p",null,"Not supported."))}u.isMDXComponent=!0},219:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return v}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=i.a.createContext({}),u=function(e){var t=i.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},l=function(e){var t=u(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,a=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),l=u(n),d=r,v=l["".concat(a,".").concat(d)]||l[d]||f[d]||o;return n?i.a.createElement(v,c(c({ref:t},s),{},{components:n})):i.a.createElement(v,c({ref:t},s))}));function v(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var s=2;s<o;s++)a[s]=n[s];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);