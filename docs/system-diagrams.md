# System Diagrams

## High-Level Architecture

User
 |
React Frontend
 |
Express API
 |
MongoDB Atlas

---

## Authentication Flow

User
 |
Login Request
 |
JWT Generation
 |
JWT Returned
 |
Protected API Access

---

## Chat Flow

User A
 |
Socket Event
 |
Server
 |
Socket Event
 |
User B`