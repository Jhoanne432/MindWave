import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Line, Path, Stop, LinearGradient as SvgLinearGradient, Text as SvgText } from 'react-native-svg';

const TrendChart: React.FC = () => {
  return (
    <View style={styles.trendChart}>
      <Svg width="100%" height={180} viewBox="0 0 300 180">
        <Defs>
          <SvgLinearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </SvgLinearGradient>
        </Defs>

        {/* Y axis labels */}
        <SvgText x="25" y="20" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="end">100</SvgText>
        <SvgText x="25" y="60" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="end">75</SvgText>
        <SvgText x="25" y="100" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="end">50</SvgText>
        <SvgText x="25" y="140" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="end">25</SvgText>

        {/* X axis labels */}
        <SvgText x="40" y="170" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="middle">6AM</SvgText>
        <SvgText x="100" y="170" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="middle">9AM</SvgText>
        <SvgText x="160" y="170" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="middle">12PM</SvgText>
        <SvgText x="220" y="170" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="middle">3PM</SvgText>
        <SvgText x="280" y="170" fontSize="10" fill="rgba(255,255,255,0.6)" textAnchor="middle">6PM</SvgText>

        {/* Grid lines */}
        <Line x1="30" y1="20" x2="290" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <Line x1="30" y1="60" x2="290" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <Line x1="30" y1="100" x2="290" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <Line x1="30" y1="140" x2="290" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />

        {/* Area shape */}
        <Path d="M40,140 L100,120 L160,80 L220,100 L280,60 L280,160 L40,160 Z" fill="url(#chartGradient)" />

        {/* Line path */}
        <Path d="M40,140 L100,120 L160,80 L220,100 L280,60" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />

        {/* Points */}
        <Circle cx="40" cy="140" r="4" fill="#6366f1" />
        <Circle cx="100" cy="120" r="4" fill="#6366f1" />
        <Circle cx="160" cy="80" r="4" fill="#6366f1" />
        <Circle cx="220" cy="100" r="4" fill="#6366f1" />
        <Circle cx="280" cy="60" r="6" fill="#ec4899" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  trendChart: {
    height: 180,
    marginTop: 12,
  },
});

export default TrendChart;
