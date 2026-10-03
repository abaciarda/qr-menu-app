# QR Menu Application

A modern, responsive QR code-based restaurant menu system built with Next.js 16, Prisma 8, and Vercel Blob for image storage.

## Features

### Customer-Facing
- QR Code Scanning to access restaurant menu
- Multi-Language Support (English, Turkish)
- Category Navigation with smooth animations
- Product Cards with images, prices, and descriptions
- Product Details popup with options and recommendations
- Shopping Cart with customizable items
- Favorites for quick access
- Dark/Light Mode toggle
- Responsive Design (mobile, tablet, desktop)
- High Performance with optimized images

### Admin Dashboard
- Restaurant Configuration (details, contact info, branding)
- Category Management (create, edit, delete with images)
- Product Management (full CRUD with images and pricing)
- Option Groups (customizable product options)
- Order Management (view and manage orders)
- Settings (currency, WiFi, social links)

## Getting Started

For detailed setup and deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Database Schema

- **Category**: Menu categories with images and sorting
- **Product**: Menu items with prices, descriptions, and images
- **OptionGroup**: Customizable option groups
- **OptionGroupOption**: Individual options within groups
- **RecommendedItem**: Featured items
- **Order**: Customer orders with status tracking
- **OrderItem**: Items within an order
- **RestaurantConfig**: Restaurant settings and branding

## Performance

- Image Optimization with responsive sizes
- Code Splitting with Next.js App Router
- GPU Acceleration for images
- Touch Optimization for mobile
- Aggressive caching headers

## Internationalization

- English (default)
- Turkish
- Easily extensible for more languages

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run test   # Run tests
npm run lint   # Lint code
```

## License

MIT

