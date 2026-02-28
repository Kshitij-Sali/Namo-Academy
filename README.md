# Namo Academy - Full Stack English Tuition Website

Production-ready full stack project with:

- Public portal (Home, About, Courses, Contact)
- Admin portal (JWT login, dashboard, students CRUD, attendance, inquiries, settings)
- Backend REST API (Node.js, Express, MongoDB, Mongoose)
- Frontend (React + Vite + Tailwind + Framer Motion)

## Project Structure

```text
Project/
  client/   # React frontend
  server/   # Express API backend
```

## Features

- Responsive, animated public website for tuition branding
- Contact form saved to database and visible in admin portal
- Admin authentication with JWT and protected routes
- Student management (create, read, update, delete)
- Attendance marking and history with monthly student summary
- Inquiry management (view, resolve, delete)
- Academy settings management and admin password update

## Backend Setup

1. Go to backend:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` from `.env.example` and set values.

4. Seed initial admin:

```bash
npm run seed:admin
```

5. Start backend:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`.

## Frontend Setup

1. Go to frontend:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API Highlights

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET|POST|PUT|DELETE /api/students`
- `POST /api/attendance/mark`
- `GET /api/attendance`
- `GET /api/attendance/student/:studentId/summary`
- `POST /api/inquiries/public`
- `GET|PATCH|DELETE /api/inquiries`
- `GET /api/testimonials/public`
- `POST /api/testimonials/public`
- `GET /api/testimonials`
- `PATCH /api/testimonials/:id/approve`
- `DELETE /api/testimonials/:id`
- `GET /api/dashboard/overview`
- `GET|PUT /api/settings/profile`
- `PATCH /api/settings/password`
- `GET /api/settings/public-profile`

## Deployment Notes

- Set production `CLIENT_URL`, `MONGO_URI`, and `JWT_SECRET`.
- Build frontend with `npm run build` in `client`.
- Serve static frontend from CDN or reverse proxy to backend.
