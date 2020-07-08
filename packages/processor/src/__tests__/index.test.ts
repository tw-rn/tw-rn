import process from "../";

describe("processor", () => {
  describe("box-shadow", () => {
    it("should process box-shadow correctly", async () => {
      expect(await process(".test { box-shadow: 5px 10px rgba(0, 0, 0, 0.05) }", "mobile")).toEqual(
        {
          "": {
            test: {
              elevation: 5,
              shadowColor: "rgba(0, 0, 0, 0.05)",
              shadowOffset: {
                height: 10,
                width: 5,
              },
              shadowOpacity: 1,
              shadowRadius: 0,
            },
          },
        }
      );

      expect(
        await process(
          ".test { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) }",
          "mobile"
        )
      ).toEqual({
        "": {
          test: {
            elevation: 1,
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 1,
            shadowRadius: 3,
          },
        },
      });

      expect(await process(".test { box-shadow: none }", "mobile")).toEqual({
        "": {
          test: {
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
            shadowColor: "black",
            shadowOpacity: 1,
            elevation: 0,
          },
        },
      });
    });
  });
});
