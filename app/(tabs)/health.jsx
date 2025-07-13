import React, { useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

export default function Health() {
    const [inputData, setInputData] = useState([]);
    const [prediction, setPrediction] = useState(null);
    const [probabilities, setProbabilities] = useState(null);
    const [loading, setLoading] = useState(false);

    const featureNames = [
        "Heart Rate (BPM)",
        "Steps Count",
        "Blood Oxygen Level (%)",
        "Sleep Duration (hours)"
    ];

    // Simulate fetching data for each metric for 10 timesteps
    // Replace with your real data fetch from Health Connect as needed
    const fetchHealthData = async () => {
        const now = new Date();
        const heartRate = [];
        const steps = [];
        const spO2 = [];
    
        const sleepHours = 2.5 + Math.random() * (10.5 - 2.5);
    
        // Generate 10 timestamps (1 per minute)
        for (let i = 0; i < 10; i++) {
            const timestamp = new Date(now.getTime() - (9 - i) * 60000).toISOString();
            heartRate.push({
                timestamp,
                heartRate: Math.floor(40 + Math.random() * (114 - 40 + 1)) // 40–114 BPM
            });
            steps.push({
                timestamp,
                steps:  Math.floor(Math.random() * 251) // 0-250
            });
            spO2.push({
                timestamp,
                spO2: Math.floor(92.91 + Math.random() * (100 - 92.21)) // 95–98%
            });
        }
    
        // Prepare data in 4 normalized input windows
        const inputWindows = [[], [], [], []];
    
        for (let i = 0; i < 10; i++) {
            const hr = heartRate[i].heartRate;
            const st = steps[i].steps;
            const o2 = spO2[i].spO2;
        
            inputWindows[0].push([hr]);          // raw heart rate
            inputWindows[1].push([st]);          // raw steps
            inputWindows[2].push([o2]);          // raw blood oxygen
            inputWindows[3].push([sleepHours]);  // raw sleep duration
        }
    
        setInputData(inputWindows);
        setPrediction(null);
        setProbabilities(null);
    };

    const predict = async () => {
        if (inputData.length !== 4) return;

        setLoading(true);

        try {
            const response = await fetch('http://192.168.1.4:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: inputData }),
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const json = await response.json();
            if (json.error) throw new Error(json.error);

            setPrediction(json.prediction);
            setProbabilities(json.probabilities);
        } catch (err) {
            console.error('Prediction error:', err);
            setPrediction('Error');
            setProbabilities(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#222' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: 'white' }}>
                MindMeter Health Monitor
            </Text>

            <Button title="Fetch Realistic Health Data" onPress={fetchHealthData} />
            <View style={{ marginVertical: 10 }} />
            <Button
                title={loading ? 'Predicting...' : 'Predict Fatigue'}
                onPress={predict}
                disabled={!inputData.length || loading}
            />

            {inputData.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Input Data (Standardized):</Text>
                    <ScrollView
                        style={styles.inputContainer}
                        horizontal
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                        showsHorizontalScrollIndicator={true}
                    >
                        {inputData.map((featureWindow, i) => (
                            <View key={i} style={styles.featureColumn}>
                                <Text style={styles.featureTitle}>{featureNames[i]}</Text>
                                {featureWindow.map((val, j) => (
                                    <Text key={j} style={styles.valueText}>
                                        {val[0].toFixed(4)}
                                    </Text>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </>
            )}

            {prediction && (
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.sectionTitle}>Prediction Result:</Text>
                    <Text style={styles.predictionText}>{prediction}</Text>

                    {probabilities && (
                        <>
                            <Text style={styles.sectionTitle}>Probabilities:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                {probabilities.map((p, i) => (
                                    <View key={i} style={styles.probabilityBox}>
                                        <Text style={styles.probabilityLabel}>{['Low', 'Med', 'High'][i]}</Text>
                                        <Text style={styles.probabilityValue}>{(p * 100).toFixed(2)}%</Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = {
    sectionTitle: {
        marginTop: 20,
        marginBottom: 8,
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    inputContainer: {
        maxHeight: 220,
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 10,
    },
    featureColumn: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    featureTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#66ccff',
    },
    valueText: {
        fontSize: 12,
        color: 'white',
        lineHeight: 18,
    },
    predictionText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#ffcc00',
        marginBottom: 10,
    },
    probabilityBox: {
        backgroundColor: '#444',
        padding: 12,
        borderRadius: 10,
        minWidth: 80,
        alignItems: 'center',
    },
    probabilityLabel: {
        color: '#aaa',
        marginBottom: 5,
    },
    probabilityValue: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
};

// import React, { useEffect, useState } from 'react';
// import { Button, ScrollView, Text } from 'react-native';
// import {
//     fetchBloodOxygen,
//     fetchHeartRate,
//     fetchSleepSessions,
//     fetchStepCount,
//     getTimeRangeMinutesAgo,
//     initializeHealthConnect,
//     requestHealthPermissions
// } from '../../health_connect/healthConnect';

// export default function HealthScreen() {
//   const [initialized, setInitialized] = useState(false);
//   const [data, setData] = useState({
//     heartRate: [],
//     spo2: [],
//     steps: [],
//     sleep: [],
//   });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function initAndFetch() {
//       try {
//         const isInit = await initializeHealthConnect();
//         setInitialized(isInit);
//         if (!isInit) return;

//         await requestHealthPermissions();

//         const { startTime, endTime } = getTimeRangeMinutesAgo(1);

//         setData({
//           heartRate: await fetchHeartRate(startTime, endTime),
//           spo2: await fetchBloodOxygen(startTime, endTime),
//           steps: await fetchStepCount(startTime, endTime),
//           sleep: await fetchSleepSessions(startTime, endTime),
//         });
//       } catch (e) {
//         setError(e.message || 'Error fetching health data');
//       }
//     }
//     initAndFetch();
//   }, []);

//   async function refreshData() {
//     if (!initialized) return;
//     setError(null);
//     try {
//       const { startTime, endTime } = getTimeRangeMinutesAgo(1);
//       setData({
//         heartRate: await fetchHeartRate(startTime, endTime),
//         spo2: await fetchBloodOxygen(startTime, endTime),
//         steps: await fetchStepCount(startTime, endTime),
//         sleep: await fetchSleepSessions(startTime, endTime),
//       });
//     } catch (e) {
//       setError(e.message || 'Error refreshing data');
//     }
//   }

//   function renderSummary(title, arr) {
//     if (!arr || arr.length === 0) return <Text>{title}: No data</Text>;
//     // Just display count and first item
//     return (
//       <Text>
//         {title}: {arr.length} records, example: {JSON.stringify(arr[0])}
//       </Text>
//     );
//   }

//   return (
//     <ScrollView style={{ padding: 20 }}>
//       <Text>Health Connect initialized: {initialized ? 'Yes' : 'No'}</Text>
//       {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}

//       {renderSummary('Heart Rate', data.heartRate)}
//       {renderSummary('SpO2', data.spo2)}
//       {renderSummary('Steps', data.steps)}
//       {renderSummary('Sleep Sessions', data.sleep)}

//       <Button title="Refresh Data" onPress={refreshData} />
//     </ScrollView>
//   );
// }
