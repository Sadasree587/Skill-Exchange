# Skill Exchange Platform — Database Design

---

# Database

MongoDB Atlas

---

# Collections

* users
* swaprequests
* messages

---

# User Schema

## Fields

| Field         | Type   | Purpose             |
| ------------- | ------ | ------------------- |
| name          | String | User name           |
| email         | String | Authentication      |
| password      | String | Hashed password     |
| skillsOffered | Array  | Skills user teaches |
| skillsWanted  | Array  | Skills user wants   |
| bio           | String | User description    |
| location      | String | User location       |
| profilePic    | String | Profile image       |

---

# SwapRequest Schema

| Field        | Type     | Purpose                   |
| ------------ | -------- | ------------------------- |
| sender       | ObjectId | Request sender            |
| receiver     | ObjectId | Request receiver          |
| offeredSkill | String   | Skill offered             |
| wantedSkill  | String   | Skill requested           |
| status       | String   | pending/accepted/rejected |

---

# Message Schema

| Field    | Type     | Purpose          |
| -------- | -------- | ---------------- |
| sender   | ObjectId | Message sender   |
| receiver | ObjectId | Message receiver |
| message  | String   | Chat content     |

---

# Relationships

User
↳ SwapRequest.sender
↳ SwapRequest.receiver

User
↳ Message.sender
↳ Message.receiver

## User

+ isAdmin (Boolean)

Purpose:
Role-based authorization for Admin Panel.
