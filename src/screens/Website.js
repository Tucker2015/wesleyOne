import React, { useRef } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { WebView } from 'react-native-webview';

export default function WebsitePage() {
  const webViewRef = useRef(null);

  const goback = () => {
    webViewRef.current.goBack();
  };

  const goforward = () => {
    webViewRef.current.goForward();
  };

  const refresh = () => {
    webViewRef.current.reload();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.navbar}>
        <View style={styles.back}>
          <Ionicons
            name="arrow-back-outline"
            size={25}
            color="white"
            onPress={goback}
          />
        </View>
        <View style={styles.forward}>
          <Ionicons
            name="arrow-forward-outline"
            size={25}
            color="white"
            onPress={goforward}
          />
        </View>
        <View style={styles.forward}>
          <Ionicons
            name="refresh-outline"
            size={25}
            color="white"
            onPress={refresh}
          />
        </View>
      </View>

      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        source={{ uri: ' http://www.wesleyone.faith' }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            color="black"
            size="large"
            style={styles.activity}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  navbar: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 5,
    backgroundColor: '#000',
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  back: {
    width: 50,
    height: 50,
  },
  forward: {
    width: 50,
    height: 50,
  },
});
