# Codes Minds — Backend

Node.js + Express + MongoDB REST API backend for the Codes Minds agency website
(services, portfolio, team, contact form — all admin-manageable).

## Tech Stack
- Express 4
- MongoDB + Mongoose
- JWT authentication (single admin role)
- Multer (image uploads, stored in `/uploads`)
- Nodemailer (contact form email notifications)

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values
   ```bash
   cp .env.example .env
   ```

3. Make sure MongoDB is running (local or Atlas), then create the first admin account
   ```bash
   npm run seed
   ```

4. Start the dev server
   ```bash
   npm run dev
   ```

Server runs at `http://localhost:5000` by default. Health check: `GET /api/health`.

## API Reference

### Auth
| Method | Route            | Access | Description         |
|--------|------------------|--------|----------------------|
| POST   | /api/auth/login  | Public | Admin login → JWT    |
| GET    | /api/auth/me     | Private| Get logged-in admin  |

### Services
| Method | Route                | Access | Description            |
|--------|-----------------------|--------|-------------------------|
| GET    | /api/services          | Public | List all services       |
| GET    | /api/services/:slug    | Public | Get single service      |
| POST   | /api/services          | Admin  | Create service (multipart: `image`) |
| PUT    | /api/services/:id      | Admin  | Update service           |
| DELETE | /api/services/:id      | Admin  | Delete service           |

### Portfolio
| Method | Route                  | Access | Description               |
|--------|--------------------------|--------|-----------------------------|
| GET    | /api/portfolio            | Public | List projects (optional `?category=`) |
| GET    | /api/portfolio/:id        | Public | Get single project          |
| POST   | /api/portfolio            | Admin  | Create project (multipart: `image`) |
| PUT    | /api/portfolio/:id        | Admin  | Update project               |
| DELETE | /api/portfolio/:id        | Admin  | Delete project               |

### Team
| Method | Route          | Access | Description                       |
|--------|-----------------|--------|-------------------------------------|
| GET    | /api/team        | Public | List team members                   |
| POST   | /api/team        | Admin  | Add member (multipart: `image`)     |
| PUT    | /api/team/:id    | Admin  | Update member                        |
| DELETE | /api/team/:id    | Admin  | Delete member                        |

### Contact
| Method | Route              | Access | Description                          |
|--------|---------------------|--------|-----------------------------------------|
| POST   | /api/contact          | Public | Submit contact form (saves + emails admin) |
| GET    | /api/contact          | Admin  | List messages (optional `?status=`)  |
| PUT    | /api/contact/:id       | Admin  | Update status (unread/read/replied)  |
| DELETE | /api/contact/:id       | Admin  | Delete message                        |

## Auth header format for protected routes
```
Authorization: Bearer <token>
```

## Notes
- Uploaded images are served from `/uploads/<filename>` — for production (e.g. Vercel serverless),
  swap the local `uploads/` storage for a cloud provider (Cloudinary, S3, etc.) since local disk
  storage does not persist on serverless platforms.
- Update `CLIENT_URL` in `.env` to match your deployed frontend URL for CORS.
