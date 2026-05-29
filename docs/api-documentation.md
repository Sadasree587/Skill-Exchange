# Skill Exchange Platform — API Documentation

---

# 🌐 Base URL

```txt
http://localhost:5000/api
```

---

# 🔐 Authentication APIs

## 1. Register User

### Endpoint

```txt
POST /auth/signup
```

### Request Body

```json
{
  "name": "Sadasree",
  "email": "sada@gmail.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "User registered successfully"
}
```

---

## 2. Login User

### Endpoint

```txt
POST /auth/login
```

### Request Body

```json
{
  "email": "sada@gmail.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

# 👤 User APIs

## 1. Get Profile

### Endpoint

```txt
GET /users/profile
```

### Headers

```txt
Authorization: Bearer TOKEN
```

---

## 2. Update Profile

### Endpoint

```txt
PUT /users/profile
```

### Headers

```txt
Authorization: Bearer TOKEN
```

### Request Body

```json
{
  "bio": "Full Stack Developer",
  "location": "Hyderabad",
  "skillsOffered": ["React"],
  "skillsWanted": ["AI"]
}
```

---

# 🧠 Skill APIs

## 1. Get All Users

### Endpoint

```txt
GET /skills/users
```

---

## 2. Search Users by Skill

### Endpoint

```txt
GET /skills/search?skill=React
```

---

# 🔄 Swap Request APIs

## 1. Send Request

### Endpoint

```txt
POST /requests/send
```

### Request Body

```json
{
  "receiverId": "USER_ID",
  "offeredSkill": "React",
  "wantedSkill": "AI"
}
```

---

## 2. Get Sent Requests

### Endpoint

```txt
GET /requests/sent
```

---

## 3. Get Received Requests

### Endpoint

```txt
GET /requests/received
```

---

## 4. Update Request Status

### Endpoint

```txt
PUT /requests/status/:id
```

### Request Body

```json
{
  "status": "accepted"
}
```

---

## 5. Delete Request

### Endpoint

```txt
DELETE /requests/:id
```

---

# 💬 Chat APIs (In Progress)

## Planned APIs

* Send message
* Get chat history
* Real-time socket events
