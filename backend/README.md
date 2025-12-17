# Ami Shalom Tours Backend API

A complete NestJS backend system for the Ami Shalom Tours tourism website, powered by Insforge (Backend-as-a-Service).

## 🚀 Features

- **Authentication**: JWT-based admin authentication
- **Destinations**: Full CRUD operations for tour destinations
- **Gallery**: Image upload and management
- **Services**: Tour services management
- **Bookings**: Booking system with email notifications
- **Contact**: Contact form with email integration
- **Email**: Resend integration for reliable email delivery (SPF/DKIM/DMARC ready)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Insforge account and API key
- Resend account and API key (for email functionality)

## 🛠️ Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Configure environment variables:**
Create a `.env` file in the `backend` directory:

```env
# Insforge Configuration
INSFORGE_BASE_URL=https://cvmej868.us-east.insforge.app
INSFORGE_API_KEY=your_insforge_api_key_here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Email Configuration (Resend)
RESEND_API_KEY=re_your_resend_api_key_here
ADMIN_EMAIL=info@amishalomtours.com
FROM_EMAIL=info@amishalomtours.com

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

3. **Set up email domain (Resend):**
   - Sign up at [Resend](https://resend.com)
   - Verify your domain (info@amishalomtours.com)
   - Configure SPF, DKIM, and DMARC records as instructed by Resend
   - Add your API key to `.env`

## 🏃 Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3001`

## 📚 API Endpoints

### Authentication
- `POST /auth/login` - Admin login
- `GET /auth/profile` - Get current user profile (protected)

### Destinations
- `GET /destinations` - List all destinations (paginated)
- `GET /destinations/:id` - Get destination by ID
- `GET /destinations/slug/:slug` - Get destination by slug
- `POST /destinations` - Create destination (admin only)
- `PATCH /destinations/:id` - Update destination (admin only)
- `DELETE /destinations/:id` - Delete destination (admin only)

### Gallery
- `GET /gallery` - List gallery items (paginated, optional destinationId filter)
- `GET /gallery/:id` - Get gallery item by ID
- `POST /gallery` - Upload gallery image (admin only, multipart/form-data)
- `DELETE /gallery/:id` - Delete gallery item (admin only)

### Services
- `GET /services` - List all services
- `GET /services/:id` - Get service by ID
- `POST /services` - Create service (admin only)
- `PATCH /services/:id` - Update service (admin only)
- `DELETE /services/:id` - Delete service (admin only)

### Bookings
- `POST /bookings` - Create new booking (public)
- `GET /bookings` - List all bookings (admin only, paginated)
- `GET /bookings/:id` - Get booking by ID (admin only)
- `PATCH /bookings/:id/status` - Update booking status (admin only)

### Contact
- `POST /contact` - Submit contact form (public)
- `GET /contact` - List contact messages (admin only, paginated)

## 🔐 Authentication

Protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

To get a token, login at `POST /auth/login`:
```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

## 📧 Email Configuration

The backend uses Resend for email delivery. To prevent emails from going to spam:

1. **Verify your domain** in Resend dashboard
2. **Add DNS records**:
   - SPF record
   - DKIM record
   - DMARC record (recommended)

Resend will provide exact DNS records to add. Once verified, emails will have proper authentication and deliverability.

## 🗄️ Database Schema

The backend uses Insforge's PostgreSQL database with the following tables:

- `destinations` - Tour destinations
- `gallery` - Gallery images
- `services` - Tour services
- `bookings` - Customer bookings
- `contact_messages` - Contact form submissions
- `users` - User profiles (managed by Insforge auth)

## 📦 Project Structure

```
backend/
├── src/
│   ├── auth/           # Authentication module
│   ├── destinations/   # Destinations CRUD
│   ├── gallery/        # Gallery management
│   ├── services/       # Services management
│   ├── bookings/       # Booking system
│   ├── contact/        # Contact form
│   ├── email/          # Email service
│   ├── insforge/       # Insforge SDK integration
│   ├── app.module.ts   # Root module
│   └── main.ts         # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `INSFORGE_BASE_URL` | Insforge backend URL | Yes |
| `INSFORGE_API_KEY` | Insforge API key | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES_IN` | JWT expiration time | No (default: 7d) |
| `RESEND_API_KEY` | Resend API key | Yes (for emails) |
| `ADMIN_EMAIL` | Admin email address | Yes |
| `FROM_EMAIL` | Sender email address | Yes |
| `PORT` | Server port | No (default: 3001) |
| `CORS_ORIGIN` | CORS allowed origin | No |

## 📝 Notes

- All file uploads are stored in Insforge storage buckets
- Email sending is handled asynchronously
- Admin authentication uses Insforge's built-in auth system
- The backend is designed to work seamlessly with the Next.js frontend

## 🐛 Troubleshooting

### Email not sending
- Verify Resend API key is correct
- Check domain verification status in Resend
- Ensure DNS records (SPF/DKIM/DMARC) are properly configured

### Database errors
- Verify Insforge API key is correct
- Check that all tables exist in your Insforge database
- Ensure storage buckets are created

### Authentication issues
- Verify JWT_SECRET is set
- Check that user exists in Insforge auth system
- Ensure token is included in Authorization header

## 📄 License

MIT

