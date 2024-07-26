# To-Do List Web Application

---

## Prerequisites
- Docker

---

## Setup
Create a `.env` file in the root directory and add the following:
MYSQL_HOST=mysql
MYSQL_USER=tdusr
MYSQL_PASSWORD=tdusr
MYSQL_DB=tododb

MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=tododb

FRONTEND_PORT=8080
BACKEND_PORT=5000
MYSQL_PORT=3306

---

# Getting Started

1.
docker-compose up -d --build

2.
Frontend: http://localhost:8080
Backend API: http://localhost:5000/api/test
