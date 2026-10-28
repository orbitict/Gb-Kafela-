import { describe, expect, it } from "vitest";
import { mergeContent, phoneDigits } from "./site-content";

describe("site content", () => {
  it("admin-saved values override defaults, missing ones keep defaults", () => {
    const c = mergeContent([{ key: "settings", value: { phone: "০১৭০০-০০০০০০" } }]);
    expect(c.settings.phone).toBe("০১৭০০-০০০০০০");
    expect(c.settings.address).toBe("মিডল আলিপুর, ফরিদপুর");
  });

  it("saved lists replace the default list", () => {
    const c = mergeContent([{ key: "journey", value: [{ t: "ঢাকা", d: "x" }] }]);
    expect(c.journey).toHaveLength(1);
  });

  it("converts Bangla phone numbers to dialable digits", () => {
    expect(phoneDigits("০১৮৩৪-৭৫৭৩৭৬")).toBe("8801834757376");
  });
});
