# Technical Debt

## TD-001

Area:
Authentication

Issue:
JWT stored in localStorage.

Risk:
Potential XSS exposure.

Recommended Solution:
Move to HttpOnly Cookies.

Priority:
Medium

---

## TD-002

Area:
Skill Search

Issue:
No indexing implemented.

Risk:
Slow queries at scale.

Recommended Solution:
MongoDB indexes.

Priority:
High