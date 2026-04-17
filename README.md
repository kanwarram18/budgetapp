# Budget App

A personal budget tracker with multi-category transaction splits, flexible budgets, goal tracking, and visual dashboards. Built as a PWA — install it on your iPhone home screen and use it like a native app.

## Features

- **Multi-category splits** — A single $10 transaction at Coles can be $5 groceries + $5 comfort food
- **Merchant memory** — The app remembers your last split at each merchant and pre-fills it
- **Flexible budgets** — Weekly, monthly, quarterly, or yearly limits per category with visual warnings
- **Goal tracking** — Savings targets, spending limits, or income goals with progress visualization
- **Dashboard** — Month-to-date spending, forecasts, budget status, and recent transactions at a glance
- **Reports** — Filter by date range, category, or merchant with trend charts
- **Dark mode** — Light, dark, or auto (follows system)
- **CSV export** — Download transactions for spreadsheets or tax
- **JSON backup/restore** — Full database snapshot you own
- **$0/month** — Free tier hosting, no subscriptions

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 21, Spring Boot 3.4, Spring Data JPA, Spring Security |
| Database | PostgreSQL 16 (Neon free tier) |
| Migrations | Flyway |
| Auth | JWT (stateless) |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Charts | Recharts |
| PWA | vite-plugin-pwa + Workbox |
| Backend hosting | Render free tier |
| Frontend hosting | Vercel free tier |

## Getting Started

### Prerequisites

- **Java 21** — [Download from Adoptium](https://adoptium.net/)
- **Node.js 20+** — [Download from nodejs.org](https://nodejs.org/)
- **Docker Desktop** — [Download](https://www.docker.com/products/docker-desktop/) (for local Postgres)
- **Git** — [Download](https://git-scm.com/)

### 1. Clone and configure

```bash
git clone https://github.com/kanwarram18/budgetapp.git
cd budgetapp
cp .env.example .env
```

Edit `.env` and fill in your values. For local development, the defaults in `application-local.properties` work with the Docker Postgres, so you can skip `.env` initially.

### 2. Start the local database

```bash
docker compose up -d
```

This starts a PostgreSQL 16 container on port 5432. Credentials: `budgetapp` / `budgetapp` / `budgetapp`.

### 3. Run the backend

```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

The backend starts on `http://localhost:8080`. Verify it works:

```bash
curl http://localhost:8080/api/health
```

You should see: `{"status":"ok","timestamp":"...","version":"0.1.0"}`

### 4. Run the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`. Open it in a browser — you should see "Budget App" with a green "Connected" status.

### 5. Install on your phone (optional)

Open `http://localhost:5173` in Safari on your iPhone (your phone must be on the same Wi-Fi as your computer). Tap the Share button → "Add to Home Screen". The app appears as an icon.

> **Note:** For phone access during local development, replace `localhost` with your computer's local IP (e.g., `http://192.168.1.100:5173`). You'll need to update `app.frontend-url` in `application-local.properties` to match.

## Deploying

### Database (Neon)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a project in **US East** region
3. Copy the connection string — it looks like:
   `postgresql://username:password@ep-something.us-east-2.aws.neon.tech/neondb?sslmode=require`
4. Note the username, password, and full JDBC URL separately

### Backend (Render)

1. Sign up at [render.com](https://render.com)
2. New → Web Service → Connect your GitHub repo
3. Configure:
   - **Root directory:** `backend`
   - **Runtime:** Docker
   - **Instance type:** Free
4. Add environment variables:
   - `DATABASE_URL` = `jdbc:postgresql://ep-something.us-east-2.aws.neon.tech/neondb?sslmode=require`
   - `DATABASE_USER` = your Neon username
   - `DATABASE_PASSWORD` = your Neon password
   - `FRONTEND_URL` = your Vercel URL (after you deploy it, e.g., `https://budgetapp-xyz.vercel.app`)
   - `JWT_SECRET` = a random 64+ character string (generate one: `openssl rand -base64 48`)
5. Deploy

### Frontend (Vercel)

1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Configure:
   - **Root directory:** `frontend`
   - **Framework preset:** Vite
4. Add environment variable:
   - `VITE_API_URL` = your Render backend URL (e.g., `https://budgetapp-api.onrender.com`)
5. Deploy
6. Copy the Vercel URL and update the `FRONTEND_URL` env var in Render

### After both are deployed

1. Open your Vercel URL in a browser — you should see "Connected"
2. On your iPhone, open the URL in Safari → Share → Add to Home Screen
3. You now have a working PWA on your phone

## Project Structure

```
budgetapp/
├── backend/                    Spring Boot API
│   ├── src/main/java/com/kanwarram18/budgetapp/
│   │   ├── config/             CORS, security, etc.
│   │   ├── common/             Health check, exception handler
│   │   ├── user/               Auth (Phase 1)
│   │   ├── transaction/        Transactions + splits (Phase 1)
│   │   ├── category/           Categories (Phase 1)
│   │   ├── budget/             Budgets (Phase 3)
│   │   ├── goal/               Goals (Phase 4)
│   │   └── report/             Reports (Phase 5)
│   └── src/main/resources/
│       ├── application.properties
│       └── db/migration/       Flyway SQL migrations
├── frontend/                   React PWA
│   └── src/
│       ├── api/                API client + query hooks
│       ├── components/         Shared UI components
│       ├── pages/              One file per screen
│       ├── lib/                Utilities (theme, formatting)
│       └── types/              TypeScript interfaces
├── .env.example                Environment variable template
├── docker-compose.yml          Local PostgreSQL
└── README.md                   You are here
```

## Development

### Running tests

```bash
cd backend
./mvnw test
```

### Adding a database migration

Create a new file in `backend/src/main/resources/db/migration/`:

```
V2__create_users_table.sql
V3__create_categories_table.sql
```

Flyway runs migrations automatically on startup, in order.

### Environment variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | JDBC PostgreSQL connection string | Yes (prod) |
| `DATABASE_USER` | Database username | Yes (prod) |
| `DATABASE_PASSWORD` | Database password | Yes (prod) |
| `JWT_SECRET` | 64+ char random string for signing tokens | Yes |
| `FRONTEND_URL` | Deployed frontend URL for CORS | Yes (prod) |
| `SERVER_PORT` | Backend port (default: 8080) | No |
| `VITE_API_URL` | Backend URL for frontend API calls | Yes (prod) |

## License

MIT — see [LICENSE](LICENSE)
