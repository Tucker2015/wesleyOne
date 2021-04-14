import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class FacebookScreen extends Component<Props, State> {
    state = {};

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#000' }}>
                <StatusBar barStyle="light-content" />
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', height: '100%', width: '100%'
                }}>

                    <WebView
                        source={{ uri: ' https://m.facebook.com/WesleyOne-102242625320826' }}
                        startInLoadingState={true}
                    />

                </View>
            </SafeAreaView>
        );
    }
}