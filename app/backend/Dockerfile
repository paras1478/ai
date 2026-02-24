FROM node:20-bullseye

WORKDIR /app

# ----------- install canvas dependencies -----------
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# ----------- install node deps -----------
COPY package*.json ./
RUN npm ci --omit=dev

# ----------- copy source -----------
COPY . .

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server.js"]