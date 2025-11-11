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

## Environment variables

| Variable | Required | Purpose | Expected format & defaults | API routes / usage notes |
| --- | --- | --- | --- | --- |
| `AGENT_ID` | ✅ | Identifies the ElevenLabs Conversational AI agent that issues signed session URLs. | ElevenLabs agent UUID (e.g. `a1b2c3d4-...`). No default; must be provisioned in the ElevenLabs dashboard. | Consumed by `GET /api/signed-url`, which forwards the ID to `ElevenLabsClient.conversationalAi.getSignedUrl`. |
| `ELEVENLABS_API_KEY` | ✅ | Authenticates server-to-server requests to ElevenLabs. | Secret string issued by ElevenLabs. No default. Store securely (e.g. `.env`, cloud secret manager). | Required by `GET /api/signed-url`; without it the route responds with a 500 error. |
| `FORD_CAPTURE_ENDPOINT` | ✅ | Destination webhook that receives selfie capture payloads. | HTTPS URL (e.g. `https://example.com/webhooks/capture`). No default. | Used by `POST /api/capture` to forward phone, image, and metadata. Missing value returns a 500 error. |
| `NEXT_PUBLIC_KIOSK_PHONE` | ❌ | Pre-fills the kiosk experience with a WhatsApp number. | Phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format (`+5491122334455`). Leave empty to require manual input. | Read by the kiosk UI in `/app/orb` and `/app/foto`; sanitized via `normalizePhoneInput`. |
| `NEXT_PUBLIC_KIOSK_AUTO_START` | ❌ | Controls whether the kiosk voicebot starts automatically. | Case-insensitive boolean string. Defaults to `true`. Set to `false`, `0`, `off`, or `no` to require manual start. | Evaluated in `components/ConvAI` when rendering the kiosk. |
| `NEXT_PUBLIC_BACKGROUND_VIDEO_URL` | ❌ | Overrides the looping background animation. | HTTPS URL to an MP4/WEBM asset or relative path. Defaults to `/background.mp4` bundled in `public/`. | Used by the `BackgroundWave` component to choose the video source. |
| `NEXT_PUBLIC_ALLOWED_ORIGIN` | ❌ | Restricts CORS responses from API routes. | Origin string (e.g. `https://app.example.com`). Defaults to `*`, which is safe for local development but should be narrowed in production. | Applied by `lib/cors.ts` to every API route (`/api/signed-url`, `/api/capture`, `/api/detect-capture`). |

2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

## Docker

Build and run the production image with Docker Compose:

```bash
docker compose up --build
```

The app will be available on `http://localhost:3000`. Override the exposed port with `PORT=4000 docker compose up`.

To provide secrets when deploying with Docker Compose, create a `.env` file alongside `docker-compose.yml` (following `.env.example`) and it will be loaded automatically via the `env_file` directive.
