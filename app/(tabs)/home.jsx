import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import styles from '../../styles/mindWatchStyles';

import FatigueMeter from '../../components/home/FatigueMeter';
import TrendChart from '../../components/home/TrendChart';
import VitalCard from '../../components/home/VitalCard';
import WatchPreview from '../../components/home/WatchPreview';

// const { width } = Dimensions.get('window');

const MindWatchApp = () => {
  const [mfiValue, setMfiValue] = useState(0);
  const [currentTime, setCurrentTime] = useState('2:45 PM');
  const [watchMFI, setWatchMFI] = useState(32);

  useEffect(() => {
    // MFI animation simulation
    const mfiInterval = setInterval(() => {
      setMfiValue((prev) => {
        const target = 65;
        return prev < target ? prev + 1 : target;
      });
    }, 30);

    // Watch MFI update
    const watchInterval = setInterval(() => {
      setWatchMFI((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(20, Math.min(100, prev + change));
      });
    }, 8000);

    // Update time every minute
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    return () => {
      clearInterval(mfiInterval);
      clearInterval(watchInterval);
      clearInterval(timeInterval);
    };
  }, []);

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
          <View style={styles.content}>
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
            <View style={styles.meterContainer}>
              <FatigueMeter mfiValue={mfiValue} />
            </View>

            {/* Vitals Grid */}
            <View style={styles.vitalsGrid}>
              <VitalCard
                icon={<FontAwesome5 name="heartbeat" size={24} color="#ec4899" />}
                value="78"
                label="Heart Rate (BPM)"
                color="#ec4899"
              />
              <VitalCard
                icon={<FontAwesome5 name="moon" size={24} color="#8b5cf6" />}
                value="86%"
                label="Sleep Quality"
                color="#8b5cf6"
              />
              <VitalCard
                icon={<FontAwesome5 name="shoe-prints" size={24} color="#6366f1" />}
                value="6,842"
                label="Steps Today"
                color="#6366f1"
              />
              <VitalCard
                icon={<FontAwesome5 name="lungs" size={24} color="#10b981" />}
                value="98%"
                label="Blood Oxygen"
                color="#10b981"
              />
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
                  <Text style={styles.dismissText}>Dismiss</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.interveneButton}>
                  <Text style={styles.interveneText}>View Interventions</Text>
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
              <WatchPreview
                currentTime={currentTime}
                watchMFI={watchMFI}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default MindWatchApp;
