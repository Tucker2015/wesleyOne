import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import WebView from 'react-native-webview';

export default class FacebookScreen extends Component {
    state = {};

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#fff' }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', height: '100%', width: '100%'
                }}>

                    <WebView
                        source={{ uri: 'https://m.facebook.com/WesleyOne-102242625320826' }}
                        startInLoadingState={true}
                    />

                </View>
            </SafeAreaView>
        );
    }
}