FROM ubuntu:22.04

WORKDIR /opt/app

# Base dependencies
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y watchman
RUN apt-get install -y openjdk-11-jdk
RUN apt-get install -y unzip
RUN apt-get install -y make

# Install Node.js from Nodesource packages
RUN curl -fsSL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt-get update
RUN apt-get install -y nodejs
RUN npm i -g yarn eas-cli

# Install Android command-line tools
RUN curl https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -o /tmp/commandlinetools-linux-9477386_latest.zip
RUN mkdir -p /opt/android/sdk/cmdline-tools
RUN cd /opt/android/sdk/cmdline-tools && unzip /tmp/commandlinetools-linux-9477386_latest.zip && mv cmdline-tools latest
ENV ANDROID_SDK_ROOT="/opt/android/sdk"
ENV ANDROID_HOME="/opt/android/sdk"
ENV PATH="$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/emulator"

# Agree to SDK manager & installed packages licenses
RUN yes | sdkmanager --licenses
# Download Android 31 x86_64 system image
RUN sdkmanager --install "system-images;android-31;google_apis;x86_64"
# Create `pixel_4` device from sys image
RUN echo no | avdmanager --verbose create avd --name "pixel_4" --device "pixel_4" --package "system-images;android-31;google_apis;x86_64"

# Copy directory content
COPY android android
COPY assets assets
COPY eas-hooks eas-hooks
COPY e2e e2e
COPY .detoxrc.js ./
COPY App.js app.json babel.config.js eas.json index.js metro.config.js package.json yarn.lock ./

# Instal deps
RUN yarn

# RUN yarn detox build --configuration android.emu.debug
# RUN yarn add wait-on concurrently

# CMD yarn detox test --headless --configuration android.emu.debug
# CMD find . -name "*.apk" && ls -l ./android/app/build/outputs/apk/debug/ && ls -l ./android/app/build/outputs/apk/androidTest/debug/

RUN apt-get install -y git
RUN git config --global --add safe.directory /opt/app

# Install platform tools
RUN curl https://dl.google.com/android/repository/platform-tools_r34.0.1-linux.zip -o /tmp/platform-tools_r34.0.1-linux.zip
RUN cd /opt/android/sdk && unzip /tmp/platform-tools_r34.0.1-linux.zip
ENV PATH="$PATH:$ANDROID_SDK_ROOT/platform-tools"

RUN sdkmanager --install "cmake;3.22.1"
RUN sdkmanager --install "emulator"
RUN sdkmanager --install "ndk;23.1.7779620"
RUN sdkmanager --install "patcher;v4"
RUN sdkmanager --install "platform-tools"
RUN sdkmanager --install "system-images;android-31;google_apis;x86_64"

CMD eas build -p android -e test --local
