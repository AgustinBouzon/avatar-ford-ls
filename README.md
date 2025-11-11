## Setup

1. Duplicate the example env file and fill in the required keys:

   ```bash
   cp .env.example .env
   ```

   Optional variables:

   - `NEXT_PUBLIC_KIOSK_PHONE` pre-fills the WhatsApp number for the `/orb` kiosk mode.
   - `NEXT_PUBLIC_KIOSK_AUTO_START=false` disables the automatic voicebot start in kiosk mode.
   - `NEXT_PUBLIC_BACKGROUND_VIDEO_URL` can point to a hosted video (MP4/WEBM) for the animated background.
   - `NEXT_PUBLIC_ALLOWED_ORIGIN` sets the CORS origin for the API routes (default `*`).

2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

## Docker

The provided `docker-compose.yml` expects an external Docker network called `root_default` so the service can communicate with other containers in the same stack. Create the network ahead of time:

```bash
docker network create root_default
```

If you prefer Docker Compose to manage an internal network automatically, remove the `external: true` stanza (and optionally rename the network) inside `docker-compose.yml`.

Build and run the production image with Docker Compose:

```bash
docker compose up --build
```

The app will be available on `http://localhost:3000`. Override the exposed port with `PORT=4000 docker compose up`.

### Managing secrets in production

When deploying to production with Docker, avoid checking secrets into version control or baking them into images. Recommended practices include:

* Store sensitive values in a secrets manager (AWS Secrets Manager, Vault, Doppler, etc.) and inject them as environment variables during deployment.
* If you are using Docker Compose or Swarm, leverage [Docker secrets](https://docs.docker.com/engine/swarm/secrets/) to mount encrypted values as files or environment variables.
* Limit the scope of `.env` files to development, encrypt at rest, and restrict file permissions when they must exist on disk.
* Rotate credentials regularly and revoke unused ones to reduce blast radius in case of compromise.

The Compose configuration already loads variables from a `.env` file alongside `docker-compose.yml` (following `.env.example`), but in production you should prefer the secure approaches listed above.
