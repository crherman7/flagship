import * as path from "../path";
import { withPlist } from "./plist";

import type { Config } from "../../types/types";
import { InfoPlistType } from "../../types/ios";
import deepmerge from "deepmerge";

export const withInfoPlist = (
  callback: (plist: InfoPlistType.InfoPlist) => InfoPlistType.InfoPlist,
  config: Config
) =>
  withPlist<InfoPlistType.InfoPlist>(path.ios.infoPlistPath(config), callback);

export const setUrlScheme = (urlScheme: string, config: Config) =>
  withInfoPlist((plist) => {
    if (plist.CFBundleURLTypes?.[0]) {
      plist.CFBundleURLTypes[0].CFBundleURLSchemes.push(urlScheme);
    } else {
      plist.CFBundleURLTypes = [{ CFBundleURLSchemes: [urlScheme] }];
    }

    return plist;
  }, config);

export const setPlist = (data: Record<string, unknown>, config: Config) =>
  withInfoPlist((plist) => {
    return deepmerge.all<InfoPlistType.InfoPlist>([plist, data]);
  }, config);
