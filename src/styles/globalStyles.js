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
        alignItems: 'center',
    },

    cover: {
        width: '100%',
        height: win.width / 1.6,
        // borderRadius: 10,
        borderColor: '#000',
        resizeMode: 'contain',


    },
    playContainer: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderRadius: 10,
        padding: 5,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        alignContent: 'center',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 3,
        shadowOpacity: 0.75,
        elevation: 5,
    },

    playButtonContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF',
        elevation: 5,
        borderColor: '#444',
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5
    },


    aboutUsLogo: {
        marginTop: 15,
        width: win.width / 1,
        height: win.width / 5,
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