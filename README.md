# 🌉 SkillBridge — Bridge the Gap Between Learning & Industry

**SkillBridge** is a modern experiential talent platform connecting ambitious students with forward-thinking companies. Companies post real-world business challenges, students apply and gain hands-on experience, and verifiable digital certificates are generated automatically upon project completion.
---
## ✨ Features by Role
### 🎓 Students
- **Explore Projects**: Browse live, vetted industry projects across engineering, design, data, and marketing.
- **Project Applications**: Apply directly with tailored cover letters.
- **Track Status**: Monitor application status in real-time (`pending`, `accepted`, `rejected`).
- **Verifiable Certificates**: Automatically earn and display completion certificates with domain credentials once projects are finalized.
### 🏢 Companies
- **Post Opportunities**: Create and manage real-world challenges with required domain expertise and project briefs.
- **Applicant Review**: Review student applicants and select the best candidate.
- **Workflow Management**: Transition projects from `open` to `in-progress` and `completed`.
- **Automated Credentialing**: Marking a project complete automatically generates a certified digital credential for the student.
### 🛡️ Administrators
- **Platform Governance**: Comprehensive admin overview of users, projects, and applications.
- **User Moderation**: Review user profiles and toggle status (`active`, `pending`, `rejected`).
- **Audit Trails**: Full visibility into platform activity, applications, and project completion metrics.
---
## 🛠️ Tech Stack
| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, Tailwind CSS, Framer Motion, Lucide React, Axios, React Router v6 |
| **Backend** | Node.js, Express.js 5, Mongoose 9, JSON Web Tokens (JWT), BcryptJS |
| **Database** | MongoDB (Local / Atlas) |
| **Deployment** | Backend on **Render** (`render.yaml`), Frontend on **Vercel** (`vercel.json`) |
---
## 📂 Project Structure

skillbridge/
├── backend/
│   ├── config/              # MongoDB connection setup
│   ├── middleware/          # JWT auth & role validation middleware
│   ├── models/              # Mongoose schemas (User, Project, Application, Certificate)
│   ├── routes/              # Express API route handlers
│   │   ├── admin.js
│   │   ├── applications.js
│   │   ├── auth.js
│   │   ├── certificates.js
│   │   └── projects.js
│   ├── .env                 # Backend environment variables
│   ├── render.yaml          # Render deployment manifest
│   ├── seed.js              # Database seeding script (Admin bootstrap)
│   └── server.js            # Express app entry point
│
└── frontend/
    ├── public/              # Static assets
    ├── src/
    │   ├── components/      # Navbar, ProtectedRoute, UI elements
    │   ├── context/         # AuthContext & global session management
    │   ├── pages/           # Landing, Login, Register, Dashboards
    │   ├── App.jsx          # Route configurations & protected layout
    │   ├── index.css        # Tailwind styles & theme variables
    │   └── main.jsx         # React DOM mounting
    ├── vercel.json          # Vercel SPA routing & backend API reverse proxy
    └── vite.config.js       # Vite build setup & development proxy
🚀 Getting Started
Prerequisites
Node.js (v18.x or later recommended)
MongoDB (Local instance or MongoDB Atlas connection string)
Git
1. Clone the Repository
bash
git clone https://github.com/Ankit18jsr/SkillBridge.git
cd SkillBridge
2. Backend Setup
Navigate to the backend directory:

bash
cd backend
Install dependencies:

bash
npm install
Configure environment variables by creating a .env file in backend/:

env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/skillbridge
JWT_SECRET=your_super_secret_jwt_key_here
(Optional) Seed the database with the default Master Admin account:

bash
node seed.js
Default Admin Credentials:

Email: admin@skillbridge.com
Password: admin123
Start the backend server:

bash
node server.js
The backend API will run at http://localhost:5000.

3. Frontend Setup
Open a new terminal and navigate to the frontend directory:

bash
cd frontend
Install dependencies:

bash
npm install
Start the Vite development server:

bash
npm run dev
The frontend will be available at http://localhost:5173.

Note: Vite is preconfigured (vite.config.js) to automatically proxy any /api requests to http://localhost:5000 during local development.

📡 API Reference
🔐 Authentication (/api/auth)
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register a new user (student, company, or admin)	❌
POST	/api/auth/login	Authenticate user and receive JWT bearer token	❌

💼 Projects (/api/projects)
Method	Endpoint	Description	Auth Required
GET	/api/projects	Fetch all open projects (public / student browsing)	❌
POST	/api/projects/create	Create a new project	✅ (company / admin)
GET	/api/projects/company	Fetch all projects posted by the logged-in company	✅ (company)
PUT	/api/projects/:id/complete	Mark project as complete & issue certificate	✅ (company)

📝 Applications (/api/applications)
Method	Endpoint	Description	Auth Required
POST	/api/applications/apply	Apply for a project with a cover letter	✅ (student)
GET	/api/applications/student	Get all applications submitted by logged-in student	✅ (student)
PUT	/api/applications/:id/accept	Accept an applicant and mark project in-progress	✅ (company)

🏆 Certificates (/api/certificates)
Method	Endpoint	Description	Auth Required
GET	/api/certificates/student	Get all awarded certificates for the logged-in student	✅ (student)

🛡️ Admin (/api/admin)
Method	Endpoint	Description	Auth Required
GET	/api/admin/users	List all registered users (passwords excluded)	✅ (admin)
PUT	/api/admin/users/:id/status	Update a user's status (active, pending, rejected)	✅ (admin)
GET	/api/admin/projects	Fetch all projects platform-wide	✅ (admin)
GET	/api/admin/applications	Fetch all submitted applications across all projects	✅ (admin)

🚢 Deployment
Backend (Render)
A render.yaml configuration is included in backend/:

Build Command: npm install
Start Command: node server.js
Set MONGO_URI and JWT_SECRET in your Render Environment dashboard.
Frontend (Vercel)
A vercel.json file is configured with rewrites for Single Page Application (SPA) routing and production API proxying:

json
{
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://<your-render-backend-url>/api/:path*"
    },
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}

📄 License
This project is licensed under the ISC License.

<img width="1535" height="753" alt="image" src="https://github.com/user-attachments/assets/b3b102f3-a282-4597-b8a8-3c8ed2e772ed" />
<img width="1535" height="678" alt="image" src="https://github.com/user-attachments/assets/876ab9f1-de54-4df4-b120-177996ef3a4b" />
<img width="1534" height="722" alt="image" src="https://github.com/user-attachments/assets/4072b701-86e2-45e7-87fc-2f6af96ec341" />




