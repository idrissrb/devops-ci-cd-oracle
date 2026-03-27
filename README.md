# devops-ci-cd-oracle

A minimal Node.js web app used as a CI/CD deployment smoke-test target for Oracle Cloud VPS (or any platform with container/host deployment).

##  Purpose

- Verify pipeline deployment succeeded by serving a simple HTTP app
- Provide a health endpoint for readiness/liveness checks
- Keep environment configuration simple, using `PORT` if supplied, defaulting to `3000`

##  How it works

- Uses Express.js to start an HTTP server in `index.js`
- two routes:
  - `GET /` returns text: `Hello from CI/CD pipeline on Oracle Cloud VPS! 🚀`
  - `GET /health` returns JSON: `{ status: "ok", uptime: <seconds> }`
- This app has no database, auth, or persistent state. It is intended for smoke tests and pipeline checks.

##  Run locally

1. `npm install`
2. `npm start`
3. Visit `http://localhost:3000/` and `http://localhost:3000/health`

##  Run with custom port

- `PORT=8080 npm start`
- Check `http://localhost:8080/` and `http://localhost:8080/health`

##  Docker (example)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

##  CI/CD role

- In your Oracle Cloud DevOps pipeline, deploy this service and call `/health` as a post-deploy check.
- A successful 200 from `/health` means the app process started and is reachable.

##  Notes

- Works with Express 5.x (`dependencies` in `package.json`).
- Logging is minimal (`App listening on port <port>`).

