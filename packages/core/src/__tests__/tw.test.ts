import { TailwindReactNativeStyle } from "../types";
import { generate, tw } from "../tw";

describe("tw", () => {
  it.each<[string[], TailwindReactNativeStyle]>([
    // Native platform pseudo selector
    [
      ["bg-white"],
      { __: { native: { media: { "": { backgroundColor: "#ffffff" } } } } },
    ],
    // Web platform pseudo selector
    [
      ["web:bg-white"],
      { __: { web: { media: { "": { backgroundColor: "#ffffff" } } } } },
    ],
    // Ios platform pseudo selector
    [
      ["ios:bg-white"],
      { __: { ios: { media: { "": { backgroundColor: "#ffffff" } } } } },
    ],
    // Android platform pseudo selector
    [
      ["android:bg-white"],
      { __: { android: { media: { "": { backgroundColor: "#ffffff" } } } } },
    ],
    // Invalid platform pseudo selector
    [["invalid:bg-white"], { __: {} }],
    // Native pseudo selector with media selectors
    [
      ["sm:bg-red"],
      {
        __: {
          native: {
            media: { "(min-width: 640px)": { backgroundColor: "#ff0000" } },
          },
        },
      },
    ],
    [
      ["md:bg-green"],
      {
        __: {
          native: {
            media: { "(min-width: 768px)": { backgroundColor: "#00ff00" } },
          },
        },
      },
    ],
    [
      ["lg:bg-blue"],
      {
        __: {
          native: {
            media: { "(min-width: 1024px)": { backgroundColor: "#0000ff" } },
          },
        },
      },
    ],
    [
      ["xl:bg-black"],
      {
        __: {
          native: {
            media: { "(min-width: 1280px)": { backgroundColor: "#000000" } },
          },
        },
      },
    ],
    [
      ["bg-white", "sm:bg-red", "md:bg-green", "lg:bg-blue", "xl:bg-black"],
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
      {
        __: {
          web: {
            media: { "(min-width: 640px)": { backgroundColor: "#ff0000" } },
          },
        },
      },
    ],
    [
      ["web:md:bg-green"],
      {
        __: {
          web: {
            media: { "(min-width: 768px)": { backgroundColor: "#00ff00" } },
          },
        },
      },
    ],
    [
      ["web:lg:bg-blue"],
      {
        __: {
          web: {
            media: { "(min-width: 1024px)": { backgroundColor: "#0000ff" } },
          },
        },
      },
    ],
    [
      ["web:xl:bg-black"],
      {
        __: {
          web: {
            media: { "(min-width: 1280px)": { backgroundColor: "#000000" } },
          },
        },
      },
    ],
    [
      [
        "web:bg-white",
        "web:sm:bg-red",
        "web:md:bg-green",
        "web:lg:bg-blue",
        "web:xl:bg-black",
      ],
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
      {
        __: {
          ios: {
            media: { "(min-width: 640px)": { backgroundColor: "#ff0000" } },
          },
        },
      },
    ],
    [
      ["ios:md:bg-green"],
      {
        __: {
          ios: {
            media: { "(min-width: 768px)": { backgroundColor: "#00ff00" } },
          },
        },
      },
    ],
    [
      ["ios:lg:bg-blue"],
      {
        __: {
          ios: {
            media: { "(min-width: 1024px)": { backgroundColor: "#0000ff" } },
          },
        },
      },
    ],
    [
      ["ios:xl:bg-black"],
      {
        __: {
          ios: {
            media: { "(min-width: 1280px)": { backgroundColor: "#000000" } },
          },
        },
      },
    ],
    [
      [
        "ios:bg-white",
        "ios:sm:bg-red",
        "ios:md:bg-green",
        "ios:lg:bg-blue",
        "ios:xl:bg-black",
      ],
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
      {
        __: {
          android: {
            media: { "(min-width: 640px)": { backgroundColor: "#ff0000" } },
          },
        },
      },
    ],
    [
      ["android:md:bg-green"],
      {
        __: {
          android: {
            media: { "(min-width: 768px)": { backgroundColor: "#00ff00" } },
          },
        },
      },
    ],
    [
      ["android:lg:bg-blue"],
      {
        __: {
          android: {
            media: { "(min-width: 1024px)": { backgroundColor: "#0000ff" } },
          },
        },
      },
    ],
    [
      ["android:xl:bg-black"],
      {
        __: {
          android: {
            media: { "(min-width: 1280px)": { backgroundColor: "#000000" } },
          },
        },
      },
    ],
    [
      [
        "android:bg-white",
        "android:sm:bg-red",
        "android:md:bg-green",
        "android:lg:bg-blue",
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
    [
      ["landscape:bg-white"],
      { __: { native: { landscape: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["web:landscape:bg-white"],
      { __: { web: { landscape: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["ios:landscape:bg-white"],
      { __: { ios: { landscape: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["android:landscape:bg-white"],
      { __: { android: { landscape: { backgroundColor: "#ffffff" } } } },
    ],
    // Focus landscape selector
    [
      ["focus:bg-white"],
      { __: { native: { focus: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["web:focus:bg-white"],
      { __: { web: { focus: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["ios:focus:bg-white"],
      { __: { ios: { focus: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["android:focus:bg-white"],
      { __: { android: { focus: { backgroundColor: "#ffffff" } } } },
    ],
    // Active landscape selector
    [
      ["active:bg-white"],
      { __: { native: { active: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["web:active:bg-white"],
      { __: { web: { active: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["ios:active:bg-white"],
      { __: { ios: { active: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["android:active:bg-white"],
      { __: { android: { active: { backgroundColor: "#ffffff" } } } },
    ],
    // Hover landscape selector
    [
      ["hover:bg-white"],
      { __: { native: { hover: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["web:hover:bg-white"],
      { __: { web: { hover: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["ios:hover:bg-white"],
      { __: { ios: { hover: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["android:hover:bg-white"],
      { __: { android: { hover: { backgroundColor: "#ffffff" } } } },
    ],
    // Disabled landscape selector
    [
      ["disabled:bg-white"],
      { __: { native: { disabled: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["web:disabled:bg-white"],
      { __: { web: { disabled: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["ios:disabled:bg-white"],
      { __: { ios: { disabled: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["android:disabled:bg-white"],
      { __: { android: { disabled: { backgroundColor: "#ffffff" } } } },
    ],
    // Visited landscape selector
    [
      ["visited:bg-white"],
      { __: { native: { visited: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["web:visited:bg-white"],
      { __: { web: { visited: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["ios:visited:bg-white"],
      { __: { ios: { visited: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["android:visited:bg-white"],
      { __: { android: { visited: { backgroundColor: "#ffffff" } } } },
    ],
    [
      ["transition-none"],
      { __: { native: { media: { "": { transitionProperty: [] } } } } },
    ],
    [
      ["transition-all"],
      { __: { native: { media: { "": { transitionProperty: ["all"] } } } } },
    ],
    [
      ["transition"],
      {
        __: {
          native: {
            media: {
              "": {
                transitionProperty: [
                  "background-color",
                  "border-color",
                  "color",
                  "fill",
                  "stroke",
                  "opacity",
                  "box-shadow",
                  "transform",
                ],
              },
            },
          },
        },
      },
    ],
    [
      ["transition-colors"],
      {
        __: {
          native: {
            media: {
              "": {
                transitionProperty: [
                  "background-color",
                  "border-color",
                  "color",
                  "fill",
                  "stroke",
                ],
              },
            },
          },
        },
      },
    ],
    [
      ["transition-opacity"],
      {
        __: { native: { media: { "": { transitionProperty: ["opacity"] } } } },
      },
    ],
    [
      ["transition-shadow"],
      {
        __: {
          native: { media: { "": { transitionProperty: ["box-shadow"] } } },
        },
      },
    ],
    [
      ["transition-transform"],
      {
        __: {
          native: { media: { "": { transitionProperty: ["transform"] } } },
        },
      },
    ],
    [
      ["duration-75", "delay-75", "ease-in-out"],
      {
        __: {
          native: {
            media: {
              "": {
                transitionDuration: 75,
                transitionDelay: 75,
                transitionTimingFunction: {
                  type: "bezier",
                  args: [0.4, 0, 0.2, 1],
                },
              },
            },
          },
        },
      },
    ],
  ])("%p generates the correct output", (input, expected) => {
    expect(generate(input)).toStrictEqual(expected);
  });

  describe("tw.raw", () => {
    it("should get the raw object of a tailwind style", () => {
      expect(tw.raw`bg-white`).toEqual({ backgroundColor: "#ffffff" });
    });

    it("should return undefined if the style is not found", () => {
      expect(tw.raw`not-a-valid-style`).toEqual(undefined);
    });
  });

  describe("tw.value", () => {
    it("should get the value of a tailwind style", () => {
      expect(tw.value`bg-white`).toEqual("#ffffff");
    });

    it("should return undefined if the style is not found", () => {
      expect(tw.value`not-a-valid-style`).toEqual(undefined);
    });

    it("should return an array if the style have more than 1 property", () => {
      expect(tw.value`p-4`).toEqual([10, 10, 10, 10]);
    });
  });
});
