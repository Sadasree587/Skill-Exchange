# Skill Exchange Platform — Frontend Structure

---

# Frontend Stack

* React
* Vite
* React Router
* Axios
* Tailwind CSS

---

# Planned Structure

client/
├── src/
│
├── api/
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── socket/
├── utils/

---

# Page Plan

| Page      | Purpose             |
| --------- | ------------------- |
| Home      | Landing page        |
| Login     | Authentication      |
| Signup    | Registration        |
| Dashboard | Main user panel     |
| Profile   | User profile        |
| Skills    | Skill discovery     |
| Requests  | Swap management     |
| Chat      | Real-time messaging |

---

# Component Strategy

Reusable Components:

* Navbar
* Sidebar
* SkillCard
* RequestCard
* ChatBubble
* Loader

---

# State Management Plan

Initial:

* Context API

Possible Future:

* Redux Toolkit

---

# API Strategy

Axios central instance:
src/api/axios.js

Purpose:

* reusable base URL
* auth headers
* interceptors
