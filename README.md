# Dynamic Survey Management System

A comprehensive full-stack survey management platform that enables administrators to create dynamic surveys and officers to submit responses. Built with modern web technologies for performance, scalability, and user experience.

## 🌟 Overview

This system provides a complete solution for managing surveys in organizational settings. Administrators can create custom surveys with various field types, monitor submissions in real-time, and export data. Officers can view assigned surveys, submit responses, and track their completion status.

## ✨ Key Features

### For Administrators
- **Survey Builder**: Create surveys with multiple field types (text, textarea, number, date, select, radio, checkbox)
- **Field Management**: Add custom validation, help text, and configure required fields
- **Submission Tracking**: View and analyze all survey responses in a centralized dashboard
- **Status Control**: Manage survey lifecycle with draft and active states
- **Real-time Updates**: See submission counts and statistics as they happen

### For Officers
- **Survey Discovery**: Browse all available active surveys
- **Response Submission**: Fill out surveys with intuitive form interfaces
- **Validation**: Built-in client and server-side validation ensures data quality
- **Progress Tracking**: Visual indicators show completion status

### Technical Highlights
- **Role-based Access Control**: Secure authentication with admin and officer roles
- **RESTful API**: Well-structured API endpoints for all operations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Type Safety**: Full TypeScript implementation in frontend
- **Data Validation**: Robust validation at both client and server levels

## 🏗️ Architecture

```
dynamic-survey-management/
├── survey-backend/      # Laravel 11 REST API
└── survey-frontend/     # Next.js 14 Web Application
```

## 🛠️ Technology Stack

### Backend
- **Framework**: Laravel 11.x
- **Language**: PHP 8.2+
- **Database**: MySQL 8.0+
- **Authentication**: Laravel Sanctum (Token-based)
- **Authorization**: Spatie Laravel Permission (Role & Permission Management)
- **API**: RESTful API with Resource Controllers
- **Validation**: Form Request Validation
- **ORM**: Eloquent ORM
- **Migration**: Database Version Control
- **Testing**: PHPUnit

### Frontend
- **Framework**: Next.js 14.2.35 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.4
- **Component Library**: Radix UI (shadcn/ui)
- **State Management**: React Query (TanStack Query v5)
- **Form Handling**: Formik + Yup Validation
- **HTTP Client**: Native Fetch API
- **Icons**: Lucide React
- **Build Tool**: Turbopack

### Development Tools
- **Version Control**: Git
- **Package Managers**: Composer (PHP), npm (Node.js)
- **Code Quality**: ESLint, TypeScript Compiler
- **API Testing**: Postman (collection included)

## 🎯 Design Decisions

### Architecture Choices

**1. Monorepo Structure**
- Separate frontend and backend in a single repository
- Easier version control and deployment coordination
- Shared documentation and configuration

**2. API-First Approach**
- Backend exposes RESTful API endpoints
- Frontend consumes API for all data operations
- Clear separation of concerns
- Enables future mobile app integration

**3. Token-Based Authentication**
- Laravel Sanctum for stateless authentication
- Cookie + localStorage for token persistence
- Role-based middleware for route protection
- Supports multiple client applications

**4. Dynamic Field System**
- Flexible survey field architecture
- Supports multiple field types without code changes
- JSON storage for field options and configurations
- Order-based field rendering

### Frontend Decisions

**1. Next.js App Router**
- Server-side rendering for better SEO and performance
- Route groups for logical organization (auth, admin, officer)
- Built-in API routes for middleware operations
- Optimized bundle sizes with automatic code splitting

**2. React Query for Data Management**
- Automatic caching and background refetching
- Optimistic updates for better UX
- Reduced boilerplate compared to Redux
- Built-in loading and error states

**3. Formik for Form Handling**
- Industry-standard form library
- Easy validation with Yup schemas
- Handles complex nested forms (survey builder)
- Better than uncontrolled forms for dynamic fields

**4. Tailwind CSS**
- Utility-first approach for rapid development
- Consistent design system
- Small production bundle size
- Easy customization with theme configuration

### Backend Decisions

**1. Laravel Framework**
- Mature ecosystem with excellent documentation
- Built-in authentication and authorization
- Eloquent ORM for database interactions
- Strong community support

**2. Separate Tables for Fields and Options**
- Normalized database structure
- Efficient queries with eager loading
- Easy to add new field types
- Maintains data integrity

**3. Service Layer Pattern**
- SurveySubmissionService for business logic
- Controllers remain thin and focused
- Reusable logic across different contexts
- Easier testing and maintenance

**4. API Resources for Responses**
- Consistent response formatting
- Control over exposed data
- Easy to add/remove fields
- Type safety with frontend TypeScript

## 📖 Project Setup Instructions

### System Requirements

**For Backend:**
- PHP >= 8.2 with extensions: OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath
- Composer >= 2.0
- MySQL >= 8.0 or MariaDB >= 10.5
- Apache/Nginx web server (for production)

**For Frontend:**
- Node.js >= 18.0
- npm >= 9.0 or Yarn >= 1.22

### Initial Setup

**1. Clone Repository**
```bash
git clone https://github.com/Devvify/dynamic-survey-management.git
cd dynamic-survey-management
```

**2. Backend Setup**
```bash
# Navigate to backend
cd survey-backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
# DB_DATABASE=survey_db
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Create database
mysql -u root -p -e "CREATE DATABASE survey_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations and seeders
php artisan migrate --seed

# Start development server
php artisan serve
```

Backend runs on: http://localhost:8000

**3. Frontend Setup**
```bash
# Navigate to frontend (in new terminal)
cd survey-frontend

# Install Node dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Configure API URL in .env.local
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Start development server
npm run dev
```

Frontend runs on: http://localhost:3000

### Seeded User Accounts

After running `php artisan migrate --seed`, you can login with:

**Administrator Account**
```
Email: admin@example.com
Password: password
```

**Officer Account**
```
Email: officer@example.com
Password: password
```

### Postman Collection

Import `postman.json` in Postman for API testing:
1. Open Postman
2. Click Import
3. Select `postman.json` from project root
4. Configure environment variable: `base_url = http://localhost:8000/api`

## ⚠️ Assumptions & Limitations

### Assumptions

**1. User Management**
- Users are pre-created by system administrators
- No self-registration feature
- Email addresses are unique and verified offline
- Password reset handled through direct database updates

**2. Survey Lifecycle**
- Surveys have two states: draft and active
- Draft surveys are not visible to officers
- Active surveys cannot be edited once published
- No soft-delete functionality (surveys are permanently deleted)

**3. Submissions**
- Officers can submit a survey only once (based on requirements)
- Submissions cannot be edited after submission
- No partial save or draft submissions
- All submissions are final and timestamped

**4. Field Types**
- Predefined field types: text, textarea, number, date, select, radio, checkbox
- No file upload support
- No rich text editor for textarea fields
- Maximum field count per survey is unlimited (no hard limit set)

**5. Data Storage**
- Checkbox and multi-select values stored as JSON arrays
- Single-value fields stored as text
- No file storage or attachment support
- Data retention is permanent (no auto-cleanup)

### Current Limitations

**1. Performance**
- No pagination on survey fields (assumes reasonable field count)
- No caching layer (Redis) implemented
- No database query optimization for large datasets
- Real-time updates require page refresh

**2. Security**
- Basic CSRF protection only
- No rate limiting on API endpoints
- No two-factor authentication
- Session timeout is browser-dependent

**3. Features Not Implemented**
- Survey analytics and reporting dashboard
- Export submissions to CSV/Excel
- Survey templates or cloning
- Bulk operations (delete multiple surveys)
- Survey scheduling (start/end dates)
- Survey notifications or reminders
- Conditional logic (show/hide fields based on answers)
- Multi-language support

**4. Validation**
- Frontend validation is basic (required fields only)
- No custom regex patterns for field validation
- No min/max length validation for text fields
- No cross-field validation

**5. UI/UX**
- No drag-and-drop field reordering in builder
- Mobile UI is responsive but not optimized
- No dark mode support
- Limited accessibility features (ARIA labels)

**6. Testing**
- No automated tests implemented
- No CI/CD pipeline configured
- No end-to-end testing
- Manual testing only

**7. Deployment**
- No Docker compose file for easy deployment
- No production environment configuration examples
- No monitoring or logging setup
- No backup/restore procedures documented

### Known Issues

1. **Browser Compatibility**: Tested primarily on Chrome/Firefox. Safari may have minor styling issues.
2. **Timezone Handling**: All timestamps stored in UTC, no timezone conversion in UI
3. **Concurrent Edits**: No locking mechanism for simultaneous survey editing
4. **Large Datasets**: Performance may degrade with 1000+ submissions per survey

### Future Enhancements

- Implement survey analytics dashboard
- Add CSV/Excel export functionality
- Support conditional field logic
- Add survey templates and duplication
- Implement real-time notifications
- Add comprehensive testing suite
- Optimize database queries with caching
- Implement rate limiting and advanced security
- Add accessibility improvements (WCAG 2.1 compliance)

## 🚀 Quick Start

### Prerequisites

- PHP 8.2 or higher
- Composer 2.x
- Node.js 18+ and npm/yarn
- MySQL 8.0 or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Devvify/dynamic-survey-management.git
   cd dynamic-survey-management
   ```

2. **Set up the backend**
   ```bash
   cd survey-backend
   cp .env.example .env
   composer install
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```
   Backend will run at `http://localhost:8000`

3. **Set up the frontend**
   ```bash
   cd ../survey-frontend
   cp .env.example .env.local
   npm install
   npm run dev
   ```
   Frontend will run at `http://localhost:3000`

### Default Credentials

After seeding, you can login with:

**Administrator**
- Email: `admin@example.com`
- Password: `password`

**Officer**
- Email: `officer@example.com`
- Password: `password`

## 📚 Documentation

### Backend API
See [survey-backend/README.md](survey-backend/README.md) for:
- API endpoints documentation
- Database schema
- Authentication flow
- Deployment guide

### Frontend Application
See [survey-frontend/README.md](survey-frontend/README.md) for:
- Component structure
- State management
- Routing configuration
- Build and deployment

## 🔧 Configuration

### Environment Variables

**Backend** (`.env`):
```env
DB_DATABASE=survey_db
DB_USERNAME=root
DB_PASSWORD=
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## 🛠️ Development

### Running Tests

**Backend**
```bash
cd survey-backend
php artisan test
```

**Frontend**
```bash
cd survey-frontend
npm run test
```

### Code Quality

**Backend**
```bash
composer run lint        # PHP CS Fixer
composer run analyse     # PHPStan
```

**Frontend**
```bash
npm run lint            # ESLint
npm run type-check      # TypeScript
```

## 📦 Deployment

### Production Build

**Backend**
```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

**Frontend**
```bash
npm run build
npm start
```

### Recommended Infrastructure
- **Application Server**: Apache/Nginx with PHP-FPM
- **Database**: MySQL 8.0+ or MariaDB 10.5+
- **Cache**: Redis (optional, for better performance)
- **Frontend Hosting**: Vercel, Netlify, or Node.js server

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:
- Follows existing code style
- Includes appropriate tests
- Updates documentation as needed
- Passes all linting and tests

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Laravel community for the excellent framework
- Next.js team for the powerful React framework
- All open-source contributors whose packages made this possible

## 📧 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Email: support@devvify.com
- Documentation: [Project Wiki](https://github.com/Devvify/dynamic-survey-management/wiki)

---

Built with ❤️ by the Devvify Team
