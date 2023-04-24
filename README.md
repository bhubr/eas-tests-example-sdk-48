# Expo/Detox example

Based on <https://docs.expo.dev/build-reference/e2e-tests/>.

Build Docker image:

```
docker build -t eas-tests-example .
```

Run Docker image:

```
docker run -v ~/.expo:/root/.expo -v "$PWD/.git:/opt/app/.git" eas-tests-example
```

What these volumes are for:
- `.expo` is for sharing `state.json` with container (contains auth tokens)
- `.git` is needed by EAS build

