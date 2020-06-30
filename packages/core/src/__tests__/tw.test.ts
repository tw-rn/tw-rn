import { TailwindReactNativeStyle } from "../types";
import { generate } from "../tw";

describe("tw", () => {
  it.each<[string[], TailwindReactNativeStyle]>([
    // Native platform pseudo selector
    [["bg-white"], { __: { native: { media: { "": { backgroundColor: "#ffffff" } } } } }],
    // Web platform pseudo selector
    [["web:bg-white"], { __: { web: { media: { "": { backgroundColor: "#ffffff" } } } } }],
    // Ios platform pseudo selector
    [["ios:bg-white"], { __: { ios: { media: { "": { backgroundColor: "#ffffff" } } } } }],
    // Android platform pseudo selector
    [["android:bg-white"], { __: { android: { media: { "": { backgroundColor: "#ffffff" } } } } }],
    // Invalid platform pseudo selector
    [["invalid:bg-white"], { __: {} }],
    // Native pseudo selector with media selectors
    [
      ["sm:bg-red"],
      { __: { native: { media: { "(min-width: 640px)": { backgroundColor: "#ff0000" } } } } },
    ],
    [
      ["md:bg-blue"],
      { __: { native: { media: { "(min-width: 768px)": { backgroundColor: "#00ff00" } } } } },
    ],
    [
      ["lg:bg-green"],
      { __: { native: { media: { "(min-width: 1024px)": { backgroundColor: "#0000ff" } } } } },
    ],
    [
      ["xl:bg-black"],
      { __: { native: { media: { "(min-width: 1280px)": { backgroundColor: "#000000" } } } } },
    ],
    [
      ["bg-white", "sm:bg-red", "md:bg-blue", "lg:bg-green", "xl:bg-black"],
      {
        __: {
          native: {
            media: {
              "": { backgroundColor: "#ffffff" },
              "(min-width: 640px)": { backgroundColor: "#ff0000" },
              "(min-width: 768px)": { backgroundColor: "#00ff00" },
              "(min-width: 1024px)": { backgroundColor: "#0000ff" },
              "(min-width: 1280px)": { backgroundColor: "#000000" },
            },
          },
        },
      },
    ],
    // Web platform with media pseudo selectors
    [
      ["web:sm:bg-red"],
      { __: { web: { media: { "(min-width: 640px)": { backgroundColor: "#ff0000" } } } } },
    ],
    [
      ["web:md:bg-blue"],
      { __: { web: { media: { "(min-width: 768px)": { backgroundColor: "#00ff00" } } } } },
    ],
    [
      ["web:lg:bg-green"],
      { __: { web: { media: { "(min-width: 1024px)": { backgroundColor: "#0000ff" } } } } },
    ],
    [
      ["web:xl:bg-black"],
      { __: { web: { media: { "(min-width: 1280px)": { backgroundColor: "#000000" } } } } },
    ],
    [
      ["web:bg-white", "web:sm:bg-red", "web:md:bg-blue", "web:lg:bg-green", "web:xl:bg-black"],
      {
        __: {
          web: {
            media: {
              "": { backgroundColor: "#ffffff" },
              "(min-width: 640px)": { backgroundColor: "#ff0000" },
              "(min-width: 768px)": { backgroundColor: "#00ff00" },
              "(min-width: 1024px)": { backgroundColor: "#0000ff" },
              "(min-width: 1280px)": { backgroundColor: "#000000" },
            },
          },
        },
      },
    ],
    // iOS platform with media pseudo selectors
    [
      ["ios:sm:bg-red"],
      { __: { ios: { media: { "(min-width: 640px)": { backgroundColor: "#ff0000" } } } } },
    ],
    [
      ["ios:md:bg-blue"],
      { __: { ios: { media: { "(min-width: 768px)": { backgroundColor: "#00ff00" } } } } },
    ],
    [
      ["ios:lg:bg-green"],
      { __: { ios: { media: { "(min-width: 1024px)": { backgroundColor: "#0000ff" } } } } },
    ],
    [
      ["ios:xl:bg-black"],
      { __: { ios: { media: { "(min-width: 1280px)": { backgroundColor: "#000000" } } } } },
    ],
    [
      ["ios:bg-white", "ios:sm:bg-red", "ios:md:bg-blue", "ios:lg:bg-green", "ios:xl:bg-black"],
      {
        __: {
          ios: {
            media: {
              "": { backgroundColor: "#ffffff" },
              "(min-width: 640px)": { backgroundColor: "#ff0000" },
              "(min-width: 768px)": { backgroundColor: "#00ff00" },
              "(min-width: 1024px)": { backgroundColor: "#0000ff" },
              "(min-width: 1280px)": { backgroundColor: "#000000" },
            },
          },
        },
      },
    ],
    // Android platform with media pseudo selectors
    [
      ["android:sm:bg-red"],
      { __: { android: { media: { "(min-width: 640px)": { backgroundColor: "#ff0000" } } } } },
    ],
    [
      ["android:md:bg-blue"],
      { __: { android: { media: { "(min-width: 768px)": { backgroundColor: "#00ff00" } } } } },
    ],
    [
      ["android:lg:bg-green"],
      { __: { android: { media: { "(min-width: 1024px)": { backgroundColor: "#0000ff" } } } } },
    ],
    [
      ["android:xl:bg-black"],
      { __: { android: { media: { "(min-width: 1280px)": { backgroundColor: "#000000" } } } } },
    ],
    [
      [
        "android:bg-white",
        "android:sm:bg-red",
        "android:md:bg-blue",
        "android:lg:bg-green",
        "android:xl:bg-black",
      ],
      {
        __: {
          android: {
            media: {
              "": { backgroundColor: "#ffffff" },
              "(min-width: 640px)": { backgroundColor: "#ff0000" },
              "(min-width: 768px)": { backgroundColor: "#00ff00" },
              "(min-width: 1024px)": { backgroundColor: "#0000ff" },
              "(min-width: 1280px)": { backgroundColor: "#000000" },
            },
          },
        },
      },
    ],
    // Native landscape selector
    [["landscape:bg-white"], { __: { native: { landscape: { backgroundColor: "#ffffff" } } } }],
    [["web:landscape:bg-white"], { __: { web: { landscape: { backgroundColor: "#ffffff" } } } }],
    [["ios:landscape:bg-white"], { __: { ios: { landscape: { backgroundColor: "#ffffff" } } } }],
    [
      ["android:landscape:bg-white"],
      { __: { android: { landscape: { backgroundColor: "#ffffff" } } } },
    ],
    // Focus landscape selector
    [["focus:bg-white"], { __: { native: { focus: { backgroundColor: "#ffffff" } } } }],
    [["web:focus:bg-white"], { __: { web: { focus: { backgroundColor: "#ffffff" } } } }],
    [["ios:focus:bg-white"], { __: { ios: { focus: { backgroundColor: "#ffffff" } } } }],
    [["android:focus:bg-white"], { __: { android: { focus: { backgroundColor: "#ffffff" } } } }],
    // Active landscape selector
    [["active:bg-white"], { __: { native: { active: { backgroundColor: "#ffffff" } } } }],
    [["web:active:bg-white"], { __: { web: { active: { backgroundColor: "#ffffff" } } } }],
    [["ios:active:bg-white"], { __: { ios: { active: { backgroundColor: "#ffffff" } } } }],
    [["android:active:bg-white"], { __: { android: { active: { backgroundColor: "#ffffff" } } } }],
    // Hover landscape selector
    [["hover:bg-white"], { __: { native: { hover: { backgroundColor: "#ffffff" } } } }],
    [["web:hover:bg-white"], { __: { web: { hover: { backgroundColor: "#ffffff" } } } }],
    [["ios:hover:bg-white"], { __: { ios: { hover: { backgroundColor: "#ffffff" } } } }],
    [["android:hover:bg-white"], { __: { android: { hover: { backgroundColor: "#ffffff" } } } }],
    // Disabled landscape selector
    [["disabled:bg-white"], { __: { native: { disabled: { backgroundColor: "#ffffff" } } } }],
    [["web:disabled:bg-white"], { __: { web: { disabled: { backgroundColor: "#ffffff" } } } }],
    [["ios:disabled:bg-white"], { __: { ios: { disabled: { backgroundColor: "#ffffff" } } } }],
    [
      ["android:disabled:bg-white"],
      { __: { android: { disabled: { backgroundColor: "#ffffff" } } } },
    ],
    // Visited landscape selector
    [["visited:bg-white"], { __: { native: { visited: { backgroundColor: "#ffffff" } } } }],
    [["web:visited:bg-white"], { __: { web: { visited: { backgroundColor: "#ffffff" } } } }],
    [["ios:visited:bg-white"], { __: { ios: { visited: { backgroundColor: "#ffffff" } } } }],
    [
      ["android:visited:bg-white"],
      { __: { android: { visited: { backgroundColor: "#ffffff" } } } },
    ],
  ])("%p generates the correct output", (input, expected) => {
    expect(generate(input)).toStrictEqual(expected);
  });
});
