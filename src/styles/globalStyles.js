import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');

export const globalStyles = StyleSheet.create({

    radioContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    cover: {
        width: '100%',
        height: win.width / 1.3,
        // borderRadius: 10,
        borderColor: '#000',
        resizeMode: 'contain'
    },
    playButtonContainer: {
        position: 'relative',
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
        fontSize: win.width / 25,
        color: '#000',
    },
    metaData: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: '98%',
        left: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5,
        position: 'absolute',
        bottom: 0,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
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