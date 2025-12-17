# Quick Setup Guide

## 1. Install Dependencies

```bash
cd backend
npm install
```

## 2. Configure Environment

Create a `.env` file:

```env
INSFORGE_BASE_URL=https://cvmej868.us-east.insforge.app
INSFORGE_API_KEY=ik_your_insforge_api_key

MONGODB_URI=mongodb://localhost:27017/ami-shalom

JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

RESEND_API_KEY=re_your_resend_api_key
ADMIN_EMAIL=info@amishalomtours.com
FROM_EMAIL=info@amishalomtours.com

PORT=3001
CORS_ORIGIN=http://localhost:3000
```

## 3. Set Up Email (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (info@amishalomtours.com)
3. Add DNS records:
   - SPF record
   - DKIM record  
   - DMARC record (recommended)
4. Copy your API key to `.env`

## 4. Create Admin User

With MongoDB running, seed an initial admin account:

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SUPER_ADMIN_TOKEN" \
  -d '{
    "email": "admin@amishalomtours.com",
    "password": "ChangeMe123",
    "name": "Super Admin",
    "role": "super_admin"
  }'
```

> Tip: For the first super admin, insert directly into MongoDB:
> ```bash
> db.adminusers.insertOne({
>   email: "admin@amishalomtours.com",
>   password: "<bcrypt hash>",
>   name: "Super Admin",
>   role: "super_admin"
> })
> ```

## 5. Run the Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

## 6. Test the API

### Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-password"}'
```

### Get Destinations (Public)
```bash
curl http://localhost:3001/destinations
```

### Create Destination (Admin)
```bash
curl -X POST http://localhost:3001/destinations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test Destination",
    "slug": "test-destination",
    "location": "Test Location",
    "description": "Test description",
    "price": "$100",
    "duration": "3 Days"
  }'
```

## Database Collections

The NestJS backend will create collections automatically when data is inserted:
- destinations
- galleryitems
- services
- bookings
- messages
- pages
- adminusers

## File Uploads

Gallery uploads are stored under the `uploads/gallery` directory. Ensure the process
has permission to write to this path, and configure your deployment to persist it.

## Next Steps

1. Seed initial data (destinations, services)
2. Configure production environment variables
3. Set up CI/CD pipeline
4. Configure monitoring and logging

