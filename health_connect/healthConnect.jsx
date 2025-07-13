// healthUtils.js
import { initialize, readRecords, requestPermission } from 'react-native-health-connect';

/**
 * Initialize Health Connect - call this once before any other operations.
 * Returns true if initialized successfully, false otherwise.
 * 
 
 */
export async function initializeHealthConnect() {
  try {
    const isInitialized = await initialize();
    console.log('Health Connect initialized:', isInitialized);
    return isInitialized;
  } catch (err) {
    console.error('Failed to initialize Health Connect:', err);
    return false;
  }
}

/**
 * Request permissions for the needed health data types.
 * Call this once after initialization before reading any data.
 */
export async function requestHealthPermissions() {
  try {
    const permissions = await requestPermission([
      { accessType: 'read', recordType: 'HeartRate' },
      { accessType: 'read', recordType: 'OxygenSaturation' },
      { accessType: 'read', recordType: 'Steps' },
      { accessType: 'read', recordType: 'SleepSession' },
    ]);
    console.log('Health permissions granted:', permissions);
    return permissions;
  } catch (err) {
    console.error('Error requesting permissions:', err);
    throw err;
  }
}

/**
 * Fetch Heart Rate records between startTime and endTime (ISO strings)
 */
export async function fetchHeartRate(startTime, endTime) {
  try {
    const { records } = await readRecords('HeartRate', {
      timeRangeFilter: { operator: 'between', startTime, endTime },
    });
    return records;
  } catch (err) {
    console.error('Error fetching heart rate:', err);
    return [];
  }
}

/**
 * Fetch Blood Oxygen records between startTime and endTime (ISO strings)
 */
export async function fetchBloodOxygen(startTime, endTime) {
  try {
    const { records } = await readRecords('OxygenSaturation', {
      timeRangeFilter: { operator: 'between', startTime, endTime },
    });
    return records;
  } catch (err) {
    console.error('Error fetching blood oxygen:', err);
    return [];
  }
}

/**
 * Fetch Step Count records between startTime and endTime (ISO strings)
 */
export async function fetchStepCount(startTime, endTime) {
  try {
    const { records } = await readRecords('Steps', {
      timeRangeFilter: { operator: 'between', startTime, endTime },
    });
    return records;
  } catch (err) {
    console.error('Error fetching step count:', err);
    return [];
  }
}

/**
 * Fetch Sleep Session records between startTime and endTime (ISO strings)
 */
export async function fetchSleepSessions(startTime, endTime) {
  try {
    const { records } = await readRecords('SleepSession', {
      timeRangeFilter: { operator: 'between', startTime, endTime },
    });
    return records;
  } catch (err) {
    console.error('Error fetching sleep sessions:', err);
    return [];
  }
}

/**
 * Helper: get ISO strings for current time minus given minutes and now
 * @param {number} minutesAgo how many minutes back from now
 * @returns {object} { startTime, endTime } ISO strings
 */
export function getTimeRangeMinutesAgo(minutesAgo) {
  const end = new Date();
  const start = new Date(end.getTime() - minutesAgo * 60 * 1000);
  return {
    startTime: start.toISOString(),
    endTime: end.toISOString(),
  };
}
