FROM node:20-alpine AS base
ARG ROOTPROJ
ARG THEMEPATH

FROM base AS installer
WORKDIR /app
COPY ${ROOTPROJ}/package.json ${ROOTPROJ}/package-lock.json ./
RUN npm install

FROM base as builder
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY ${ROOTPROJ}/. ./
COPY ${THEMEPATH}/. ./
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=installer --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs ${ROOTPROJ}/package.json ${ROOTPROJ}/package-lock.json* ./
COPY --chown=nextjs:nodejs ${THEMEPATH}/. ./
USER nextjs
EXPOSE 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "start"]