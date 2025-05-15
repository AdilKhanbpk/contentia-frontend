# Google Analytics Setup Guide

This guide will help you set up a new Google Analytics 4 property and integrate it with the Contentia application.

## Issue

The current Google Analytics project (#50703825922) has been deleted, causing permission denied errors when trying to fetch analytics data.

## Solution

Follow these steps to create a new Google Analytics 4 property and update the application configuration.

### 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Admin" in the bottom left corner
4. In the "Account" column, click "Create Account"
5. Enter an account name (e.g., "Contentia")
6. Configure data sharing settings as needed
7. Click "Next"
8. Enter a property name (e.g., "Contentia Web")
9. Select your reporting time zone and currency
10. Click "Next"
11. Enter your business information
12. Click "Create"

### 2. Set Up Data Collection

1. In the "Property" column, click "Data Streams"
2. Click "Web"
3. Enter your website URL and stream name
4. Click "Create Stream"
5. Note your Measurement ID (starts with "G-")

### 3. Create a Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select your existing project
3. Navigate to "IAM & Admin" > "Service Accounts"
4. Click "Create Service Account"
5. Enter a name (e.g., "contentia-analytics")
6. Click "Create and Continue"
7. Add the "Analytics Admin" role
8. Click "Continue" and then "Done"
9. Click on the service account you just created
10. Go to the "Keys" tab
11. Click "Add Key" > "Create new key"
12. Select JSON and click "Create"
13. Save the downloaded JSON file

### 4. Update Environment Variables

Update the following environment variables in your `.env` file:

```
GA_PROPERTY_ID=<Your GA4 Property ID>
GA_MEASUREMENT_ID=<Your Measurement ID (G-XXXXXXXX)>
GA_CLIENT_EMAIL=<Service Account Email>
GA_PRIVATE_KEY=<Service Account Private Key>
NEXT_PUBLIC_GA_MEASUREMENT_ID=<Your Measurement ID (G-XXXXXXXX)>
```

### 5. Update Analytics Configuration File

1. Rename the downloaded JSON file to `analyticsConfig.json`
2. Place it in the root directory of your backend application
3. Make sure the path in your `.env` file matches: `GOOGLE_APPLICATION_CREDENTIALS='./analyticsConfig.json'`

### 6. Restart Your Application

Restart both the frontend and backend applications to apply the changes.

## Verification

After completing these steps, verify that analytics data is being collected and displayed correctly:

1. Visit your website and perform some actions
2. Check the Google Analytics real-time reports to confirm data is being collected
3. Verify that the analytics dashboard in your admin panel is displaying data correctly

If you continue to experience issues, check the application logs for specific error messages.
