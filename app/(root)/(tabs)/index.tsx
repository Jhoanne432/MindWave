import { DefThemes } from '@/constant/themes';
import { defaultStyles } from '@/styles/style';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

const Home = () => {
    return (
        <LinearGradient colors={[DefThemes.backgroundLinear1, DefThemes.backgroundLinear2]} style={defaultStyles.container}>
            <SafeAreaView style={styles.container}>
                <Link href="/sign-in" style={{ color: DefThemes.text, fontSize: 20 }}>
                    Go to Sign In
                </Link>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Home


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#0f172a',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
