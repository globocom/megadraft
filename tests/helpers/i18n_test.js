import { replaceData } from "../../src/i18n";

describe("i18n function", () => {
  it("should return the custom message", () => {
    const msg = replaceData("Return in {{language}}", {
      language: "portuguese"
    });
    expect(msg).toEqual("Return in portuguese");
  });

  it("should return a message with the data", () => {
    const msg = replaceData("Testing RegExp:  {{data1}}, {{data2}} {{data3}}", {
      data1: "test 1",
      data2: "test 2",
      data3: "test 3"
    });
    expect(msg).toEqual("Testing RegExp:  test 1, test 2 test 3");
  });
});
