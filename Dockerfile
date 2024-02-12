FROM node:lts-alpine AS build

WORKDIR /app
COPY ./package.json /app/
RUN  pnpm ci --only=production --ignore-scripts
COPY . /app
RUN pnpm run build


FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV = prod

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000
CMD ["node", "dist/main"]
