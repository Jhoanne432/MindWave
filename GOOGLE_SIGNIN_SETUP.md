# Email/Password Authentication Setup Guide

This guide will help you configure email/password authentication with Firebase for your MindWave app.

## Prerequisites

1. A Firebase project
2. Expo CLI installed  
3. Firebase project with Authentication enabled

## Step 1: Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project or create a new one
3. Go to **Authentication** > **Sign-in method**
4. Enable **Email/Password** as a sign-in provider
5. Optionally enable **Email link (passwordless sign-in)** if desired

## Step 2: Environment Variables Setup

Your `.env` file has been configured with your Firebase credentials:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY="AIzaSyDqCOFQy4X3YoBr-8HAP1MKwQtey7VdD2I"
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN="mindwave-3e04f.firebaseapp.com"
EXPO_PUBLIC_FIREBASE_PROJECT_ID="mindwave-3e04f"
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET="mindwave-3e04f.firebasestorage.app"
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="702262275981"
EXPO_PUBLIC_FIREBASE_APP_ID="1:702262275981:web:d8bf98271a7bbc871a97c4"
```

## Step 3: Firebase Authentication Rules

In your Firebase console, you can configure Firestore security rules to protect user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 4: Testing the Authentication

1. Run your app: `npm start`
2. Try creating a new account with email and password
3. Test signing in with the created account
4. Test the forgot password functionality
5. Verify user data is saved to Firestore

## Authentication Features

### ✅ Sign Up
- Email and password registration
- Display name collection
- Automatic profile creation in Firestore
- Input validation (email format, password length, etc.)

### ✅ Sign In  
- Email and password authentication
- Remember user session
- Error handling with user-friendly messages

### ✅ Password Reset
- Send password reset emails
- Easy-to-use forgot password flow

### ✅ User Profile Management
- Automatic Firestore profile creation
- Track user creation and login times
- Display user information in profile page

### ✅ Security Features
- Password validation (minimum 6 characters)
- Email format validation
- Error handling for common Firebase auth errors
- Secure password storage (handled by Firebase)

## Error Handling

The app handles these common authentication errors:

- `auth/email-already-in-use`: Account already exists
- `auth/weak-password`: Password too short
- `auth/invalid-email`: Invalid email format
- `auth/user-not-found`: No account with that email
- `auth/wrong-password`: Incorrect password
- `auth/invalid-credential`: Invalid login credentials
- `auth/too-many-requests`: Too many failed attempts
- `auth/network-request-failed`: Network connectivity issues

## Build and Deploy

### For Development:
```bash
npm start
```

### For Production Build:
```bash
# For Android
npx expo run:android

# For iOS  
npx expo run:ios

# Or using EAS Build
eas build --platform android
eas build --platform ios
```

## Security Best Practices

1. **Environment Variables**: Never commit sensitive data to version control
2. **Firestore Rules**: Implement proper security rules to protect user data
3. **Password Policy**: The app enforces minimum 6 character passwords
4. **Email Verification**: Consider enabling email verification in Firebase Console
5. **Rate Limiting**: Firebase automatically handles rate limiting for authentication

## Troubleshooting

### Common Issues:

1. **"Network Error"**
   - Check your internet connection
   - Verify Firebase configuration values
   - Ensure Firebase project is active

2. **"Invalid email or password"**  
   - User entered incorrect credentials
   - Check that email/password sign-in is enabled in Firebase

3. **"Email already in use"**
   - User trying to create account with existing email
   - Direct them to sign in instead

4. **Firebase errors in console**
   - Check Firebase project settings
   - Verify authentication is enabled
   - Check Firestore rules if database errors occur

### Testing Checklist:

- [ ] Firebase project is set up correctly
- [ ] Email/Password authentication is enabled in Firebase
- [ ] Environment variables are configured
- [ ] App can create new accounts
- [ ] App can sign in existing users
- [ ] Password reset emails are sent
- [ ] User profiles are created in Firestore
- [ ] Protected routes work correctly

## Features Included

✅ Email/password authentication  
✅ User registration with profile creation
✅ Password reset functionality
✅ Firestore integration for user data
✅ Cross-platform support (iOS, Android, Web)
✅ Route protection for authenticated screens
✅ Loading states and comprehensive error handling
✅ Sign-out functionality
✅ Modern, responsive UI
✅ Form validation and user feedback

The authentication system is production-ready and follows Firebase best practices for security and user experience!
