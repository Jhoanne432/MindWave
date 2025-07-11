import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Line,
  Text as SvgText,
} from 'react-native-svg';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import TabNavigator from '../TabNavigator';


const { width } = Dimensions.get('window');

const VitalCard: React.FC<{
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
}> = ({ icon, value, label, color }) => (
  <View style={[styles.vitalCard, { borderColor: color }]}>
    <View style={styles.vitalIcon}>{icon}</View>
    <Text style={[styles.vitalValue, { color }]}>{value}</Text>
    <Text style={styles.vitalLabel}>{label}</Text>
  </View>
);

const MindWatchApp = () => {
  const [mfiValue, setMfiValue] = useState(0);
  const [currentTime, setCurrentTime] = useState('2:45 PM');
  const [watchMFI, setWatchMFI] = useState(32);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatingAnim = useRef(new Animated.Value(0)).current;
  const brainWaveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // MFI animation
    const mfiInterval = setInterval(() => {
      setMfiValue(prev => {
        const target = 65;
        return prev < target ? prev + 1 : target;
      });
    }, 30);

    // Watch MFI update
    const watchInterval = setInterval(() => {
      setWatchMFI(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(20, Math.min(100, prev + change));
      });
    }, 8000);

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    return () => {
      clearInterval(mfiInterval);
      clearInterval(watchInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const FatigueMeter = () => {
  const radius = 95;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = (mfiValue / 100) * circumference;

  return (
    <View style={styles.fatigueMeterContainer}>
      <Svg width={220} height={220} viewBox="0 0 220 220">
        <Defs>
          <SvgLinearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#6366f1" />
            <Stop offset="100%" stopColor="#ec4899" />
          </SvgLinearGradient>
        </Defs>
        <Circle
          cx={110}
          cy={110}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={110}
          cy={110}
          r={radius}
          fill="none"
          stroke="url(#meterGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${strokeDasharray} ${circumference}`}
          transform="rotate(-90 110 110)"
        />
        <SvgText
          x="110"
          y="108"
          fontSize="38"
          fontWeight="bold"
          fill="#fff"
          textAnchor="middle"
        >
          {mfiValue}
        </SvgText>
        <SvgText
          x="110"
          y="135"
          fontSize="12"
          fill="#cbd5e1"
          textAnchor="middle"
        >
          Mental Fatigue Index
        </SvgText>
      </Svg>
    </View>
  );
};


  const TrendChart = () => {
    return (
      <View style={styles.trendChart}>
        <Svg width="100%" height={180} viewBox="0 0 300 180">
          <Defs>
            <SvgLinearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <Stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </SvgLinearGradient>
          </Defs>
          
          {/* Y-axis labels */}
          <SvgText x="25" y="20" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="end">100</SvgText>
          <SvgText x="25" y="60" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="end">75</SvgText>
          <SvgText x="25" y="100" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="end">50</SvgText>
          <SvgText x="25" y="140" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="end">25</SvgText>
          
          {/* X-axis labels */}
          <SvgText x="40" y="170" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">6AM</SvgText>
          <SvgText x="100" y="170" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">9AM</SvgText>
          <SvgText x="160" y="170" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">12PM</SvgText>
          <SvgText x="220" y="170" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">3PM</SvgText>
          <SvgText x="280" y="170" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">6PM</SvgText>
          
          {/* Grid lines */}
          <Line x1="30" y1="20" x2="290" y2="20" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <Line x1="30" y1="60" x2="290" y2="60" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <Line x1="30" y1="100" x2="290" y2="100" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <Line x1="30" y1="140" x2="290" y2="140" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          
          {/* Chart data */}
          <Path d="M40,140 L100,120 L160,80 L220,100 L280,60 L280,160 L40,160 Z" fill="url(#chartGradient)" />
          <Path d="M40,140 L100,120 L160,80 L220,100 L280,60" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
          
          {/* Data points */}
          <Circle cx="40" cy="140" r="4" fill="#6366f1" />
          <Circle cx="100" cy="120" r="4" fill="#6366f1" />
          <Circle cx="160" cy="80" r="4" fill="#6366f1" />
          <Circle cx="220" cy="100" r="4" fill="#6366f1" />
          <Circle cx="280" cy="60" r="6" fill="#ec4899" />
        </Svg>
      </View>
    );
  };

type VitalCardProps = {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
};

const VitalCard: React.FC<VitalCardProps> = ({ icon, value, label, color }) => (
  <View style={[styles.vitalCard, { borderColor: color }]}>
    <View style={styles.vitalIcon}>{icon}</View>
    <Text style={[styles.vitalValue, { color }]}>{value}</Text>
    <Text style={styles.vitalLabel}>{label}</Text>
  </View>
);

  const WatchPreview = () => (
    <View style={styles.watchContainer}>
      <Text style={styles.watchTitle}>MindMeter Watch</Text>
      
      <View style={styles.watchBody}>
        <View style={styles.watchBand} />
        
        <View style={styles.watchScreen}>
          <View style={styles.watchTopRow}>
            <Text style={styles.watchTime}>{currentTime}</Text>
            <Text style={styles.watchBattery}>78%</Text>
          </View>
          
          <View style={styles.watchMainDisplay}>
            <Animated.Text style={[styles.watchMFI, { transform: [{ scale: pulseAnim }] }]}>
              {watchMFI}
            </Animated.Text>
            <Text style={styles.watchMFILabel}>MFI SCORE</Text>
          </View>
          
          <View style={styles.watchStatus}>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Vigilant</Text>
            </View>
          </View>
          
          <View style={styles.watchMetrics}>
            <View style={styles.watchMetric}>
              <Text style={styles.metricIcon}>♥</Text>
              <Text style={styles.metricValue}>72</Text>
              <Text style={styles.metricLabel}>BPM</Text>
            </View>
            <View style={styles.watchMetric}>
              <Text style={styles.metricIcon}>👟</Text>
              <Text style={styles.metricValue}>8.2K</Text>
              <Text style={styles.metricLabel}>Steps</Text>
            </View>
            <View style={styles.watchMetric}>
              <Text style={styles.metricIcon}>🌙</Text>
              <Text style={styles.metricValue}>7.5h</Text>
              <Text style={styles.metricLabel}>Sleep</Text>
            </View>
          </View>
          
          <View style={styles.watchConnection}>
            <View style={styles.connectionDot} />
            <Text style={styles.connectionText}>Connected</Text>
          </View>
        </View>
        
        <View style={styles.watchBandBottom} />
      </View>
      
      <View style={styles.watchInfo}>
        <Text style={styles.watchInfoTitle}>MindMeter Watch</Text>
        <Text style={styles.watchInfoSubtitle}>Mental Focus Intelligence • Connected • Battery 78%</Text>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0f172a', '#1e1b4b']}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerTitle}>MindWatch</Text>
                <Text style={styles.headerSubtitle}>Your mental wellness companion</Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>🔔</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.profileIcon}>JS</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Fatigue Meter */}
            <Animated.View 
              style={[
                styles.meterContainer,
                {
                  transform: [
                    {
                      translateY: floatingAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -10],
                      }),
                    },
                  ],
                },
              ]}
            >
              <FatigueMeter />
            </Animated.View>

            {/* Vitals Grid */}
            <View style={styles.vitalsGrid}>
              <VitalCard icon={<FontAwesome5 name="heartbeat" size={24} color="#ec4899" />} value="78" label="Heart Rate (BPM)" color="#ec4899" />
              <VitalCard icon={<FontAwesome5 name="moon" size={24} color="#8b5cf6" />} value="86%" label="Sleep Quality" color="#8b5cf6" />
              <VitalCard icon={<FontAwesome5 name="shoe-prints" size={24} color="#6366f1" />} value="6,842" label="Steps Today" color="#6366f1" />
              <VitalCard icon={<FontAwesome5 name="lungs" size={24} color="#10b981" />} value="98%" label="Blood Oxygen" color="#10b981" />
            </View>

            {/* Personalized AI Insight */}
          <View style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <View style={styles.aiIconContainer}>
                <Feather name="activity" size={16} color="#c084fc" />
              </View>
              <Text style={styles.aiTitle}>Personalized AI Insight</Text>
            </View>
            <Text style={styles.aiDescription}>
              Your cognitive load increases by <Text style={{ fontWeight: 'bold' }}>27%</Text> during video meetings compared to phone calls. Consider scheduling important tasks before your <Text style={{ fontWeight: 'bold' }}>2:00 PM</Text> meeting.
            </Text>
          </View>

          {/* Fatigue Forecast */}
          <View style={styles.fatigueCard}>
            <View style={styles.fatigueHeader}>
              <View style={styles.fatigueIconContainer}>
                <Feather name="alert-circle" size={16} color="#f87171" />
              </View>
              <Text style={styles.fatigueTitle}>Fatigue Forecast</Text>
            </View>
            <Text style={styles.fatigueDescription}>
              Predicted cognitive overload in <Text style={{ color: '#f87171', fontWeight: 'bold' }}>45 minutes</Text> based on current trends and upcoming calendar events.
            </Text>
            <View style={styles.fatigueButtons}>
              <TouchableOpacity style={styles.dismissButton}>
                <Text style={styles.fatigueDescription}>Dismiss</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interveneButton}>
                <Text style={styles.fatigueDescription}>View Interventions</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Current Status */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Feather name="info" size={16} color="#60a5fa" style={styles.cardIcon} />
              <Text style={[styles.cardTitle, { color: '#60a5fa' }]}>Current Status</Text>
            </View>
            <Text style={styles.statusMessage}>
              Connecting to your devices...
            </Text>
          </View>



            {/* Trend Chart */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <FontAwesome5 name="chart-line" size={24} color="#6366f1" style={styles.cardIcon} />
                  <Text style={styles.cardTitle}>Today's Trend</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.viewDetails}>View Details</Text>
                </TouchableOpacity>
              </View>
              <TrendChart />
            </View>

            {/* Watch Preview */}
            <View style={styles.card}>
              <WatchPreview />
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionIcon: {
    fontSize: 18,
  },
  profileIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  meterContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  fatigueMeterContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  meterText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  mfiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  mfiLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  brainActivity: {
    height: 60,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },

  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  viewDetails: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '500',
  },
  statusMessage: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  vitalCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    height: 120,
    justifyContent: 'space-between',
  },
  vitalIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  vitalLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
aiCard: {
  backgroundColor: '#4c1d95',
  borderRadius: 20,
  padding: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#7e22ce',
},
aiHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
aiIconContainer: {
  backgroundColor: '#7e22ce',
  borderRadius: 10,
  padding: 6,
  marginRight: 8,
},
aiTitle: {
  color: '#c084fc',
  fontSize: 18,
  fontWeight: '600',
},
aiDescription: {
  color: '#e2e8f0',
  fontSize: 16,
  lineHeight: 20,
},

fatigueCard: {
  backgroundColor: '#7f1d1d',
  borderRadius: 20,
  padding: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#dc2626',
},
fatigueHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
fatigueIconContainer: {
  backgroundColor: '#dc2626',
  borderRadius: 10,
  padding: 6,
  marginRight: 8,
},
fatigueTitle: {
  color: '#f87171',
  fontSize: 18,
  fontWeight: '600',
},
fatigueDescription: {
  color: '#fef2f2',
  fontSize: 16,
  lineHeight: 20,
},
fatigueButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
},
dismissButton: {
  flex: 1,
  backgroundColor: '#78350f',
  paddingVertical: 10,
  borderRadius: 12,
  marginRight: 8,
  alignItems: 'center',
},
dismissText: {
  color: '#fef3c7',
  fontWeight: '600',
},
interveneButton: {
  flex: 1,
  backgroundColor: '#6366f1',
  paddingVertical: 10,
  borderRadius: 12,
  marginLeft: 8,
  alignItems: 'center',
},
interveneText: {
  color: '#fff',
  fontWeight: '600',
},

cardText: {
  fontSize: 14,
  color: 'rgba(255, 255, 255, 0.9)',
  lineHeight: 20,
},

buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
},
  trendChart: {
    height: 180,
    marginTop: 12,
  },
  watchContainer: {
    alignItems: 'center',
  },
  watchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  watchBody: {
    width: 180,
    height: 230,
    position: 'relative',
    alignItems: 'center',
  },
  watchBand: {
    position: 'absolute',
    top: -8,
    width: 60,
    height: 16,
    backgroundColor: '#374151',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  watchBandBottom: {
    position: 'absolute',
    bottom: -8,
    width: 60,
    height: 16,
    backgroundColor: '#374151',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  watchScreen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 4,
    borderColor: '#374151',
  },
  watchTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  watchTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  watchBattery: {
    fontSize: 12,
    color: '#10b981',
  },
  watchMainDisplay: {
    alignItems: 'center',
  },
  watchMFI: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#06b6d4',
    marginBottom: 8,
  },
  watchMFILabel: {
    fontSize: 14,
    color: '#9ca3af',
    letterSpacing: 2,
  },
  watchStatus: {
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    borderColor: '#10b981',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  watchMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  watchMetric: {
    alignItems: 'center',
    flex: 1,
  },
  metricIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  metricLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  watchConnection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#10b981',
    marginRight: 4,
  },
  connectionText: {
    fontSize: 10,
    color: '#6b7280',
  },
  watchInfo: {
    marginTop: 24,
    alignItems: 'center',
  },
  watchInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  watchInfoSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default MindWatchApp;