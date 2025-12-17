# Installation Fix Guide

## Issue: @insforge/sdk package not found

If you encounter the error:
```
npm error notarget No matching version found for @insforge/sdk@^1.0.0
```

## Solution 1: Use Latest Version (Recommended)

The package.json has been updated to use `latest` instead of a specific version:

```json
"@insforge/sdk": "latest"
```

Try installing again:
```bash
npm install
```

## Solution 2: If SDK Package Still Not Available

If the Insforge SDK package is not published to npm, you have two options:

### Option A: Install without SDK (Use HTTP Client)

1. Remove the SDK dependency temporarily:
```bash
npm install --save-optional @insforge/sdk@latest
```

2. The code includes a fallback HTTP client (`insforge-http.service.ts`) that can be used instead.

3. Update `insforge.module.ts` to use the HTTP service:
```typescript
import { InsforgeHttpService } from './insforge-http.service';

@Global()
@Module({
  providers: [InsforgeHttpService],
  exports: [InsforgeHttpService],
})
export class InsforgeModule {}
```

### Option B: Manual Installation

If you have the SDK package locally or from a private registry:

1. Install from local path:
```bash
npm install /path/to/@insforge/sdk
```

2. Or install from private registry:
```bash
npm install @insforge/sdk --registry=https://your-private-registry.com
```

## Solution 3: Skip SDK Installation (Development Only)

For development, you can temporarily comment out the SDK import and use mock data:

1. Comment out SDK imports in `insforge.service.ts`
2. Create mock implementations for testing
3. Install other dependencies:
```bash
npm install --ignore-scripts
```

## Verify Installation

After installation, verify all packages are installed:

```bash
npm list --depth=0
```

You should see all dependencies listed without errors.

## Next Steps

1. Create `.env` file using `.env.example` as template
2. Configure all required environment variables
3. Run the application:
```bash
npm run start:dev
```

## Troubleshooting

If you still have issues:

1. **Clear npm cache:**
```bash
npm cache clean --force
```

2. **Delete node_modules and package-lock.json:**
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Check Node.js version:**
```bash
node --version  # Should be 18+
```

4. **Use yarn instead:**
```bash
yarn install
```

