# CalmLens - Mental Health & Wellness Platform

CalmLens is a quick beginner-level university assignment to demonstrate skills in full-stack development using the MERN (MongoDB, Express, React, Node.js) stack.

<br />

## Pages Overview
- **Home** - Introduction to CalmLens.  
- **Login / Register** - User authentication.  
- **Quiz** - Mental health quizzes.  
- **Meditation** - Guided meditation audios.  
- **Blog** - Mental health articles.  
- **About Us** - Team and purpose.  
- **Quick Help** - Tips and resources.  
- **Donations** - Demo-only donation page.  
- **Account** - Profile management and settings.  

<br />

## Technologies Used
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Bcrypt.

<br />

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/verhambot/CalmLens.git
   cd CalmLens
   ```
2. Install dependencies:
   ```bash
   cd backend && npm install
   ```
   ```bash
   cd frontend && npm install
   ```
3. Get MongoDB URI for the database.
4. Create `backend/.env` file:
   ```.env
   MONGO_URI="<REPLACE WITH MONGODB URI>"
   SESSION_SECRET="helloworld"
   PORT=5000
   ```
6. Start the development servers:
   ```bash
   cd backend
   npm run dev
   ```
   ```bash
   cd frontend
   npm run dev
   ```
7. Open your browser at `http://localhost:5173` to view the app.

<br />

## Contributors
- **Amogh Kulkarni** - https://github.com/verhambot
- **Vishnu Girish**
- **Yuv Nahar** - https://github.com/yuvnahr

<br />

## License
This project is licensed under the MIT License. Feel free to modify and distribute it as needed.

<br />

---
**Disclaimer:** CalmLens is a demo project and does not replace professional mental health support. Please consult a licensed professional for medical advice.

