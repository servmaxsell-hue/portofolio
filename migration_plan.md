# Backend Migration Plan: Laravel to NestJS

## 1. Analysis of Existing Laravel Functionalities

The current Laravel backend (`backend/`) handles the following responsibilities:

### A. Database Schema
Based on Models and Migrations, the following entities exist:
1.  **Users**: Authentication and profile management (Admin access).
2.  **Projects**: Portfolio items (Title, Slug, Content, Image, Featured status).
3.  **Articles**: Blog posts (Title, Slug, Content, Published Date).
4.  **Services**: Services offered (Title, Slug, Description).
5.  **Contacts**: Contact form submissions (Name, Email, Message, Read status).

### B. Public API (v1)
Endpoints consumed by the frontend (`routes/api.php`):
-   `GET /api/v1/projects` (List)
-   `GET /api/v1/projects/featured`
-   `GET /api/v1/projects/{slug}`
-   `GET /api/v1/articles` (List)
-   `GET /api/v1/articles/latest`
-   `GET /api/v1/articles/{slug}`
-   `POST /api/v1/articles` (Protected by API Key, for external publishing?)
-   `GET /api/v1/services`
-   `GET /api/v1/services/{slug}`
-   `POST /api/v1/contact` (Submit contact form)

### C. Admin Panel (Internal)
Currently implemented as Server-Side Rendered (Blade) views in Laravel (`routes/web.php`):
-   **Dashboard**
-   **CRUD Operations** for Projects, Articles, Services.
-   **Contact Management** (View/Delete messages).
-   **Profile Management**.
-   **Authentication**: Login/Logout/Password Reset.

**⚠️ Critical Note**: Moving to a Node.js/API-only backend means the existing **Blade-based Admin Panel interface will be lost**. You will have the *API endpoints* to manage data, but you will need to build the Admin UI (e.g., in your React Frontend) to interact with them.

---

## 2. Proposed Implementation: NestJS

We recommend **NestJS** as the replacement framework.
-   **Why?**: It uses TypeScript (same as your Frontend), providing type safety and a structured architecture (Controllers/Services) similar to Laravel, making the transition easier and maintenance more streamlined.

### Architecture
-   **Framework**: NestJS
-   **Language**: TypeScript
-   **Database**: PostgreSQL (via Supabase or local) or SQLite.
-   **ORM**: Prisma (Modern, type-safe database access).
-   **Auth**: Passport-JWT (Standard implementation).

### Migration Steps

1.  **Setup**:
    -   Backup existing `backend` to `backend_old`.
    -   Initialize new NestJS project in `backend/`.
    -   Install dependencies (`prisma`, `passport`, etc.).

2.  **Database**:
    -   Define `schema.prisma` matching the entities above.
    -   Run migrations to set up the database.

3.  **Modules & API Implementation**:
    -   **AuthModule**: Login, JWT generation, Guards.
    -   **ProjectsModule**: Public GET endpoints + Admin CRUD (Protected).
    -   **ArticlesModule**: Public GET endpoints + Admin CRUD (Protected).
    -   **ServicesModule**: Public GET endpoints + Admin CRUD (Protected).
    -   **ContactsModule**: Public POST endpoint + Admin GET/DELETE (Protected).
    -   **Uploads**: Handling file uploads (Images) using `multer` (local) or cloud storage.

4.  **Completion**:
    -   Verify all endpoints match the strict specifications of the old API.

## 3. Decision Required

Do you want to proceed with **NestJS**?
And are you aware that the **HTML Admin Dashboard** will need to be rebuilt in your React Frontend?
