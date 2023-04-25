const appConfig = require('../../../app.json');
const { resolveConfig } = require('detox/internals');

const platform = device.getPlatform();

module.exports.openApp = async function openApp() {
  const config = await resolveConfig();
  if (config.configurationName.split('.')[1] === 'debug') {
    return await openAppForDebugBuild(platform);
  } else {
    return await device.launchApp({
      newInstance: true,
    });
  }
};

async function openAppForDebugBuild(platform) {
  /*const deepLinkUrl = process.env.EXPO_USE_UPDATES
    ? // Testing latest published EAS update for the test_debug channel
      getDeepLinkUrl(getLatestUpdateUrl())
    : // Local testing with packager
      getDeepLinkUrl(getDevLauncherPackagerUrl(platform));
  */
  // const deepLinkUrl = 'com.reactnativedevfr.eastestsexample://expo-development-client/?url=http%3A%2F%2F192.168.1.67%3A8081%2Findex.bundle%3Fplatform%3Dandroid%26dev%3Dtrue%26minify%3Dfalse%26disableOnboarding%3D1';
  //const deepLinkUrl = 'com.reactnativedevfr.eastestsexample://expo-development-client/?url=http%3A%2F%2F192.168.1.67%3A8081%2F%3Fplatform%3Dandroid%26dev%3Dtrue%26minify%3Dfalse%26disableOnboarding%3D1';
  const deepLinkUrl = 'com.reactnativedevfr.eastestsexample://expo-development-client/?url=http%3A%2F%2F192.168.1.67%3A8081';
  console.log('>>>> deepLinkUrl:', deepLinkUrl);
  if (platform === 'ios') {
    await device.launchApp({
      newInstance: true,
    });
    sleep(3000);
    await device.openURL({
      url: deepLinkUrl,
    });
  } else {
    await device.launchApp({
      newInstance: true,
      url: deepLinkUrl,
    });
  }

  await sleep(3000);
}

const getDeepLinkUrl = (url) =>
  `eastestsexample://expo-development-client/?url=${encodeURIComponent(url)}`;

const getDevLauncherPackagerUrl = (platform) =>
  `http://localhost:8081/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;

const getLatestUpdateUrl = () =>
  `https://u.expo.dev/${getAppId()}?channel-name=test_debug&disableOnboarding=1`;

const getAppId = () => appConfig?.expo?.extra?.eas?.projectId ?? '';

const sleep = (t) => new Promise((res) => setTimeout(res, t));
