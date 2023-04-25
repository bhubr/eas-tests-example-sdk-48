# Expo/Detox example

> Based on Expo's [Running E2E tests on EAS Build](https://docs.expo.dev/build-reference/e2e-tests/).

This is an experiment for building an Expo-managed React Native app.

It builds on Expo's docs but runs the EAS build process _locally_ (`eas build [...] --local `), inside a Docker container.

Two Dockerfiles are provided:

- one to build a "base" image, including all the dependencies required for running EAS builds **and** Detox e2e tests, i.e.:
  - JDK 11
  - Node.js 16
  - Android SDK command-line tools: `sdkmanager`, `emulator`, `adb`, etc.
  - An Android virtual device (Pixel 4) for runnign Detox tests
- one to build your app's test apk:
  - contains your app's code
  - actually runs the build, then the Detox tests, against the built app running in an emulator

## Run Detox

Build **base** Docker image:

```
docker build -t eas-build-base -f Dockerfile.base .
```

Build derived image containing your app

```
docker build -t eas-tests-example -f Dockerfile.app .
```

Run Docker image - **tested under Linux (Ubuntu 22.04) only**:

```
docker run --device=/dev/kvm -v ~/.expo:/root/.expo -v "$PWD/.git:/opt/app/.git" eas-tests-example`
```

What these are for:

- mapping `.expo` is for sharing `state.json` with container (contains auth tokens)
- we're mapping `.git` b/c it's needed by EAS build
- `--device=/dev/kvm` is needed to make `/dev/kvm` available inside the container (needed by emulator at the very end)
