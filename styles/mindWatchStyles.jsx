import { StyleSheet } from 'react-native';

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
    vitalsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
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
});

export default styles;