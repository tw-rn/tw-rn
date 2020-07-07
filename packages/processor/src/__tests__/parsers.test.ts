import { boxShadow } from "../parsers";

describe("parser", () => {
  describe("boxShadow", () => {
    it("should leave shorthand intact", () => {
      expect(boxShadow("5px 10px rgba(0, 0, 0, 0.05)")).toEqual({
        parsed: "5px 10px rgba(0, 0, 0, 0.05)",
        meta: {
          offsetX: "5px",
          offsetY: "10px",
          blurRadius: "",
          spreadRadius: "",
          color: "rgba(0, 0, 0, 0.05)",
        },
      });

      expect(boxShadow("5px 10px red")).toEqual({
        parsed: "5px 10px red",
        meta: {
          offsetX: "5px",
          offsetY: "10px",
          blurRadius: "",
          spreadRadius: "",
          color: "red",
        },
      });
    });

    it("should take the first shorthand shadow if multiple shadows are present", () => {
      expect(
        boxShadow(
          "5px 10px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)"
        )
      ).toEqual({
        parsed: "5px 10px rgba(0, 0, 0, 0.05)",
        meta: {
          offsetX: "5px",
          offsetY: "10px",
          blurRadius: "",
          spreadRadius: "",
          color: "rgba(0, 0, 0, 0.05)",
        },
      });
    });

    it("should remove the spread-radius from the value", () => {
      expect(boxShadow("0 1px 3px 0 rgba(0, 0, 0, 0.1)")).toEqual({
        parsed: "0 1px 3px rgba(0, 0, 0, 0.1)",
        meta: {
          offsetX: "0",
          offsetY: "1px",
          blurRadius: "3px",
          spreadRadius: "0",
          color: "rgba(0, 0, 0, 0.1)",
        },
      });

      expect(boxShadow("0 1px 3px 0 red")).toEqual({
        parsed: "0 1px 3px red",
        meta: {
          offsetX: "0",
          offsetY: "1px",
          blurRadius: "3px",
          spreadRadius: "0",
          color: "red",
        },
      });
    });
  });
});
