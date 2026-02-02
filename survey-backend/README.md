# Survey Backend API

Laravel 11 REST API backend for the Dynamic Survey Management System. Provides secure endpoints for survey creation, submission handling, and user management with role-based access control.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database](#database)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Deployment](#deployment)

## ✨ Features

- **RESTful API**: Clean, organized API endpoints following REST principles
- **Authentication**: Secure token-based authentication using Laravel Sanctum
- **Role Management**: Admin and Officer roles with Spatie Permission package
- **Survey CRUD**: Complete survey lifecycle management
- **Dynamic Fields**: Support for multiple field types with custom validation
- **Submission Handling**: Efficient survey response storage and retrieval
- **Data Validation**: Server-side validation for all inputs
- **CORS Support**: Configured for frontend integration
- **Database Migrations**: Version-controlled schema management
- **Seeders**: Sample data for development and testing

## 🛠️ Tech Stack

- **Framework**: Laravel 11.x
- **PHP Version**: 8.2+
- **Database**: MySQL 8.0+ / MariaDB 10.5+
- **Authentication**: Laravel Sanctum
- **Permissions**: Spatie Laravel Permission
- **API Resources**: Laravel API Resources for data transformation
- **Validation**: Form Request classes
- **Testing**: PHPUnit

## 🚀 Installation

### Prerequisites

- PHP 8.2 or higher
- Composer 2.x
- MySQL 8.0+
- Git

### Setup Steps

1. **Navigate to backend directory**
   ```bash
   cd survey-backend
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   ```

4. **Generate application key**
   ```bash
   php artisan key:generate
   ```

5. **Configure database**
   Edit `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=survey_db
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

6. **Run migrations and seeders**
   ```bash
   php artisan migrate --seed
   ```

7. **Start development server**
   ```bash
   php artisan serve
   ```

The API will be available at `http://localhost:8000`

## ⚙️ Configuration

### Environment Variables

```env
# Application
APP_NAME="Survey Management API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=survey_db
DB_USERNAME=root
DB_PASSWORD=

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

### CORS Configuration

CORS is configured in `config/cors.php` to allow requests from the frontend application.

## 🗄️ Database

### Schema Overview

**Users Table**
- id, name, email, password
- Manages admin and officer accounts

**Roles & Permissions**
- Managed by Spatie Permission package
- Roles: admin, officer

**Surveys Table**
- id, title, description, status, created_by
- Survey metadata and status tracking

**Survey Fields Table**
- id, survey_id, key, label, type, is_required, order
- Dynamic field definitions

**Survey Field Options Table**
- id, field_id, label, value, order
- Options for select, radio, and checkbox fields

**Survey Submissions Table**
- id, survey_id, submitted_by, created_at
- Submission records

**Submission Answers Table**
- id, submission_id, field_id, value_text, value_json
- Individual field responses

### Running Migrations

```bash
# Run all migrations
php artisan migrate

# Rollback last batch
php artisan migrate:rollback

# Fresh migration with seeding
php artisan migrate:fresh --seed

# Check migration status
php artisan migrate:status
```

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | User login | No |
| POST | `/auth/logout` | User logout | Yes |
| GET | `/auth/me` | Get current user | Yes |

### Admin Survey Endpoints

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/admin/surveys` | List all surveys | Admin |
| POST | `/admin/surveys` | Create survey | Admin |
| GET | `/admin/surveys/{id}` | Get survey details | Admin |
| PUT | `/admin/surveys/{id}` | Update survey | Admin |
| DELETE | `/admin/surveys/{id}` | Delete survey | Admin |
| GET | `/admin/surveys/{id}/submissions` | Get submissions | Admin |

### Officer Survey Endpoints

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/officer/surveys` | List active surveys | Officer |
| GET | `/officer/surveys/{id}` | Get survey details | Officer |
| POST | `/officer/surveys/{id}/submit` | Submit survey response | Officer |

### Request/Response Examples

**Login Request**
```json
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "password"
}
```

**Login Response**
```json
{
  "token": "1|abc123...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "roles": ["admin"]
  }
}
```

**Create Survey Request**
```json
POST /api/admin/surveys
{
  "title": "Employee Feedback Survey",
  "description": "Annual feedback form",
  "status": "active",
  "fields": [
    {
      "key": "employee_name",
      "label": "Your Name",
      "type": "text",
      "is_required": true,
      "order": 1
    }
  ]
}
```

## 🔐 Authentication

### Sanctum Token Authentication

1. **Login** to receive a bearer token
2. **Include token** in all subsequent requests:
   ```
   Authorization: Bearer {token}
   ```

3. **Logout** to revoke the token

### Middleware Protection

Routes are protected using:
- `auth:sanctum` - Requires valid token
- `role:admin` - Requires admin role
- `role:officer` - Requires officer role

## 📦 Deployment

### Production Checklist

1. **Environment Setup**
   ```bash
   APP_ENV=production
   APP_DEBUG=false
   ```

2. **Optimize Application**
   ```bash
   composer install --optimize-autoloader --no-dev
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. **Database**
   ```bash
   php artisan migrate --force
   ```

4. **Permissions**
   ```bash
   chmod -R 755 storage bootstrap/cache
   ```

### Server Requirements

- PHP >= 8.2
- MySQL >= 8.0
- Composer
- Required PHP extensions: OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath

---

Built with Laravel 11 | Maintained by Devvify Team
