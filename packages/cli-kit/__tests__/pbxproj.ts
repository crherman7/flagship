/// <reference types="../src/@types/ios/xcode.d.ts" />

import fs from "fs/promises";
import xcode from "xcode";

import { paths } from "../src/lib/paths";
import { withPbxproj } from "../src/parsers/pbxproj";

jest.mock("fs/promises");
jest.mock("xcode");

describe("withPbxproj", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should read, modify, and write Xcode project file", async () => {
    const mockCallback = jest.fn();
    const mockXcodeProject = {
      parseSync: jest.fn(),
      writeSync: jest.fn(),
    };

    jest.spyOn(xcode, "project").mockReturnValue(mockXcodeProject as any);
    jest.spyOn(fs, "writeFile").mockResolvedValue();

    await withPbxproj(mockCallback);

    expect(xcode.project).toHaveBeenCalledWith(paths.ios.projectPbxProj());
    expect(mockXcodeProject.parseSync).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledWith(mockXcodeProject);
    expect(fs.writeFile).toHaveBeenCalledWith(
      paths.ios.projectPbxProj(),
      undefined
    );
    expect(mockXcodeProject.writeSync).toHaveBeenCalled();
  });
});