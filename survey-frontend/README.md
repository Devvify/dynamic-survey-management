# Survey Frontend Application

Modern, responsive web application built with Next.js 14 and TypeScript for the Dynamic Survey Management System. Provides intuitive interfaces for administrators to manage surveys and officers to submit responses.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Development](#development)
- [API Integration](#api-integration)
- [Deployment](#deployment)

## ✨ Features

### Administrator Dashboard
- **Survey Management**: Create, edit, and delete surveys
- **Field Builder**: Visual interface for adding various field types
- **Submission Viewer**: Real-time submission tracking
- **Status Control**: Manage survey lifecycle (draft/active)
- **Responsive Design**: Optimized for all screen sizes

### Officer Portal
- **Survey Discovery**: Browse available active surveys
- **Form Filling**: Intuitive form interface with validation
- **Progress Tracking**: Visual indicators for completion

### Technical Features
- **Server-Side Rendering**: Fast initial page loads with Next.js
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: Client-side validation with Formik and Yup
- **Data Fetching**: Efficient caching with React Query
- **Authentication**: Secure cookie-based auth with role management
- **UI Components**: Beautiful, accessible components from Radix UI

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.35 (React 18)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Forms**: Formik + Yup validation
- **Data Fetching**: TanStack React Query
- **UI Components**: Radix UI (via shadcn/ui)
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API

## 🚀 Installation

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or yarn 1.22+
- Running backend API

### Setup Steps

1. **Navigate to frontend directory**
   ```bash
   cd survey-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
survey-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   ├── (officer)/         # Officer routes
│   │   ├── admin/             # Admin routes
│   │   └── api/               # API handlers
│   ├── components/            # React components
│   │   └── ui/               # UI primitives
│   └── lib/                   # Utilities
│       ├── api/              # API client
│       ├── auth/             # Authentication
│       ├── hooks/            # Custom hooks
│       └── constants/        # App constants
```

## 💻 Development

### Available Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm start          # Start production server
npm run lint       # Run ESLint
```

## 📡 API Integration

### API Client

```typescript
// Type-safe API calls
const { data, isLoading } = useOfficerSurveys({
  page: 1,
  per_page: 10,
});
```

## 📦 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api
```

### Deployment Options

- **Vercel** (Recommended): `vercel --prod`
- **Docker**: Use provided Dockerfile
- **Traditional Server**: Build and run with PM2

## 🐛 Troubleshooting

**API Connection Error**
- Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- Check backend server is running

**Build Errors**
```bash
rm -rf .next node_modules
npm install
npm run build
```

---

Built with Next.js 14 | Maintained by Devvify Team
