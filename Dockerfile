FROM node:20.10.0

ENV APP_ROOT /web

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN yarn install

RUN yarn build
CMD node .output/server/index.mjs