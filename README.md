# Full-Stack AI Chatbot Setup Instructions

Welcome to your new Full-Stack AI Chatbot Web Application! This guide contains step-by-step instructions on how to set up, run, and test your new application.

## 📂 Project Structure Analysis

Here is an explanation of where each file goes:

- **/frontend**: Contains the React + Vite frontend code. It handles all UI components, routing, and styling with Tailwind CSS.
  - `/src/components`: Reusable UI parts like Sidebar, ChatInput, loading spinners, etc.
  - `/src/pages`: Main page layouts like Login, Signup, and Chat interfaces.
- **/backend**: Contains the Node.js + Express backend code.
  - `/controllers`: Logic for handling requests (login logic, AI logic, etc).
  - `/routes`: API endpoints definition.
  - `/database`: Database connection and queries setup.
  - `/server.js`: The main entry point for the backend application.
- **database.sql**: The SQL script that creates your MySQL database and necessary tables (`users`, `chats`).

## 🛠 Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16.x or newer)
- [MySQL Server](https://dev.mysql.com/downloads/) (must be running on your machine)

## 🚀 Step 1: Database Setup

1. Start your local MySQL server.
2. Open your terminal or your favorite MySQL client (like MySQL Workbench, TablePlus, or Adminer).
3. Import the database schema by either running the `database.sql` script directly inside your client, or running the following command from this project directory:
   ```bash
   mysql -u root -p < database.sql
   ```
   *(It will prompt for your MySQL root password).* This creates the `ai_chatbot` database alongside the `users` and `chats` tables.

## ⚙️ Step 2: Backend Setup

1. Open a new terminal window and navigate into the backend folder:
   ```bash
   cd backend
   ```
2. By default, the `package.json` in `./backend` already has its dependencies established. Since we generated the code for you, just run:
   ```bash
   npm install
   ```
3. Update the `.env` file inside the `backend/` directory:
   - Make sure `DB_PASS` matches your local MySQL password.
   - You can replace the `JWT_SECRET` string with your own random secret if desired.
   - For `OPENAI_API_KEY` (or the generic AI service you wish to use), place a valid API key. Wait, if you don't have one, the backend currently mocks the response by default or you can toggle it!
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *Your backend should now be listening on `http://localhost:5000`.*

## 🎨 Step 3: Frontend Setup

1. Open a new terminal window (keep the backend terminal running!) and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client should now be running locally, usually at `http://localhost:5173`.*

## 🧩 How to Connect Frontend and Backend

The connection between the Frontend and Backend is straightforward:
- The React application inside `/frontend` uses **Axios** (an HTTP client layer) to make network requests.
- All requests target the base url of your Express server, which is running locally at `http://localhost:5000`.
- We've enabled **CORS** (Cross-Origin Resource Sharing) inside `/backend/server.js`, allowing our `localhost:5173` React UI to talk across the network to `localhost:5000`.

## 🧪 How to Test the Chatbot

1. **Visit the Frontend URL:** Go to `http://localhost:5173` in your browser.
2. **Sign Up:** Since database tables are fresh, click "Sign Up" to register a newly created temporary user.
3. **Login:** Log in with those freshly registered credentials.
4. **Chat Interface:** Once authorized, try typing a message like `Hello, bot!`. You'll see:
   - The UI auto-scrolls.
   - A pulsing loading indicator (`Typing...`) appears.
   - Dark/Light mode toggle switch in the sidebar handles theming gracefully.
   - The history magically appears in the left panel.
5. **Verify Database:** Open your MySQL client, run `SELECT * FROM chats;` and notice the saved conversations!

## ⚠️ Common Errors & Fixes
- **"ER_ACCESS_DENIED_ERROR" Node / Express:** The credentials inside your `server/.env` don't match your local MySQL configuration. Fix the `DB_PASS` and `DB_USER`.
- **"Network Error" on UI Login Form:** Your Node/Express server isn't running or isn't accessible. Make sure to run `npm run dev` in the `server` directory.
- **"CORS policy blocked":** Ensure the React URL matches the frontend domain whitelisted in `server.js` or that `app.use(cors())` runs correctly.
- **Port Conflicts:** If `localhost:3000` or `5000` is already in use, you'll need to kill those processes or update the ports in `.env` and `client/src/App.jsx`.
