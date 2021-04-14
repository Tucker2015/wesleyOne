import React, { useCallback } from 'react'
import { View, SafeAreaView, Image, Linking, ScrollView } from 'react-native'
import { globalStyles } from '../styles/globalStyles';
import { Button, Title, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5';

class Anchor extends React.Component {
    _handlePress = () => {
        console.log("Link clicked for " + this.props.href);
        Linking.openURL(this.props.href);
        this.props.onPress && this.props.onPress();
    };

    render() {
        return (
            <Button style={{ width: 200, margin: 5 }} mode="contained" onPress={this._handlePress} color={this.props.color}>
                <Icon name={this.props.icon} size={this.props.size} /> <Text> {this.props.title}</Text>
            </Button>

        );
    }
}

export default function AboutUs() {
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <ScrollView>
                <Image source={require('../assets/wesleyOne_logo.jpg')}
                    style={globalStyles.aboutUsLogo} />
                <Text style={globalStyles.aboutUsHeader}>"Sharing the United Methodist Connexion Through Internet Radio"</Text>
                <Text style={globalStyles.aboutUsHeader}>What Is WesleyOne.faith all about ?</Text>
                <Text style={{ fontWeight: '400', textAlign: 'center', fontSize: 14, padding: 10 }}> WesleyOne Internet Radio is a live Broadcast Ministry.</Text>
                <Title style={globalStyles.aboutUsHeader}>Our Ministry Offers:</Title>
                <Text style={{ fontWeight: '400', textAlign: 'left', fontSize: 14, padding: 10 }}>
                    • A United Methodist Centric listening experience
                {"\n"}• A contemporary Christian music format
                {"\n"}• Up to date United Methodist News
                {"\n"}• Inspiring interviews and stories
                {"\n"}• Messages from conference leaders
                {"\n"}• Devotions & messages from pastors
</Text>
                <View style={globalStyles.buttonContainer}>
                    <Anchor
                        href="tel:(540)236-8275"
                        title="Call Us"
                        icon="phone"
                        size={20}
                        color="#99ffcc" />
                    <Anchor
                        href="mailto:wesleyone@wesleyone.faith?subject=Contact from App"
                        title="Email Us"
                        icon="envelope"
                        size={20}
                        color="#99ffcc" />
                </View>

            </ScrollView>


        </SafeAreaView>
    )
}
