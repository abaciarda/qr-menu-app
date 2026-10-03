# QR Menu Application

A modern, responsive QR code-based restaurant menu system built with Next.js 16, Prisma 8, and Vercel Blob for image storage.

## Features

### Customer-Facing
- **QR Code Scanning**: Scan QR code to access restaurant menu
- **Multi-Language Support**: English and Turkish (easily extensible)
- **Category Navigation**: Horizontal scrollable category slider with smooth animations
- **Product Cards**: Visual product display with images, prices, and descriptions
- **Product Details**: Detailed product popup with options and recommendations
- **Shopping Cart**: Add items, customize options, view order summary
- **Favorites**: Save favorite items for quick access
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **High Performance**: Optimized images with responsive sizing and quality

### Admin Dashboard
- **Restaurant Configuration**: Customize restaurant details, contact info, branding
- **Category Management**: Create, edit, delete categories with images
- **Product Management**: Full CRUD for products with images and pricing
- **Option Groups**: Add customizable options (e.g., extra cheese, drink choice)
- **Order Management**: View and manage customer orders
- **Settings**: Configure currency, WiFi, social links

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

For detailed setup and deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Database Schema

The application uses the following main models:

- **Category**: Menu categories with images and sorting
- **Product**: Menu items with prices, descriptions, and images
- **OptionGroup**: Customizable option groups (e.g., "Add-ons")
- **OptionGroupOption**: Individual options within groups
- **RecommendedItem**: Featured items to display
- **Order**: Customer orders with status tracking
- **OrderItem**: Items within an order
- **RestaurantConfig**: Restaurant settings and branding

## Performance Optimizations

- **Image Optimization**: Next.js Image with responsive sizes and quality settings
- **Code Splitting**: Automatic with Next.js App Router
- **Static Generation**: Category pages revalidated every 2 minutes
- **GPU Acceleration**: Images promoted to separate compositor layers
- **Touch Optimization**: Improved mobile touch handling
- **Caching**: Aggressive caching headers for static assets

## Internationalization

The app supports multiple languages via a simple i18n system:
- English (default)
- Turkish
- Easily extensible for more languages

Language files are in `lib/i18n/translations.ts`.

## Development

### Running Tests
```bash
npm run test
```

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
