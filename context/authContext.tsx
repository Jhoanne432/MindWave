import { User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService, SignInData, SignUpData, UserProfile } from "../services/authService";

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signUp: (data: SignUpData) => Promise<void>;
    signIn: (data: SignInData) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    error: string | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    signUp: async () => {},
    signIn: async () => {},
    signOut: async () => {},
    resetPassword: async () => {},
    error: null,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(async (user: User | null) => {
            setUser(user);
            setError(null);
            
            if (user) {
                // Fetch user profile from Firestore
                try {
                    const profile = await authService.getUserProfile(user.uid);
                    setUserProfile(profile);
                } catch (err) {
                    console.error('Error fetching user profile:', err);
                    setError('Failed to load user profile');
                }
            } else {
                setUserProfile(null);
            }
            
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUp = async (data: SignUpData) => {
        try {
            setLoading(true);
            setError(null);
            const user = await authService.signUp(data);
            if (!user) {
                setError('Sign-up failed');
            }
        } catch (err: any) {
            console.error('Sign-up error:', err);
            setError(err.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (data: SignInData) => {
        try {
            setLoading(true);
            setError(null);
            const user = await authService.signIn(data);
            if (!user) {
                setError('Sign-in failed');
            }
        } catch (err: any) {
            console.error('Sign-in error:', err);
            setError(err.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            setError(null);
            await authService.signOut();
        } catch (err: any) {
            console.error('Sign-out error:', err);
            setError(err.message || 'Failed to sign out');
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email: string) => {
        try {
            setError(null);
            await authService.resetPassword(email);
        } catch (err: any) {
            console.error('Password reset error:', err);
            setError(err.message || 'Failed to send password reset email');
            throw err;
        }
    };

    const value: AuthContextType = {
        user,
        userProfile,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        error,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
}