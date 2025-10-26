# 🌆 CivicBuzz — Smart Civic Issue Reporting Platform

> Empowering citizens to report, track, and resolve community issues efficiently.

---

## 🚀 Overview

**CivicBuzz** is a full-stack web platform that enables citizens to report civic issues (like potholes, garbage dumps, water leakage, etc.), visualize them on an interactive map, and track their resolution in real time.

It also features an **AI-powered chatbot** that helps users with updates, feedback, and smart suggestions — making civic engagement easier and faster for everyone.

---

## 🧠 Key Features

- 🧾 **Report Issues Easily** — Add title, description, image & location  
- 🗺️ **Interactive Map View** — View all reports dynamically  
- 🟡 **Track Issue Status** — Pending → Resolved in real time  
- 🤖 **AI Chatbot** — Get instant help and civic insights  
- 🧹 **Admin Actions** — Mark issues as resolved or edit details  
- 📸 **Image Upload Support** — Attach photos for clarity  
- 🗂️ **Filter & Sort** — View issues by date or status  
- 🌐 **Fully Deployed** —  
  - Frontend: **Netlify**  
  - Backend: **Render**  
  - Database: **MongoDB Atlas**

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Tailwind CSS, Leaflet (Map) |
| **Backend** | Node.js, Express.js, Multer |
| **Database** | MongoDB Atlas |
| **AI Chatbot** | OpenAI API Integration |
| **Deployment** | Render (Backend), Netlify (Frontend) |

---

## 🧩 Project Structure

```

CivicBuzz/
│
├── civicbuzz-frontend/     # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── civicbuzz-backend/      # Node/Express backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md

````

---

## ⚙️ Installation (Local Setup)

### 🔧 1. Clone the repository
```bash
git clone https://github.com/BurleJitendri/civicbuzz.git
cd civicbuzz
````

### 💻 2. Install dependencies

#### Frontend:

```bash
cd civicbuzz-frontend
npm install
```

#### Backend:

```bash
cd ../civicbuzz-backend
npm install
```

### ⚙️ 3. Add Environment Variables

Create `.env` in the backend folder:

```
PORT=5000
MONGO_URI=your-mongodb-atlas-uri
OPENAI_API_KEY=your-openai-api-key
```

---

## 🧠 Running the Project Locally

### 🖥️ Run Backend:

```bash
cd civicbuzz-backend
npm start
```

### 🌐 Run Frontend:

```bash
cd civicbuzz-frontend
npm start
```

Frontend runs on `http://localhost:3000`
Backend runs on `http://localhost:5000`

---

## 🌍 Deployment Links

| Component    | Platform | Live URL                                                                         |
| ------------ | -------- | -------------------------------------------------------------------------------- |
| **Frontend** | Netlify  | [https://civicbuzz.netlify.app](https://civicbuzz.netlify.app)                   |
| **Backend**  | Render   | [https://civicbuzz-backend.onrender.com](https://civicbuzz-backend.onrender.com) |

*(Replace these with your actual URLs if they differ)*

---

## 🤖 AI Chatbot Integration

The chatbot uses the **OpenAI API** to help users with:

* Reporting guidance
* Issue tracking
* Civic improvement suggestions

Integrated in the backend (`/routes/chatbotRoutes.js`) and accessible from the Chatbot page on the frontend.

---

## 🧰 API Endpoints

| Method   | Endpoint          | Description            |
| -------- | ----------------- | ---------------------- |
| `GET`    | `/api/issues`     | Get all issues         |
| `POST`   | `/api/issues`     | Create a new issue     |
| `PATCH`  | `/api/issues/:id` | Update issue status    |
| `PUT`    | `/api/issues/:id` | Edit issue details     |
| `DELETE` | `/api/issues/:id` | Delete issue           |
| `POST`   | `/api/chat`       | Chat with AI assistant |

---

## 👥 Team — Hackarena 2025
 
 **Jitendri Burle**         
 **Joshitha Ganagalla**      
 **Kusu Hari Rama Priyanka**

## 💬 Contact

📧 **Jitendri Burle** — [burlejitendri@gmail.com](mailto:burlejitendri@gmail.com)

---

## 🏁 Future Enhancements

* 📍 Real-time GPS-based location detection
* 📢 Notifications for issue status updates
* 🧾 User profiles and issue history
* 🤖 Smarter AI chatbot with regional language support
* 🏛️ Dedicated Admin dashboard for authorities

---

## 🏆 Hackarena 2025

CivicBuzz was developed as part of **Hackarena 2025**, with the goal of bridging the gap between citizens and authorities through a digital, transparent civic issue management system.

> “When citizens are heard, communities thrive.” 🌍


## 📜 License

This project is licensed under the **MIT License** — free to use and modify with attribution.


### 💬 Made with ❤️ and ☕ by Team CivicBuzz — Hackarena 2025
