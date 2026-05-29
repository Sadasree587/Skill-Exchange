# Skill Exchange Platform — Architecture Notes

---

# 📌 System Architecture

Architecture Type:
Monolithic MERN Architecture

Frontend:
React + Vite

Backend:
Node.js + Express.js

Database:
MongoDB Atlas

Realtime:
Socket.io

Authentication:
JWT Token Based Authentication

---

# 📌 Backend Architecture Strategy

Pattern Used:
MVC Architecture

Structure:

* Models
* Controllers
* Routes
* Middleware

Reason:
Separation of concerns and scalability.

---

# 📌 Authentication Design

Flow:

1. User signs up
2. Password hashed using bcrypt
3. JWT generated during login
4. JWT stored on frontend
5. Protected routes use middleware verification

---

# 📌 API Design Principles

* REST API architecture
* Route separation
* Controller separation
* Protected route middleware
* JSON responses

---

# 📌 Database Design Decisions

## User Model

Stores:

* profile
* skills
* authentication
* bio
* location

## SwapRequest Model

Stores:

* sender
* receiver
* offered skill
* wanted skill
* request status

## Message Model

Stores:

* sender
* receiver
* message content
* timestamps

---

# 📌 Socket.io Architecture

Connection Flow:

1. User connects
2. User joins personal room
3. Messages emitted in real time
4. Receiver receives instantly

Important:
Socket is transport layer only.
Database stores permanent messages.

---

# 📌 Postman Testing Strategy

Environment Variables:

* base_url
* tokenSada
* tokenRahul
* tokenVinod

Collections:

* Auth APIs
* User APIs
* Skill APIs
* Request APIs
* Chat APIs
* Admin APIs

---

# 📌 Security Notes

* Passwords hashed using bcrypt
* JWT verification middleware
* Password excluded from responses
* Protected routes secured

---

# 📌 Future Scalability Plans

Planned Improvements:

* Redis caching
* Docker support
* Microservices exploration
* AI skill matching
* Notification system
* File uploads
* Cloudinary integration

---

# 📌 Frontend Architecture Plan

Planned Structure:

* Pages
* Components
* Services
* API layer
* Route protection
* Global auth state

---

# 📌 Engineering Rules

* Never mix business logic in routes
* Keep controllers clean
* Reusable middleware only
* Document every major change
* Commit after every stable phase
