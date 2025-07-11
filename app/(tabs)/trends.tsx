import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { Svg, Path, Circle, Line, Text as SvgText, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MindWatchApp = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Animate the pulse effect for highlighted dots
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const handleTabPress = (tab: string) => {
  setActiveTab(tab);
};


  const handleBackPress = () => {
    console.log("Navigating back to home screen");
  };

  const renderDailyTab = () => (
    <View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Insights</Text>
        <Text style={styles.cardText}>
          Your mental fatigue peaked at 2:30 PM (85 MFI). Consider scheduling important tasks earlier in the day.
        </Text>
        
        <View style={styles.chartContainer}>
          <Svg width="100%" height="220" viewBox="0 0 340 220">
            <Defs>
              <LinearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                <Stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            
            {/* Y-axis labels */}
            <SvgText x="25" y="20" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="end">100</SvgText>
            <SvgText x="25" y="60" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="end">75</SvgText>
            <SvgText x="25" y="100" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="end">50</SvgText>
            <SvgText x="25" y="140" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="end">25</SvgText>
            <SvgText x="25" y="180" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="end">0</SvgText>
            
            {/* X-axis labels */}
            <SvgText x="40" y="200" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">6AM</SvgText>
            <SvgText x="80" y="200" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">8AM</SvgText>
            <SvgText x="120" y="200" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">10AM</SvgText>
            <SvgText x="160" y="200" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">12PM</SvgText>
            <SvgText x="200" y="200" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">2PM</SvgText>
            <SvgText x="240" y="200" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">4PM</SvgText>
            <SvgText x="280" y="200" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">6PM</SvgText>
            <SvgText x="320" y="200" fontSize="10" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle">8PM</SvgText>
            
            {/* Chart grid lines */}
            <Line x1="30" y1="20" x2="330" y2="20" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <Line x1="30" y1="60" x2="330" y2="60" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <Line x1="30" y1="100" x2="330" y2="100" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <Line x1="30" y1="140" x2="330" y2="140" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <Line x1="30" y1="180" x2="330" y2="180" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            
            {/* Chart data */}
            <Path
              d="M40,160 L80,140 L120,120 L160,100 L200,40 L240,60 L280,80 L320,100"
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M40,160 L80,140 L120,120 L160,100 L200,40 L240,60 L280,80 L320,100 L320,180 L40,180 Z"
              fill="url(#gradient2)"
            />
            
            {/* Data points */}
            <Circle cx="40" cy="160" r="4" fill="#6366f1" stroke="#1e293b" strokeWidth="2" />
            <Circle cx="80" cy="140" r="4" fill="#6366f1" stroke="#1e293b" strokeWidth="2" />
            <Circle cx="120" cy="120" r="4" fill="#6366f1" stroke="#1e293b" strokeWidth="2" />
            <Circle cx="160" cy="100" r="4" fill="#6366f1" stroke="#1e293b" strokeWidth="2" />
            <Circle cx="200" cy="40" r="6" fill="#ec4899" stroke="#1e293b" strokeWidth="3" />
            <Circle cx="240" cy="60" r="4" fill="#6366f1" stroke="#1e293b" strokeWidth="2" />
            <Circle cx="280" cy="80" r="4" fill="#6366f1" stroke="#1e293b" strokeWidth="2" />
            <Circle cx="320" cy="100" r="4" fill="#6366f1" stroke="#1e293b" strokeWidth="2" />
            
            {/* Peak indicator */}
            <Line x1="200" y1="40" x2="200" y2="180" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4" />
            <Rect x="170" y="10" width="60" height="20" rx="10" fill="#ec4899" />
            <SvgText x="200" y="24" fontSize="10" fill="white" textAnchor="middle">Peak: 85</SvgText>
          </Svg>
        </View>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Insights</Text>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            Your mental fatigue increases significantly after lunch meetings. Consider scheduling important work before lunch.
          </Text>
        </View>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            Taking short 5-minute breaks every hour has shown to reduce your afternoon fatigue by 23%.
          </Text>
        </View>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            Taking short 5-minute breaks every hour has shown to reduce your afternoon fatigue by 23%.
          </Text>
        </View>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            Taking short 5-minute breaks every hour has shown to reduce your afternoon fatigue by 23%.
          </Text>
        </View>
      </View>
    </View>
  );

  const renderWeeklyTab = () => (
    <View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Pattern</Text>
        <Text style={styles.cardText}>
          Your mental fatigue is highest on Wednesdays and lowest on weekends.
        </Text>
        
        <View style={styles.barChartContainer}>
          <View style={styles.barChart}>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 60 }]} />
              <Text style={styles.barLabel}>Mon</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 90 }]} />
              <Text style={styles.barLabel}>Tue</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.barHigh, { height: 120 }]} />
              <Text style={styles.barLabel}>Wed</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 80 }]} />
              <Text style={styles.barLabel}>Thu</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 70 }]} />
              <Text style={styles.barLabel}>Fri</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 40 }]} />
              <Text style={styles.barLabel}>Sat</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 30 }]} />
              <Text style={styles.barLabel}>Sun</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Recommendations</Text>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            Schedule lighter tasks on Wednesdays when your fatigue tends to peak.
          </Text>
        </View>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            Your weekends show excellent recovery. Maintain your current weekend relaxation routine.
          </Text>
        </View>
      </View>
    </View>
  );

  const renderMonthlyTab = () => (
    <View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Overview</Text>
        <Text style={styles.cardText}>
          Your average MFI has decreased by 12% this month compared to last month.
        </Text>
        
        <View style={styles.chartContainer}>
          <Svg width="100%" height="200" viewBox="0 0 340 200">
            <Defs>
              <LinearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                <Stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            
            {/* Chart grid lines */}
            <Line x1="40" y1="20" x2="320" y2="20" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <Line x1="40" y1="60" x2="320" y2="60" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <Line x1="40" y1="100" x2="320" y2="100" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <Line x1="40" y1="140" x2="320" y2="140" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <Line x1="40" y1="180" x2="320" y2="180" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            
            {/* Previous month line */}
            <Path
              d="M40,80 L80,60 L120,90 L160,70 L200,50 L240,80 L280,60 L320,70"
              stroke="#94a3b8"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4"
            />
            
            {/* Current month line */}
            <Path
              d="M40,100 L80,90 L120,110 L160,100 L200,80 L240,100 L280,90 L320,80"
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M40,100 L80,90 L120,110 L160,100 L200,80 L240,100 L280,90 L320,80 L320,180 L40,180 Z"
              fill="url(#gradient3)"
            />
            
            {/* Legend */}
            <Rect x="40" y="10" width="10" height="2" fill="#94a3b8" />
            <SvgText x="55" y="14" fontSize="10" fill="rgba(255, 255, 255, 0.6)">Last Month</SvgText>
            <Rect x="120" y="10" width="10" height="2" fill="#6366f1" />
            <SvgText x="135" y="14" fontSize="10" fill="rgba(255, 255, 255, 0.6)">This Month</SvgText>
          </Svg>
        </View>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Insights</Text>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            Your new meditation routine is working! Your average MFI has decreased by 12% this month.
          </Text>
        </View>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            Your most productive days are Tuesdays and Thursdays when your MFI stays below 60.
          </Text>
        </View>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'daily':
        return renderDailyTab();
      case 'weekly':
        return renderWeeklyTab();
      case 'monthly':
        return renderMonthlyTab();
      default:
        return renderDailyTab();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fatigue Trends</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
          onPress={() => handleTabPress('daily')}
        >
          <Text style={[styles.tabText, activeTab === 'daily' && styles.activeTabText]}>
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
          onPress={() => handleTabPress('weekly')}
        >
          <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'monthly' && styles.activeTab]}
          onPress={() => handleTabPress('monthly')}
        >
          <Text style={[styles.tabText, activeTab === 'monthly' && styles.activeTabText]}>
            Monthly
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingTop: 24,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  chartContainer: {
    height: 220,
    marginTop: 20,
  },
  insightCard: {
    padding: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  insightText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  barChartContainer: {
    height: 192,
    marginTop: 20,
  },
  barChart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 24,
    backgroundColor: '#6366f1',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 8,
  },
  barHigh: {
    width: 24,
    backgroundColor: '#ec4899',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
});

export default MindWatchApp;