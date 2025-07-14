import TabBar from '@/components/TabBar'
import { Tabs } from 'expo-router'

const _layout = () => {
    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} key={1}/>
            <Tabs.Screen name="trends" options={{ title: 'Trends', headerShown: false }} key={2}/>
            <Tabs.Screen name="devices" options={{ title: 'Devices', headerShown: false }} key={3}/>
            <Tabs.Screen name="profile" options={{ title: 'Profile', headerShown: false }} key={4}/>
        </Tabs>
    )
}

export default _layout