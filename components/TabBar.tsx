import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable, Text } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    const getTabIcon = (routeName: string, isFocused: boolean) => {
        let iconName: keyof typeof Ionicons.glyphMap;
        
        switch (routeName) {
            case 'index':
                iconName = isFocused ? 'home' : 'home-outline';
                break;
            case 'trends':
                iconName = isFocused ? 'trending-up' : 'trending-up-outline';
                break;
            case 'devices':
                iconName = isFocused ? 'hardware-chip' : 'hardware-chip-outline';
                break;
            case 'profile':
                iconName = isFocused ? 'person' : 'person-outline';
                break;
            default:
                iconName = 'ellipse-outline';
        }
        
        return (
            <Ionicons 
                name={iconName} 
                size={20} 
                color="white" 
                style={{ fontWeight: isFocused ? 'bold' : 'normal' }}
            />
        );
    };

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {

                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <PlatformPressable
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}
                    >
                        {getTabIcon(route.name, isFocused)}
                        <Text style={[styles.tabItemText, { fontWeight: isFocused ? 'bold' : 'normal' }]}>
                            {label as string}
                        </Text>
                    </PlatformPressable>
                );
            })}
        </View>
    );
}

export default TabBar;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        width: '85%',
        alignSelf: 'center',
        bottom: 30,
        borderRadius: 20,
        paddingHorizontal: 28,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    tabItem: {
        flexDirection: 'column',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
    },
    tabItemText: {
        paddingHorizontal: 4,
        color: 'white',
        fontSize: 12,
    }
})