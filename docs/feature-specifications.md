# Feature Specifications

## Feature: User Registration

Objective:
Allow users to create accounts.

Actors:
- Guest User

Preconditions:
- Email must be unique

Inputs:
- Name
- Email
- Password

Validation Rules:
- Email required
- Password >= 6 characters

Success Flow:
1. User submits form
2. Password hashed
3. User saved
4. Success response returned

Failure Cases:
- Duplicate email
- Invalid data

Related APIs:
POST /auth/signup

Feature:
Notification System

Actors:
Authenticated Users

Inputs:
Swap Request Events

Outputs:
Unread Notifications

APIs:
GET /notifications
PUT /notifications/:id/read
PUT /notifications/read-all