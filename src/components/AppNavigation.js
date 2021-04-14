import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RadioPlayer, FacebookScreen, AboutUs, WebsitePage, InstagramPage } from '../screens';
class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello</Text>
            </View>
        );
    }
}
class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile Screen</Text>
            </View>
        );
    }
}
class ImageScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Image Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});


const TabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: RadioPlayer,
            navigationOptions: {
                tabBarLabel: 'Radio',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={20} name={'headphones'} />
                    </View>),
            }
        },
        Facebook: {
            screen: FacebookScreen,
            navigationOptions: {
                tabBarLabel: 'Facebook',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={20} name={'facebook-square'} />
                    </View>),
            }
        },
        Instagram: {
            screen: InstagramPage,
            navigationOptions: {
                tabBarLabel: 'Instagram',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={20} name={'instagram-square'} />
                    </View>),
            }
        },
        Website: {
            screen: WebsitePage,
            navigationOptions: {
                tabBarLabel: 'Website',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={20} name={'globe-americas'} />
                    </View>),
            }
        },
        About: {
            screen: AboutUs,
            navigationOptions: {
                tabBarLabel: 'About',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={20} name={'info'} />
                    </View>),
            }
        },
    },
    {
        initialRouteName: "Home",
        activeColor: '#0099ef',
        inactiveColor: '#343a33',
        barStyle: { backgroundColor: '#ffffff' },
    },
);

export default createAppContainer(TabNavigator);