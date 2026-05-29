# Skill Exchange Platform — Bugs and Fixes

---

# 🐞 Bug 1 — package.json Not Found

## Error

```txt
npm ERR! enoent Could not read package.json
```

## Cause

Running npm command in wrong directory.

## Fix

Navigate to correct folder:

```bash
cd server
```

---

# 🐞 Bug 2 — Invalid package.json

## Error

```txt
EJSONPARSE
```

## Cause

Invalid JSON formatting.

## Fix

Check:

* extra commas
* missing braces
* duplicate brackets

---

# 🐞 Bug 3 — Password Returned in API Response

## Problem

Password hash exposed in update profile response.

## Cause

Returning entire user object directly.

## Fix

Exclude password field:

```js
.select("-password")
```

---

# 🐞 Bug 4 — JWT Token Failed

## Error

```txt
Token failed
```

## Cause

Invalid/missing Bearer token.

## Fix

Set header:

```txt
Authorization: Bearer TOKEN
```

---

# 🐞 Bug 5 — req.body Undefined

## Error

```txt
Cannot destructure property 'status' of 'req.body'
```

## Cause

Request body not sent in Postman.

## Fix

Use:

* Body
* raw
* JSON

And send:

```json
{
  "status": "accepted"
}
```

---

# 🐞 Bug 6 — Git Object Deletion Failed

## Error

```txt
Deletion of directory '.git/objects'
```

## Cause

Windows file lock issue.

## Fix

Usually harmless.
Use:

```bash
git status
```

If working tree clean → commit succeeded.

---

# 🐞 Bug 7 — Multiple User Token Confusion

## Problem

Single token variable not scalable.

## Fix

Use multiple environment variables:

```txt
tokenSada
tokenRahul
tokenVinod
```

---

# 📌 Lessons Learned

* Always separate controllers/routes/models
* Never return passwords
* Save all APIs in Postman
* Maintain environment variables properly
* Use documentation continuously
