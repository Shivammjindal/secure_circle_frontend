# FROM node:20-alpine as runner

# WORKDIR /app

# COPY package*.json .
# RUN npm install
# COPY . .

# RUN npm run build

# from node:20-alpine as build

# WORKDIR /app
# COPY package*.json .

# RUN npm ci

# COPY --from=builder /app/dist ./dist

# EXPOSE 3000
# CMD ["node", "dist/index.js"]

FROM node:20-alpine AS runner

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS builder

COPY package*.json .

COPY --from=runner /app/.next ./.next
COPY --from=runner /app/public ./public
COPY --from=runner /app/package*.json ./
COPY --from=runner /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm","start"]