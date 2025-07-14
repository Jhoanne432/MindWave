import { DefThemes } from '@/constant/themes'
import { defaultStyles } from '@/styles/style'
import { FontAwesome6 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  return (
    <LinearGradient colors={[DefThemes.backgroundLinear1, DefThemes.backgroundLinear2]} style={defaultStyles.container}>
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView contentContainerStyle={[defaultStyles.container, { justifyContent: 'center', alignContent: 'center', padding: 20 }]}>
          {/* TITLE */}
          <View style={styles.titleContainer}>
            <Image source={require('../assets/images/mindwave.png')} style={{ width: 200, height: 200, alignSelf: 'center' }} />
            <Text style={styles.titleText}>Your Mental Wellness Companion</Text>
          </View>
          <View style={styles.authContainer}>
            <TouchableOpacity style={styles.authOption}>
              <FontAwesome6 name="google" size={20} color="white" />
              <Text style={styles.authOptionText}>Sign In With Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authOption}>
              <FontAwesome6 name="facebook" size={20} color="white" />
              <Text style={styles.authOptionText}>Sign In With Facebook</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SignIn

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  titleText: {
    color: DefThemes.text,
    fontFamily: 'SpaceMono',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  authContainer: {
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  authOption: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    width: '85%',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flexDirection: 'row',
    gap: 10,
  },
  authOptionText: {
    color: DefThemes.text,
    fontSize: 16,
    fontFamily: 'SpaceMono',
  }
})