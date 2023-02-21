import { Config, fsk, path, summary } from "@brandingbrand/code-core";

import { CodePluginGoogleSignin } from "./types";

const ios = summary.withSummary(
  async (config: Config & CodePluginGoogleSignin) => {
    if (
      await fsk.doesKeywordExist(
        path.ios.infoPlistPath(config),
        "CFBundleURLTypes"
      )
    ) {
      await fsk.update(
        path.ios.infoPlistPath(config),
        /(CFBundleURLSchemes[\s\S]+?<array>)/,
        `$1
            <string>${config.codePluginGoogleSignin.plugin.ios.reversedClientId}</string>`
      );
    } else {
      await fsk.update(
        path.ios.infoPlistPath(config),
        /(<plist[\s\S]+?<dict>)/,
        `$1
    <key>CFBundleURLTypes</key>
    <array>
      <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
          <string>${config.codePluginGoogleSignin.plugin.ios.reversedClientId}</string>
        </array>
      </dict>
    </array>`
      );
    }

    await fsk.update(
      path.ios.appDelegatePath(config),
      /(#import "AppDelegate.h")/,
      `$1
#import <RNGoogleSignin/RNGoogleSignin.h>
#import "RNGoogleSignin.h"`
    );

    await fsk.update(
      path.ios.appDelegatePath(config),
      /(if \(\[RCTLinkingManager[\s\S]+?})/,
      `$1
  if ([RNGoogleSignin application:application openURL:url options:options]) {
    return YES;
  }`
    );
  },
  "plugin-google-signin",
  "platform::ios"
);

const android = summary.withSummary(
  async (config: CodePluginGoogleSignin) => {
    await fsk.update(
      path.project.resolve("android", "build.gradle"),
      /(ext {)/,
      `$1
        googlePlayServicesAuthVersion = "${
          config.codePluginGoogleSignin.plugin.android
            .googlePlayServicesAuthVersion || "19.2.0"
        }"`
    );

    await fsk.update(
      path.android.gradlePath(),
      /(dependencies {)/,
      `$1
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:${
      config.codePluginGoogleSignin.plugin.android.swiperefreshlayoutVersion ||
      "1.0.0"
    }'`
    );
  },
  "plugin-google-sign",
  "platform::android"
);

export * from "./types";

export { ios, android };
