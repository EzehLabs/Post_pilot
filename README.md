# PostPilot marketing site

A responsive React + Vite marketing site with an Express API and PostgreSQL lead capture.

## Run locally

1. Install Node.js 18+ and PostgreSQL.
2. Create a database named `postpilot`, then apply `server/schema.sql`:

   ```sh
   psql -d postpilot -f server/schema.sql
   ```

3. Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string.
4. Install and start the frontend and API:

   ```sh
   npm install
   npm run dev
   ```

Vite runs at `http://localhost:5173` and proxies `/api` requests to the Express API at `http://localhost:3001`. The site renders without a database connection, but saving an email requires PostgreSQL to be configured and the schema applied.

## Production

Run `npm run build`, then start the Express server in production mode. In PowerShell, use:

```powershell
$env:NODE_ENV = "production"
npm start
```

In bash, use `NODE_ENV=production npm start`. Express serves the built frontend and API from the same port.

## Deploy to Vercel

Import this project into Vercel with the Vite framework preset. The repository includes `vercel.json` for the `dist` output and `/api/health` and `/api/leads` serverless functions.

For working lead capture, configure `DATABASE_URL` (and `PGSSL=true` if required by your provider) in the Vercel project's environment variables, then apply `server/schema.sql` to that PostgreSQL database. The site can be deployed without a database, but lead submissions will not be saved until PostgreSQL is configured.
