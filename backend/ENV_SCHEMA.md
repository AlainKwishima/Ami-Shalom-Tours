# Environment Variables Schema

This document describes all environment variables required for the Ami Shalom Tours backend.

## Required Variables

### Insforge Configuration

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `INSFORGE_BASE_URL` | string | Your Insforge backend URL | `https://cvmej868.us-east.insforge.app` |
| `INSFORGE_API_KEY` | string | Your Insforge API key | `ik_d0e18f9b1131b6381f8788ac688a30c1` |

### Database Configuration

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `MONGODB_URI` | string | Mongo connection string | `mongodb://localhost:27017/ami-shalom` |

**How to get:**
- Base URL: Provided by Insforge when you set up your backend
- API Key: Available in your Insforge dashboard

### JWT Configuration

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `JWT_SECRET` | string | Secret key for signing JWT tokens (min 32 characters) | `your-super-secret-jwt-key-change-this-in-production` |
| `JWT_EXPIRES_IN` | string | Token expiration time | `7d` (7 days), `24h`, `1h` |

**How to generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Email Configuration (Resend)

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `RESEND_API_KEY` | string | Resend API key | `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `ADMIN_EMAIL` | string | Admin email for notifications | `info@amishalomtours.com` |
| `FROM_EMAIL` | string | Sender email (must be verified) | `info@amishalomtours.com` |

**How to get:**
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (add DNS records)
3. Get API key from dashboard
4. Use verified email as `FROM_EMAIL`

### Server Configuration

| Variable | Type | Description | Default |
|----------|------|-------------|---------|
| `PORT` | number | Server port | `3001` |
| `NODE_ENV` | string | Environment mode | `development` |

### Default Admin Seed

| Variable | Type | Description | Default |
|----------|------|-------------|---------|
| `DEFAULT_ADMIN_EMAIL` | string | Email used to seed the initial super admin | `alainkwishima@gmail.com` |
| `DEFAULT_ADMIN_PASSWORD` | string | Password for the seeded admin | `mukabareke` |
| `DEFAULT_ADMIN_NAME` | string | Display name for the seeded admin | `Super Admin` |

### CORS Configuration

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `CORS_ORIGIN` | string | Allowed origin for CORS | `http://localhost:3000` |

## Complete .env File Example

```env
# Insforge Configuration
INSFORGE_BASE_URL=https://cvmej868.us-east.insforge.app
INSFORGE_API_KEY=ik_d0e18f9b1131b6381f8788ac688a30c1

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d

# Email Configuration (Resend)
RESEND_API_KEY=re_your_resend_api_key_here
ADMIN_EMAIL=info@amishalomtours.com
FROM_EMAIL=info@amishalomtours.com

# Default Admin Seed
DEFAULT_ADMIN_EMAIL=alainkwishima@gmail.com
DEFAULT_ADMIN_PASSWORD=mukabareke
DEFAULT_ADMIN_NAME=Super Admin

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## Production Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Update `CORS_ORIGIN` to your production domain
- [ ] Verify email domain in Resend
- [ ] Add SPF, DKIM, and DMARC DNS records
- [ ] Use secure API keys (never commit to git)
- [ ] Enable HTTPS in production

## Security Notes

1. **Never commit `.env` file to git** - it's already in `.gitignore`
2. **Use strong secrets** - especially for `JWT_SECRET`
3. **Rotate keys regularly** - especially if compromised
4. **Use different keys** - for development and production
5. **Verify email domain** - to prevent spam issues

