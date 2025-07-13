import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Stop, LinearGradient as SvgLinearGradient, Text as SvgText } from 'react-native-svg';

type FatigueMeterProps = {
  mfiValue: number;
};

const FatigueMeter: React.FC<FatigueMeterProps> = ({ mfiValue }) => {
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

const styles = StyleSheet.create({
  fatigueMeterContainer: {
    position: 'relative',
    alignItems: 'center',
  },
});

export default FatigueMeter;
