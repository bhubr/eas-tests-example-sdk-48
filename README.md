# Expo/Detox example

Based on <https://docs.expo.dev/build-reference/e2e-tests/>.

Build **base** Docker image:

```
docker build -t eas-build-base -f Dockerfile.base .
```

```
docker build -t eas-tests-example .
```

Run Docker image - **tested under Linux (Ubuntu 22.04) only**:

```
docker run --device=/dev/kvm -v ~/.expo:/root/.expo -v "$PWD/.git:/opt/app/.git" eas-tests-example
```

What these are for:

- mapping `.expo` is for sharing `state.json` with container (contains auth tokens)
- we're mapping `.git` b/c it's needed by EAS build
- `--device=/dev/kvm` is needed to make `/dev/kvm` available inside the container (needed by emulator at the very end)
