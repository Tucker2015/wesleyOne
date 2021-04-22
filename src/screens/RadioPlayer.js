import React, { useState, useEffect, useCallback } from 'react'
import { globalStyles } from '../styles/globalStyles';
import { SafeAreaView, Text, TouchableOpacity, Image, View, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TrackPlayer, { STATE_BUFFERING, usePlaybackState } from 'react-native-track-player';
import VolumeSlider from '../components/VolumeSlider';
import TextTicker from 'react-native-text-ticker'
import AirPlayButton from 'react-native-airplay-button';

export default function RadioPlayer() {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const playbackState = usePlaybackState();
    const [artistName, setArtistName] = useState('WesleyOne');
    const [trackName, setTrackName] = useState('Methodist Worship & Music');
    const [albumCover, setAlbumCover] = useState('');

    useEffect(() => {
        fetch('https://json.kevtucker.com/wesley')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

        setup();
        getCurrentTrackData();
    }, [getCurrentTrackData]);

    const getCurrentTrackData = useCallback(() => {


        TrackPlayer.addEventListener('playback-metadata-received', async (e) => {
            let [artist, title] = [e.artist, e.title];
            console.log(e.title)
            if (e.artist == null || e.title == null) {
                if (Platform.OS === 'android') {
                    [artist, title] = e.title.split('~');
                    updateTrackPlayer(artist, title);
                }
                if (Platform.OS === 'ios') {
                    [artist, title] = e.title.split('~');
                    updateTrackPlayer(artist, title);
                } else {
                    setAlbumCover('');
                }
                setTrackName(title == null ? 'Methodist Worship & Music' : title);
                setArtistName(artist == null ? 'WesleyOne' : artist);
                TrackPlayer.updateMetadataForTrack('1111', {
                    title: title == null ? 'Methodist Worship & Music' : title,
                    artist: artist == null ? 'WesleyOne' : artist,
                    artwork: 'https://ktinternet.net/radio-logos/wesley_one.jpg',
                });
                return;
            }
            setTrackName(title);
            setArtistName(artist);
            updateTrackPlayer(artist, title);
        });
    }, []);
    const updateTrackPlayer = (artist, track) => {
        fetch(`https://itunes.apple.com/search?term=?${artist}+${track}&limit=2`)
            .then((res) => res.json())
            .then((body) => {
                // console.log(body);
                //checking if we parsed invalid artist and track, if so I set album cover to "" so you will se default one and I return so other part of the code won't run
                if (body.error != null) {
                    setAlbumCover('');
                    //I assume track never changes that's why a hardcoded the id
                    TrackPlayer.updateMetadataForTrack('1111', {
                        title: track,
                        artist: artist,
                        artwork: 'https://ktinternet.net/radio-logos/wesley_one.jpg',
                    });
                    return;
                }
                const img = body.results[0]['artworkUrl100'].replace(
                    '100x100',
                    '600x600',
                );
                //I set the image using useState
                setAlbumCover(img);
                //I assume track never changes that's why a hardcoded the id
                TrackPlayer.updateMetadataForTrack('1111', {
                    title: track,
                    artist: artist,
                    artwork:
                        img === ''
                            ? 'https://ktinternet.net/radio-logos/wesley_one.jpg'
                            : img,
                });
            })
            .catch((error) => {
                setAlbumCover('');
                TrackPlayer.updateMetadataForTrack('1111', {
                    title: track,
                    artist: artist,
                    artwork: 'https://ktinternet.net/radio-logos/wesley_one.jpg',
                });
                // console.log('error log', error);
            });
    };
    async function setup() {
        await TrackPlayer.setupPlayer({
            waitForBuffer: true,
        });
        await TrackPlayer.updateOptions({
            stopWithApp: true,
            alwaysPauseOnInterruption: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
            ],
        });
    }
    async function togglePlayback() {
        const currentTrack = await TrackPlayer.getCurrentTrack();

        if (currentTrack == null) {
            await TrackPlayer.setupPlayer().then(async () => {
                TrackPlayer.add({
                    id: '1111',
                    url: data.url,
                    artist: '',
                    title: 'Methodist Worship & Music',
                    artwork: data.img,
                });
            });
            await TrackPlayer.play();
        } else {
            if (playbackState === TrackPlayer.STATE_PAUSED) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }

    // Play Button
    var playButton = 'play';
    if (

        playbackState === TrackPlayer.STATE_PLAYING ||
        playbackState === TrackPlayer.STATE_BUFFERING
    ) {
        playButton = 'pause';
    }

    return (
        <SafeAreaView style={globalStyles.radioContainer}>
            <StatusBar barStyle="dark-content" />

            <Image source={albumCover === '' ? { uri: data.img } : { uri: albumCover }}
                style={globalStyles.cover} />

            <View
                style={{ position: 'absolute', bottom: 80 }}>

                <VolumeSlider />
            </View>
            <View style={globalStyles.playContainer}>
                <TouchableOpacity
                    style={globalStyles.playButtonContainer}
                    onPress={() => {
                        togglePlayback();
                    }}>
                    <Icon
                        name={playButton}
                        size={15}
                        color="#000"
                    />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <TextTicker
                        style={{ fontSize: 16, color: '#fff' }}
                        duration={8000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={2000}>
                        {artistName}
                    </TextTicker>
                    <TextTicker
                        style={{ fontSize: 16, color: '#fff' }}
                        duration={8000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={2000}>
                        {trackName}
                    </TextTicker>
                </View>
                <View>
                    <TouchableOpacity>
                        {Platform.OS === 'ios' && (
                            <AirPlayButton
                                activeTintColor="blue"
                                tintColor="white"
                                style={{ width: 40, height: 40 }}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}


