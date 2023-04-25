FROM eas-build-base:latest

# Copy directory content
COPY android android
COPY assets assets
COPY eas-hooks eas-hooks
COPY e2e e2e
COPY .detoxrc.js ./
COPY App.js app.json babel.config.js eas.json index.js metro.config.js package.json yarn.lock ./

# Install dependencies
RUN yarn

CMD eas build -p android -e test --local
