import { auth, db } from '../firebase/FirebaseConfig';

export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test Firebase Auth connection
    console.log('Auth instance:', auth);
    console.log('Auth config:', auth.config);
    
    // Test if we can access the current user (even if null)
    console.log('Current user:', auth.currentUser);
    
    // Test Firestore connection
    console.log('Firestore instance:', db);
    
    // Log the Firebase config being used
    console.log('Firebase Config:', {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY?.substring(0, 10) + '...',
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    return { success: true, message: 'Firebase connection test completed' };
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return { success: false, error };
  }
};

// Helper function to check network connectivity
export const checkNetworkConnectivity = async () => {
  try {
    const response = await fetch('https://www.google.com', { 
      method: 'HEAD',
      mode: 'no-cors'
    });
    return { connected: true };
  } catch (error) {
    console.error('Network test failed:', error);
    return { connected: false, error };
  }
};
