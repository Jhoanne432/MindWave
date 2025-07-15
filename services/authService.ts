import {
    AuthError,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/FirebaseConfig';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface SignUpData {
  email: string;
  password: string;
  displayName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

class AuthService {
  // Sign up with email and password
  async signUp({ email, password, displayName }: SignUpData): Promise<User | null> {
    try {
      console.log('Attempting to sign up user with email:', email);
      
      // Create user with email and password
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', result.user.uid);
      
      // Update the user's display name
      await updateProfile(result.user, {
        displayName: displayName,
      });
      console.log('User profile updated with display name');
      
      // Save user profile to Firestore
      await this.saveUserProfile(result.user, displayName);
      console.log('User profile saved to Firestore');
      
      return result.user;
    } catch (error) {
      console.error('Sign up error details:', {
        error,
        code: (error as AuthError).code,
        message: (error as AuthError).message,
        email,
        timestamp: new Date().toISOString()
      });
      throw this.handleAuthError(error as AuthError);
    }
  }

  // Sign in with email and password
  async signIn({ email, password }: SignInData): Promise<User | null> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time
      await this.updateLastLogin(result.user);
      
      return result.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Save user profile to Firestore
  private async saveUserProfile(user: User, displayName?: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      const userData: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: displayName || user.displayName || '',
        photoURL: user.photoURL || undefined,
        createdAt: userSnap.exists() ? userSnap.data().createdAt : new Date(),
        lastLoginAt: new Date(),
      };
      
      await setDoc(userRef, userData, { merge: true });
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }

  // Update last login time
  private async updateLastLogin(user: User): Promise<void> {
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { lastLoginAt: new Date() }, { merge: true });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  // Get user profile from Firestore
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Handle authentication errors
  private handleAuthError(error: AuthError): Error {
    console.error('Handling auth error:', error.code, error.message);
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        return new Error('An account with this email already exists');
      case 'auth/weak-password':
        return new Error('Password should be at least 6 characters');
      case 'auth/invalid-email':
        return new Error('Please enter a valid email address');
      case 'auth/user-not-found':
        return new Error('No account found with this email');
      case 'auth/wrong-password':
        return new Error('Incorrect password');
      case 'auth/invalid-credential':
        return new Error('Invalid email or password');
      case 'auth/too-many-requests':
        return new Error('Too many failed attempts. Please try again later');
      case 'auth/network-request-failed':
        return new Error('Network error. Please check your internet connection and try again. If the problem persists, Firebase services might be temporarily unavailable.');
      case 'auth/app-not-authorized':
        return new Error('App not authorized to use Firebase Authentication. Please check your Firebase configuration.');
      case 'auth/invalid-api-key':
        return new Error('Invalid Firebase API key. Please check your configuration.');
      case 'auth/operation-not-allowed':
        return new Error('Email/password sign-up is not enabled in Firebase Console.');
      default:
        return new Error(`Authentication error: ${error.message || 'An unexpected error occurred'}`);
    }
  }
}

export const authService = new AuthService();
