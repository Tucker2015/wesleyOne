import React, { useCallback } from 'react'
import { View, Text, SafeAreaView, Image, Linking, Button } from 'react-native'
import { globalStyles } from '../styles/globalStyles';


class Anchor extends React.Component {
    _handlePress = () => {
        console.log("Link clicked for " + this.props.href);
        Linking.openURL(this.props.href);
        this.props.onPress && this.props.onPress();
    };

    render() {
        return (
            <Button title={this.props.title} onPress={this._handlePress} />
        );
    }
}

export default function AboutUs() {
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <View >
                <Image source={require('../assets/wesleyOne_logo.jpg')}
                    style={globalStyles.aboutUsLogo} />
                <Text style={globalStyles.aboutUsHeader}>"Sharing the United Methodist Connexion Through Internet Radio"</Text>
                <Text style={globalStyles.aboutUsHeader}>What Is WesleyOne.faith all about ?{"\n"}{"\n"}</Text>
                <Text style={{ fontWeight: '400', textAlign: 'justify', fontSize: 16 }}> WesleyOne Internet Radio is a live Broadcast Ministry.{"\n"}{"\n"}
                Our Ministry Offers:{"\n"}
                    {"\n"}A United Methodist Centric listening experience
                {"\n"}A contemporary Christian music format
                {"\n"}Up to date United Methodist News
                {"\n"}Inspiring interviews and stories
                {"\n"}Messages from conference leaders
                {"\n"}Devotions & messages from pastors</Text>

            </View>
            <View>
                <Anchor href="tel:(540)236-8275" title="Call Us" />
                <Anchor href="mailto:wesleyone@wesleyone.faith?subject=Contact from App" title="Email Us" />
            </View>

        </SafeAreaView>
    )
}
