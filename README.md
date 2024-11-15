# 🚗 Gaadi Dekho - Car Marketplace

Gaadi Dekho is a modern car marketplace platform built with Next.js, where users can browse, buy, and sell cars with ease. The platform features a clean, intuitive interface and robust authentication system.

![Gaadi Dekho Screenshot](public/screenshot.png)

## ✨ Features

- 🔐 **Secure Authentication**
  - Google OAuth integration
  - Protected routes and API endpoints
  - Role-based access control

- 🚙 **Car Listings**
  - Browse all available cars
  - Detailed car information pages
  - Image gallery with multiple photos
  - Advanced filtering and search

- 📝 **User Features**
  - Create and manage car listings
  - Edit and delete own listings
  - Contact sellers (authenticated users only)

- 💻 **Modern UI/UX**
  - Responsive design
  - Mobile-friendly interface
  - Clean and intuitive navigation
  - Real-time updates

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 14 (App Router)
  - React
  - Tailwind CSS
  - NextAuth.js

- **Backend**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL
  - Google OAuth

- **Deployment**
  - Vercel
  - PostgreSQL (Production Database)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_postgresql_database_url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
GOOGLE_ID="your_google_client_id"
GOOGLE_SECRET="your_google_client_secret"
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gaadi-dekho.git
cd gaadi-dekho
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up the database
```bash
npx prisma generate
npx prisma db push
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 API Routes

Visit [/routes](http://localhost:3000/routes) in the application to view detailed API documentation.

Key endpoints:
- `GET /api/cars` - List all cars
- `POST /api/cars` - Create new car listing (authenticated)
- `GET /api/cars/[id]` - Get specific car details
- `PUT /api/cars/[id]` - Update car listing (owner only)
- `DELETE /api/cars/[id]` - Delete car listing (owner only)

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run close-ports` - Close development ports (3000-3002)

## 🌟 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Vercel](https://vercel.com)
