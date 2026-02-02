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

### Technology Stack

**Backend**
- Laravel 11 (PHP)
- MySQL Database
- Laravel Sanctum (Authentication)
- Spatie Laravel Permission (Role Management)

**Frontend**
- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- React Query (Data Fetching)
- Formik + Yup (Form Handling)
- Radix UI Components

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
