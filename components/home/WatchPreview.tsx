import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type WatchPreviewProps = {
    currentTime: string;
    watchMFI: number;
};

const WatchPreview: React.FC<WatchPreviewProps> = ({
    currentTime,
    watchMFI,
}) => {
    return (
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
                        <Text style={styles.watchMFI}>
                            {watchMFI}
                        </Text>
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
                <Text style={styles.watchInfoSubtitle}>
                    Mental Focus Intelligence • Connected • Battery 78%
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    watchContainer: {
        backgroundColor: '#1f2937',
        borderRadius: 24,
        padding: 20,
        alignItems: 'center',
    },
    watchTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    watchBody: {
        alignItems: 'center',
        width: 160,
    },
    watchBand: {
        width: 140,
        height: 20,
        backgroundColor: '#4b5563',
        borderRadius: 10,
        marginBottom: 4,
    },
    watchScreen: {
        width: 160,
        height: 200,
        backgroundColor: '#111827',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'space-between',
    },
    watchTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    watchTime: {
        color: '#f3f4f6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    watchBattery: {
        color: '#facc15',
        fontSize: 14,
        fontWeight: '600',
    },
    watchMainDisplay: {
        alignItems: 'center',
        marginBottom: 8,
    },
    watchMFI: {
        color: '#10b981',
        fontSize: 36,
        fontWeight: 'bold',
    },
    watchMFILabel: {
        color: '#d1d5db',
        fontSize: 12,
        fontWeight: '600',
    },
    watchStatus: {
        alignItems: 'center',
        marginBottom: 8,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#065f46',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    statusDot: {
        width: 8,
        height: 8,
        backgroundColor: '#10b981',
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        color: '#d1fae5',
        fontSize: 12,
        fontWeight: '600',
    },
    watchMetrics: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    watchMetric: {
        alignItems: 'center',
        flex: 1,
    },
    metricIcon: {
        color: '#60a5fa',
        fontSize: 16,
        marginBottom: 2,
    },
    metricValue: {
        color: '#f3f4f6',
        fontSize: 14,
        fontWeight: 'bold',
    },
    metricLabel: {
        color: '#9ca3af',
        fontSize: 10,
    },
    watchConnection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    connectionDot: {
        width: 6,
        height: 6,
        backgroundColor: '#10b981',
        borderRadius: 3,
        marginRight: 4,
    },
    connectionText: {
        color: '#d1fae5',
        fontSize: 12,
        fontWeight: '600',
    },
    watchBandBottom: {
        width: 140,
        height: 20,
        backgroundColor: '#4b5563',
        borderRadius: 10,
        marginTop: 4,
    },
    watchInfo: {
        marginTop: 12,
        alignItems: 'center',
    },
    watchInfoTitle: {
        color: '#f3f4f6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    watchInfoSubtitle: {
        color: '#9ca3af',
        fontSize: 12,
        textAlign: 'center',
    },
});


export default WatchPreview;
