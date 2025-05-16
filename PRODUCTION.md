# Production Deployment Guide

This document provides instructions for deploying the application to production and troubleshooting common issues.

## Environment Setup

1. Make sure you have the correct environment variables set in `.env.production`:

```
NEXT_PUBLIC_BACKEND_URL=https://api.contentia.io
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace these values with your actual production URLs and IDs.

## Building for Production

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start the production server
npm start
```

## Common Issues and Solutions

### 1. Authentication Errors (401 Unauthorized)

**Symptoms:**
- Users are unexpectedly logged out
- API calls fail with 401 errors
- JWT token errors in console

**Solutions:**
- The application now includes automatic token refresh
- Check that your backend refresh token endpoint is working correctly
- Verify that the token expiration times are reasonable (at least 1 hour)

### 2. Landing Page Not Found (404)

**Symptoms:**
- Landing page shows fallback data
- 404 errors for `/api/v1/admin/landingPage` in console

**Solutions:**
- The application now uses fallback data when API calls fail
- Make sure to seed your production database with initial landing page data
- Check that the API route is correctly configured on the backend

### 3. Google Analytics Issues

**Symptoms:**
- Analytics data not showing up in Google Analytics dashboard
- Errors related to Google Analytics in console

**Solutions:**
- Verify that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly in `.env.production`
- Check that the Google Analytics account is properly set up
- Make sure the tracking code is loaded correctly

### 4. Image Upload Issues

**Symptoms:**
- Images fail to upload
- Error messages about missing files or paths

**Solutions:**
- Ensure the backend storage directories exist and have proper permissions
- Check that the multipart/form-data handling is working correctly
- Verify that the image size limits are appropriate

## Monitoring and Logging

For better monitoring in production:

1. Set up error tracking with a service like Sentry
2. Implement server-side logging
3. Monitor API performance and errors

## Deployment Checklist

Before deploying to production:

- [ ] Update all environment variables
- [ ] Run a full build and test locally
- [ ] Check for any console errors
- [ ] Verify all API endpoints are working
- [ ] Test authentication flow
- [ ] Test image uploads
- [ ] Check mobile responsiveness

## Rollback Procedure

If you need to rollback to a previous version:

1. Identify the last stable version
2. Deploy that version using the same process
3. Verify that the rollback fixed the issues

## Contact

For additional help, contact the development team at dev@contentia.io
