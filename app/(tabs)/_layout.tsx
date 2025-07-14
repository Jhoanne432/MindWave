import TabBar from '@/components/TabBar'
import { Tabs } from 'expo-router'

const _layout = () => {
    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="trends" options={{ title: 'Trends' }} />
            <Tabs.Screen name="devices" options={{ title: 'Devices' }} />
            <Tabs.Screen name="profile" options={{ title: 'PProfile' }} />
        </Tabs>
    )
}

export default _layout