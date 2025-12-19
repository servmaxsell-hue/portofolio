# Backend Re-platforming: Laravel to NestJS

Successful migration of the backend infrastructure from Laravel to NestJS.

## 🚀 Key Changes

1.  **Framework Switch**: 
    -   **FROM**: Laravel (PHP)
    -   **TO**: NestJS (Node.js/TypeScript)
    
2.  **API Compatibility**:
    -   The new API strictly matches the previous `api/v1` routes.
    -   Prefix: `/api/v1`
    -   Port: `4000` (to avoid conflict with React on 3000)

3.  **Database**:
    -   Uses **Prisma** ORM with SQLite (`dev.db`).
    -   Schema cloned from Laravel Migrations: `User`, `Project`, `Article`, `Service`, `Contact`.

4.  **Admin Features**:
    -   The old blade-based Admin Dashboard is **removed**.
    -   You DO have full API access to `Projects`, `Articles`, etc.
    -   You need to build Admin UI components in your React Frontend calling these APIs.

## 🛠 How to Run

1.  **Navigate to backend**:
    ```bash
    cd backend
    ```

2.  **Install Dependencies** (if needed):
    ```bash
    npm install
    ```

3.  **Start Server**:
    ```bash
    npm run start:dev
    ```
    The server will be available at `http://localhost:4000/api/v1`.

## 📚 API Endpoints

-   **Auth**:
    -   `POST /auth/login` - Returns JWT Token.

-   **Projects**:
    -   `GET /projects`
    -   `GET /projects/featured`
    -   `GET /projects/:slug`

-   **Articles**:
    -   `GET /articles`
    -   `GET /articles/latest`
    -   `GET /articles/:slug`

-   **Services**:
    -   `GET /services`
    -   `GET /services/:slug`

-   **Contact**:
    -   `POST /contact`

## 🔑 Environment Variables (.env)

-   `DATABASE_URL="file:./dev.db"`
-   `PORT=4000`
-   `JWT_SECRET="supersecretkey"` (Change this for production!)
