import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');

export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    cover: {
        width: win.width / 1.5,
        height: win.width / 1.5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        resizeMode: 'cover'
    },
    playButtonContainer: {
        width: win.width / 10,
        height: win.width / 10,
        backgroundColor: '#FFF',
        elevation: 5,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    metaText: {
        flexWrap: 'wrap',
        flexShrink: 1,
        marginLeft: 10,
        paddingRight: 10,
        fontSize: win.width / 20,
        color: '#000',
    },
    aboutUsLogo: {
        marginTop: 20,
        width: '100%',
        height: 100,
        resizeMode: 'contain',
    },
    aboutUsHeader: {
        margin: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '900',
    },
    aboutUsBody: {
        margin: 10,
        textAlign: 'center',
        fontSize: 14
    },
})