import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export type VitalCardProps = {
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

const styles = StyleSheet.create({
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
});

export default VitalCard;
