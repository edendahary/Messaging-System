
# 📩 Messaging System – Full Stack Assignment

A full-stack messaging system that simulates sending messages through an external provider, including asynchronous status updates, retries with backoff, and a reactive UI.

## ✨ Features

### Backend

* Create and list messages
* Asynchronous message sending
* Message statuses: `pending`, `sent`, `failed`
* Retry mechanism with incremental backoff
* Idempotent requests using `x-request-id`
* Simulated external provider (Webhook-like behavior)
* Clean layered architecture (routes / controllers / services)

### Frontend

* Messages table (MUI)
* Real-time status updates (polling)
* Add message dialog
* Form validation with React Hook Form + Yup
* Axios API layer
* React Query for async state management
* Loading / empty / error states

---


## 🔄 Message Flow

1. User sends a message
2. Server responds with `202 Accepted`
3. Message status starts as `pending`
4. Async send process begins
5. Provider simulation completes
6. Status updates to `sent` or `failed`
7. UI updates automatically

---

## 🔁 Retry & Backoff

* Failed sends are retried automatically
* Delay increases with each attempt
* After max retries → message is marked as `failed`

---

## 🧪 Idempotency

* Each request includes `x-request-id`
* Duplicate requests return the same result
* Prevents duplicate message creation

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express
* TypeScript

**Frontend**

* React
* TypeScript
* MUI
* Axios
* React Query
* React Hook Form
* Yup

---

## ▶️ Running the Project

### Backend

```bash
cd server
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## 📌 Notes And Improvments

* Message storage is in-memory (assignment scope)
* Designed for easy extension:

  * Database persistence
  * Real external providers
  * Authentication(JWT)
  * Pagination / filtering
  * Responsive UI
  * Validation for email
  * Create users
  * Pages for users with there information

---

## ✅ Assignment Coverage

* ✔ Asynchronous processing
* ✔ Error handling & retries
* ✔ Clean architecture
* ✔ UI state management
* ✔ Client-side validation
* ✔ External system simulation

---
