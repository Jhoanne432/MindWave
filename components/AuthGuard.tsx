import { DefThemes } from '@/constant/themes';
import { useAuth } from '@/context/authContext';
import { defaultStyles } from '@/styles/style';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/sign-in');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <LinearGradient colors={[DefThemes.backgroundLinear1, DefThemes.backgroundLinear2]} style={defaultStyles.container}>
        <SafeAreaView style={[defaultStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={DefThemes.text} />
          <Text style={{ 
            color: DefThemes.text, 
            fontFamily: 'SpaceMono', 
            fontSize: 16, 
            marginTop: 12 
          }}>
            Loading...
          </Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (!user) {
    return null; // Router will redirect
  }

  return <>{children}</>;
};
