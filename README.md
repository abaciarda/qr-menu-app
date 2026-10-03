# QR Menu Application

A modern, responsive QR code-based restaurant menu system that eliminates physical menus. Built with Next.js 16, Prisma 8, and Vercel Blob for high-performance image storage.

## About

QR Menu allows restaurants to create digital menus accessible via QR code scanning. Customers can browse the full menu, view high-quality product images, customize items with options, add to cart, and save favorites. The admin dashboard provides complete control over menu content, pricing, and restaurant settings.

## How It Works

1. **Setup**: Restaurant configures their menu, categories, products, and branding in the admin dashboard
2. **QR Code**: A unique QR code is generated for the restaurant (can be printed on table tents, menus, etc.)
3. **Customer Access**: Customers scan the QR code with their phone camera to access the digital menu
4. **Browse & Customize**: Customers browse categories, view products with images, and customize options
5. **Cart & Favorites**: Add items to cart, review order, and save favorites for quick access

## Features

### Customer Experience
- **Instant Access**: Scan QR code to open menu in seconds - no app download required
- **Multi-Language Support**: English, Turkish with easy extension for additional languages
- **Rich Product Display**: High-quality images, detailed descriptions, and pricing
- **Smooth Navigation**: Horizontal category slider with smooth animations
- **Product Customization**: Add custom options (extra cheese, drink choice, etc.)
- **Shopping Cart**: Build order, review items, modify quantities
- **Favorites**: Save favorite items for quick reordering
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Optimized experience on mobile, tablet, and desktop
- **Fast Performance**: Optimized images with responsive sizing and CDN delivery

### Admin Dashboard
- **Authentication**: Secure login system for admin access
- **Dashboard Statistics**: View total products, categories, in-stock items, and out-of-stock items
- **Category Breakdown**: See product distribution across menu sections
- **Stock Management**: Monitor available vs hidden products
- **Restaurant Branding**: Customize name, logo, description, contact info, social links
- **WiFi Integration**: Display WiFi credentials for customers
- **Category Management**: Create, edit, delete menu categories with images
- **Product Management**: Full CRUD for products with images, descriptions, and pricing
- **Option Groups**: Define customizable product options (e.g., "Add-ons", "Sides")
- **Currency Configuration**: Set currency symbol for pricing display

### Technical Features
- **Image Storage**: Vercel Blob for fast, reliable image hosting with CDN
- **Database**: PostgreSQL with Prisma 8 for robust data management
- **Authentication**: Secure admin access with JWT tokens
- **SEO Optimized**: OpenGraph, Twitter cards, JSON-LD schemas for social sharing
- **Progressive Web App**: Manifest for mobile app-like experience
- **Sitemap Generation**: Automatic sitemap for search engines

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

