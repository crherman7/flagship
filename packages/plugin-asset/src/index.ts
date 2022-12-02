import { path } from "@brandingbrand/kernel-core";

const ios = () => {
  const { iosAssets = ["./assets/fonts"] } = {};

  const linkAsssets = require(path.project.resolve(
    "node_modules",
    "react-native-asset",
    "lib"
  ));

  linkAsssets({
    rootPath: path.project.path(),
    shouldUnlink: true,
    platforms: {
      ios: {
        enabled: true,
        assets: iosAssets.map((it) => path.config.resolve(it)),
      },
      android: {
        enabled: false,
        assets: [],
      },
    },
  });
};

const android = () => {
  const { androidAssets = ["./assets/fonts"] } = {};

  const linkAsssets = require(path.project.resolve(
    "node_modules",
    "react-native-asset",
    "lib"
  ));

  linkAsssets({
    rootPath: path.project.path(),
    shouldUnlink: true,
    platforms: {
      ios: {
        enabled: false,
        assets: [],
      },
      android: {
        enabled: true,
        assets: androidAssets.map((it) => path.config.resolve(it)),
      },
    },
  });
};

export { ios, android };