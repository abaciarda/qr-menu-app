# QR Menu App — Setup & Deployment Guide

## Overview

A modern, responsive QR code-based restaurant menu system built with Next.js 16, Prisma 8, and Vercel Blob for image storage.

## Features

### Customer-Facing
- QR Code Scanning: Scan QR code to access restaurant menu
- Multi-Language Support: English and Turkish (easily extensible)
- Category Navigation: Horizontal scrollable category slider with smooth animations
- Product Cards: Visual product display with images, prices, and descriptions
- Product Details: Detailed product popup with options and recommendations
- Shopping Cart: Add items, customize options, view order summary
- Favorites: Save favorite items for quick access
- Dark/Light Mode: Toggle between dark and light themes
- Responsive Design: Optimized for mobile, tablet, and desktop
- High Performance: Optimized images with responsive sizing and quality

### Admin Dashboard
- Restaurant Configuration: Customize restaurant details, contact info, branding
- Category Management: Create, edit, delete categories with images
- Product Management: Full CRUD for products with images and pricing
- Option Groups: Add customizable options (e.g., extra cheese, drink choice)
- Order Management: View and manage customer orders
- Settings: Configure currency, WiFi, social links

## Tech Stack

- **Framework**: Next.js 16.3.0 (App Router, Turbopack)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma 8 RC
- **ORM**: Prisma 8 (`@prisma/orm-postgres`)
- **Image Storage**: Vercel Blob
- **Authentication**: JWT with `jose`
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Testing**: Vitest
- **Deployment**: Vercel

## Project Structure

```
├── app/
│   ├── (customer)/          # Customer-facing pages
│   │   ├── [slug]/          # Category page
│   │   └── favorites/       # Favorites page
│   ├── admin/               # Admin dashboard
│   │   ├── (dashboard)/     # Admin layout
│   │   ├── categories/      # Category management
│   │   ├── products/        # Product management
│   │   └── settings/        # Restaurant settings
│   ├── api/                 # API routes
│   │   └── upload/          # Vercel Blob upload
│   ├── components/          # React components
│   │   ├── cards/           # Product/Category cards
│   │   ├── cart/            # Cart sheet
│   │   ├── navigation/      # Navigation bar
│   │   └── sidebar/         # Sidebar menu
│   ├── context/             # React contexts
│   ├── lib/                 # Utilities and helpers
│   │   ├── i18n/            # Internationalization
│   │   ├── queries/         # Database queries
│   │   └── validations/     # Zod schemas
│   └── layout.tsx           # Root layout
├── prisma/
│   └── contract.prisma      # Prisma 8 schema
├── components/              # Shared components
│   ├── ui/                  # shadcn/ui components
│   ├── theme-provider.tsx   # Theme provider
│   └── language-toggle.tsx  # Language toggle
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database accessible
- Prisma Platform account (for deployment) or hosting environment
- Vercel account with Blob storage configured (for image storage)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abaciarda/qr-menu-app.git
cd qr-menu-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see below)

4. Run Prisma migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database Connection
DATABASE_URL="postgresql://user:password@host:port/database"

# Admin Authentication
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="your_hashed_password"
AUTH_SECRET="your_auth_secret_generate_with_openssl_rand_base64_32"

# App Configuration
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Vercel Blob Storage (for image uploads)
# Get this from: Vercel Dashboard → Your Project → Storage → Blob → Connect
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxxxxx"
```

### Generate Auth Secret

```bash
openssl rand -base64 32
```

### Generate Password Hash

The app uses a simple hash for the admin password. For production, you should implement proper bcrypt hashing in the authentication logic.

### Vercel Blob Setup

1. **Create Vercel Project**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in
   - Create a new project

2. **Add Blob Storage**
   - Go to Vercel Dashboard → Your Project → Storage
   - Click "Blob" → "Connect"
   - Follow the setup wizard
   - Copy the `BLOB_READ_WRITE_TOKEN` environment variable

3. **Add Environment Variables**
   - Add `BLOB_READ_WRITE_TOKEN` to your `.env` file
   - Add to your hosting platform's environment variables

## Deployment Options

### Option 1: Prisma Platform (Recommended)

1. **Initialize Prisma Platform**
   ```bash
   prisma init
   ```

2. **Deploy to Prisma Platform**
   ```bash
   prisma deploy
   ```

3. **Set Environment Variables** in Prisma Platform dashboard:
   - Database URL
   - Admin credentials
   - Vercel Blob token
   - App URL

4. **Configure Domain** in Prisma Platform settings

### Option 2: Traditional Vercel/Netlify Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard:
   - Database URL
   - Admin credentials
   - Vercel Blob token
   - App URL

4. **Configure database** and set `DATABASE_URL`

### Option 3: Self-Hosted Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "qr-menu" -- start
   pm2 save
   pm2 startup
   ```

## Database Setup

### Create Database Schema

The schema is already defined in `prisma/contract.prisma`. Run:

```bash
prisma db push
```

### Seed Initial Data

The app will automatically create default restaurant config if it doesn't exist. You can create initial categories and products through the admin panel.

## Post-Deployment Steps

1. **Access Admin Panel**
   - Navigate to `/admin`
   - Login with credentials from environment variables

2. **Configure Restaurant Settings**
   - Go to Settings page
   - Set restaurant name, description, Wi-Fi credentials, etc.
   - Upload restaurant logo using Vercel Blob integration

3. **Create Categories**
   - Go to Categories page
   - Add menu categories (Burgers, Drinks, etc.)
   - Upload category images using Vercel Blob integration

4. **Add Products**
   - Go to Products page
   - Add menu items with images, descriptions, prices
   - Upload product images using Vercel Blob integration

5. **Generate QR Code**
   - Go to Settings page
   - Download QR code for customer access

## Vercel Blob Image Storage

The app now uses Vercel Blob for image storage with automatic optimization:

### Features:
- **File Upload**: Click to upload images
- **Automatic Optimization**: Auto quality and format (WebP/AVIF)
- **Size Validation**: Maximum 5MB file size limit
- **Type Validation**: Only image files accepted
- **CDN Delivery**: Global CDN for fast loading
- **Real-time Preview**: Image preview during upload

### Configuration:
- Images are stored in Vercel Blob storage
- Optimized automatically by Next.js Image component
- Served via Vercel's global CDN

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Ensure database is accessible from deployment environment
- Check firewall rules

### Vercel Blob Upload Issues

- Verify `BLOB_READ_WRITE_TOKEN` is correct
- Check Vercel Blob storage is connected to your project
- Ensure token has read/write permissions
- Check console for error messages

### Image Loading Issues

- Vercel Blob images should load automatically if configured correctly
- Verify image URLs in database are correct
- Check Vercel Blob storage for uploaded images
- Ensure images haven't been deleted from Blob storage

### Admin Login Issues

- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` are set correctly
- Check `AUTH_SECRET` is properly configured

## Performance Optimization

The app includes:
- Image optimization with AVIF/WebP formats (Next.js Image component)
- Static page generation where possible
- Database query caching
- CDN delivery via Vercel
- Optimized image loading with blur placeholders

## Security Considerations

- Change default admin credentials immediately
- Use strong `AUTH_SECRET` value
- Enable HTTPS in production
- Regularly update dependencies
- Use environment-specific configurations
- Secure Vercel Blob token properly
- Keep `BLOB_READ_WRITE_TOKEN` confidential

## Monitoring

- Check Prisma Platform logs for database issues
- Monitor application logs for errors
- Set up error tracking (e.g., Sentry) for production
- Monitor Vercel Blob storage usage in Dashboard

## Backup Strategy

- Regular database backups
- Export restaurant configuration periodically
- Vercel Blob automatically replicates your images
- Monitor storage usage in Vercel Dashboard
