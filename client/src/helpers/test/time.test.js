import { expect, test } from "vitest";
import { minutesToMilliseconds } from "../times";
test("should convert 10 minutes to 600000 milliseconds", () => {
    expect(minutesToMilliseconds(10)).toBe(600000);
});
