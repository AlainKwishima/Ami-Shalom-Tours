# Quick Start Guide

## ✅ Installation Complete!

The packages have been installed successfully. Now follow these steps:

## Step 1: Create .env File

Copy the template and create your `.env` file:

**Windows PowerShell:**
```powershell
Copy-Item env.template .env
```

**Linux/Mac:**
```bash
cp env.template .env
```

Or manually create a `.env` file in the `backend` directory with the following content:

```env
# Insforge Configuration
INSFORGE_BASE_URL=https://cvmej868.us-east.insforge.app
INSFORGE_API_KEY=ik_d0e18f9b1131b6381f8788ac688a30c1

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ami-shalom

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d

# Email Configuration (Resend)
RESEND_API_KEY=re_your_resend_api_key_here
ADMIN_EMAIL=info@amishalomtours.com
FROM_EMAIL=info@amishalomtours.com

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## Step 2: Configure Environment Variables

### Required Changes:

1. **JWT_SECRET**: Generate a secure random string:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Copy the output and replace `your-super-secret-jwt-key-change-this-in-production-min-32-chars`

2. **RESEND_API_KEY**: 
   - Sign up at [resend.com](https://resend.com)
   - Get your API key from the dashboard
   - Replace `re_your_resend_api_key_here`

3. **Email Addresses**: 
   - Update `ADMIN_EMAIL` and `FROM_EMAIL` if different
   - Make sure `FROM_EMAIL` is verified in Resend

## Step 3: Start the Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

## Step 4: Test the API

### Test Public Endpoint (Destinations):
```bash
curl http://localhost:3001/destinations
```

### Test Login:
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"your-password\"}"
```

## 📋 Environment Variables Summary

| Variable | Status | Action Required |
|----------|--------|-----------------|
| `INSFORGE_BASE_URL` | ✅ Set | None (already configured) |
| `INSFORGE_API_KEY` | ✅ Set | None (already configured) |
| `MONGODB_URI` | ⚠️ Needs Update | Point to your MongoDB instance |
| `JWT_SECRET` | ⚠️ Needs Update | Generate secure random string |
| `JWT_EXPIRES_IN` | ✅ Set | None (default: 7d) |
| `RESEND_API_KEY` | ⚠️ Needs Update | Get from Resend dashboard |
| `ADMIN_EMAIL` | ✅ Set | Update if needed |
| `FROM_EMAIL` | ✅ Set | Update if needed |
| `PORT` | ✅ Set | None (default: 3001) |
| `NODE_ENV` | ✅ Set | None (development) |
| `CORS_ORIGIN` | ✅ Set | Update for production |

## 🔧 Troubleshooting

### Issue: Port already in use
**Solution:** Change `PORT` in `.env` to a different port (e.g., 3002)

### Issue: Email not sending
**Solution:** 
- Verify Resend API key is correct
- Check that domain is verified in Resend
- Ensure DNS records (SPF/DKIM/DMARC) are configured

### Issue: Database connection errors
**Solution:**
- Verify `MONGODB_URI` points to a running Mongo instance
- Check MongoDB credentials/permissions
- Ensure the database allows network connections

## 📚 Next Steps

1. ✅ Create `.env` file
2. ✅ Configure environment variables
3. ✅ Start the server
4. ⏭️ Seed admin user in MongoDB (see Auth module)
5. ⏭️ Seed initial data (destinations, services)
6. ⏭️ Test all endpoints

## 📖 Documentation

- See `README.md` for complete API documentation
- See `ENV_SCHEMA.md` for detailed environment variable descriptions
- See `SETUP.md` for detailed setup instructions

