# Done by Vijeth P H

FROM node:12.18.2-alpine

ENV APP_HOME /app
RUN mkdir -pv $APP_HOME
WORKDIR $APP_HOME

ADD . $APP_HOME

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn


EXPOSE 3000

RUN npm install

CMD ["npm","start"]
