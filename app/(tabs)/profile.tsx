import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Icon Components
const HomeIcon = ({ color = '#fff', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </Svg>
);

const TrendsIcon = ({ color = '#fff', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </Svg>
);

const SensorsIcon = ({ color = '#fff', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </Svg>
);

const AIIcon = ({ color = '#fff', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </Svg>
);

const BackIcon = ({ color = '#fff', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </Svg>
);

const ClockIcon = ({ color = '#6366f1', size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Svg>
);

const CloudIcon = ({ color = '#6366f1', size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </Svg>
);

const CakeIcon = ({ color = '#6366f1', size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
  </Svg>
);

const FlameIcon = ({ color = '#6366f1', size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <Path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
  </Svg>
);

const MoonIcon = ({ color = '#10b981', size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </Svg>
);

const InfoIcon = ({ color = '#fff', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Svg>
);

const MindWatchApp = () => {
  const [currentScreen, setCurrentScreen] = useState('ai-screen');
  const [showNotification, setShowNotification] = useState(false);
  const slideAnim = new Animated.Value(0);
  const notificationAnim = new Animated.Value(-100);

  useEffect(() => {
    // Show notification after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
      Animated.timing(notificationAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Hide notification after 5 seconds
      setTimeout(() => {
        Animated.timing(notificationAnim, {
          toValue: -100,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowNotification(false);
        });
      }, 5000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

type ProgressBarProps = {
  progress: number;
  color?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color = '#6366f1' }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { backgroundColor: color, width: `${progress}%` }]} />
  </View>
);

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Card: React.FC<CardProps> = ({ children, style = {} }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

type ButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const Button: React.FC<ButtonProps> = ({ onPress, children, style = {}, textStyle = {} }) => (
  <TouchableOpacity 
    style={[styles.button, style]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.buttonText, textStyle]}>{children}</Text>
  </TouchableOpacity>
);

  const AIScreen = () => (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentScreen('home-screen')}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personalized AI Engine</Text>
      </View>

      <Card style={styles.profileCard}>
        <Text style={styles.cardTitle}>Your Cognitive Profile</Text>
        <Text style={styles.cardSubtitle}>
          The AI has identified your unique physiological and behavioral patterns associated with mental fatigue.
        </Text>
        
        <View style={styles.progressSection}>
          <View style={styles.progressItem}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Baseline Calibration</Text>
              <Text style={styles.progressValue}>98% Complete</Text>
            </View>
            <ProgressBar progress={98} />
          </View>
          
          <View style={styles.progressItem}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Intervention Effectiveness</Text>
              <Text style={styles.progressValue}>87% Accuracy</Text>
            </View>
            <ProgressBar progress={87} />
          </View>
          
          <View style={styles.progressItem}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Prediction Accuracy</Text>
              <Text style={styles.progressValue}>92% Precision</Text>
            </View>
            <ProgressBar progress={92} />
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Contextual Intelligence</Text>
        <Text style={styles.cardSubtitle}>
          The AI engine integrates environmental and behavioral factors to provide personalized insights.
        </Text>
        
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <View style={styles.gridHeader}>
              <ClockIcon />
              <Text style={styles.gridTitle}>Time of Day</Text>
            </View>
            <Text style={styles.gridText}>Your cognitive peak is typically between 9-11 AM</Text>
          </View>
          
          <View style={styles.gridItem}>
            <View style={styles.gridHeader}>
              <CloudIcon />
              <Text style={styles.gridTitle}>Environment</Text>
            </View>
            <Text style={styles.gridText}>Open office settings increase your MFI by 18%</Text>
          </View>
          
          <View style={styles.gridItem}>
            <View style={styles.gridHeader}>
              <CakeIcon />
              <Text style={styles.gridTitle}>Nutrition</Text>
            </View>
            <Text style={styles.gridText}>Caffeine after 2PM increases your evening MFI</Text>
          </View>
          
          <View style={styles.gridItem}>
            <View style={styles.gridHeader}>
              <FlameIcon />
              <Text style={styles.gridTitle}>Sleep</Text>
            </View>
            <Text style={styles.gridText}>Each hour below 7h increases your MFI by 12%</Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>N-of-1 Insights</Text>
        <Text style={styles.cardSubtitle}>
          Personalized recommendations based on your unique cognitive patterns.
        </Text>
        
        <View style={styles.insightsContainer}>
          <View style={styles.insightItem}>
            <View style={styles.insightNumber}>
              <Text style={styles.insightNumberText}>1</Text>
            </View>
            <Text style={styles.insightText}>
              Your optimal work blocks are 52 minutes followed by 17-minute breaks (vs. standard 25/5 pomodoro).
            </Text>
          </View>
          
          <View style={styles.insightItem}>
            <View style={styles.insightNumber}>
              <Text style={styles.insightNumberText}>2</Text>
            </View>
            <Text style={styles.insightText}>
              Brief nature exposure (5 min) reduces your MFI by 23% - more effective than caffeine.
            </Text>
          </View>
          
          <View style={styles.insightItem}>
            <View style={styles.insightNumber}>
              <Text style={styles.insightNumberText}>3</Text>
            </View>
            <Text style={styles.insightText}>
              Your cognitive recovery is 31% faster with active breaks vs. passive rest.
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Adaptive Algorithm Training</Text>
        <Text style={styles.cardSubtitle}>
          Help improve your personalized recommendations by providing feedback.
        </Text>
        
        <View style={styles.feedbackCard}>
          <View style={styles.feedbackHeader}>
            <View style={styles.feedbackTitleRow}>
              <MoonIcon />
              <Text style={styles.feedbackTitle}>Guided Breathing</Text>
            </View>
            <Text style={styles.feedbackTime}>Yesterday, 3:15 PM</Text>
          </View>
          <Text style={styles.feedbackQuestion}>
            Was this intervention effective in reducing your mental fatigue?
          </Text>
          <View style={styles.feedbackButtons}>
            <Button style={styles.feedbackButton}>Not Effective</Button>
            <Button style={styles.feedbackButton}>Somewhat</Button>
            <Button style={[styles.feedbackButton, styles.feedbackButtonActive]}>Very Effective</Button>
          </View>
        </View>
        
        <Button style={styles.secondaryButton}>
          View More Feedback Requests
        </Button>
      </Card>
    </ScrollView>
  );

  const NavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.navItems}>
        <TouchableOpacity 
          style={[styles.navItem, currentScreen === 'home-screen' && styles.navItemActive]}
          onPress={() => setCurrentScreen('home-screen')}
        >
          <HomeIcon />
          {currentScreen === 'home-screen' && <View style={styles.navIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, currentScreen === 'trends-screen' && styles.navItemActive]}
          onPress={() => setCurrentScreen('trends-screen')}
        >
          <TrendsIcon />
          {currentScreen === 'trends-screen' && <View style={styles.navIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, currentScreen === 'sensors-screen' && styles.navItemActive]}
          onPress={() => setCurrentScreen('sensors-screen')}
        >
          <SensorsIcon />
          {currentScreen === 'sensors-screen' && <View style={styles.navIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, currentScreen === 'ai-screen' && styles.navItemActive]}
          onPress={() => setCurrentScreen('ai-screen')}
        >
          <AIIcon />
          {currentScreen === 'ai-screen' && <View style={styles.navIndicator} />}
        </TouchableOpacity>
      </View>
    </View>
  );

  const Notification = () => (
    showNotification && (
      <Animated.View 
        style={[
          styles.notification,
          { transform: [{ translateY: notificationAnim }] }
        ]}
      >
        <View style={styles.notificationContent}>
          <InfoIcon />
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>MFI Alert</Text>
            <Text style={styles.notificationSubtitle}>
              Your Mental Fatigue Index is approaching threshold. Consider taking a break.
            </Text>
          </View>
        </View>
      </Animated.View>
    )
  );

  return (
    <LinearGradient
      colors={['#0f172a', '#1e1b4b']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <SafeAreaView style={styles.safeArea}>
        {currentScreen === 'ai-screen' && <AIScreen />}
        {currentScreen !== 'ai-screen' && (
          <View style={styles.placeholderScreen}>
            <Text style={styles.placeholderText}>
              {currentScreen === 'home-screen' && 'Home Screen'}
              {currentScreen === 'trends-screen' && 'Trends Screen'}
              {currentScreen === 'sensors-screen' && 'Sensors Screen'}
            </Text>
          </View>
        )}
        
        <NavBar />
        <Notification />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 24,
    paddingBottom: 100,
  },
  placeholderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileCard: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
    lineHeight: 20,
  },
  progressSection: {
    gap: 16,
  },
  progressItem: {
    gap: 8,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  progressValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6366f1',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(55, 65, 81, 1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 12,
    padding: 12,
  },
  gridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 8,
  },
  gridText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
  },
  insightsContainer: {
    gap: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  insightNumberText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
  },
  insightText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
    flex: 1,
  },
  feedbackCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedbackTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 8,
  },
  feedbackTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  feedbackQuestion: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 12,
    lineHeight: 18,
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  feedbackButton: {
    flex: 1,
    backgroundColor: 'rgba(55, 65, 81, 1)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  feedbackButtonActive: {
    backgroundColor: '#6366f1',
  },
  button: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  navContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  navItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    width: 60,
    position: 'relative',
  },
  navItemActive: {
    transform: [{ translateY: -8 }],
  },
  navIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#6366f1',
  },
  notification: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.9)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    marginLeft: 12,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  notificationSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
});

export default MindWatchApp;