import React, { useState, useEffect, useCallback } from 'react'
import { globalStyles } from '../styles/globalStyles';
import { SafeAreaView, Text, TouchableOpacity, Image, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

export default function RadioPlayer() {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const playbackState = usePlaybackState();
    const [trackName, setTrackName] = useState('WesleyOne');
    const [artistName, setArtistName] = useState('70s Disco Nights');
    const [albumCover, setAlbumCover] = useState('');

    useEffect(() => {
        fetch('https://json.kevtucker.com/wesley')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        console.log(data)
        setup();
        getCurrentTrackData();
    }, [getCurrentTrackData]);

    const getCurrentTrackData = useCallback(() => {
        TrackPlayer.addEventListener('playback-metadata-received', async (e) => {
            let [artist, title] = [e.artist, e.title];
            if (e.artist == null || e.title == null) {
                if (Platform.OS === 'ios') {
                    [artist, title] = e.title.split(' - ');
                    updateTrackPlayer(artist, title);
                } else {
                    setAlbumCover('');
                }
                setTrackName(title == null ? '70s Disco Nights' : title);
                setArtistName(artist == null ? 'Digital Retroland' : artist);
                TrackPlayer.updateMetadataForTrack('1111', {
                    title: title == null ? '70s Disco Nights' : title,
                    artist: artist == null ? 'Digital Retroland' : artist,
                    artwork: 'https://ktinternet.net/radio-logos/retroland.png',
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
                console.log(body);
                //checking if we parsed invalid artist and track, if so I set album cover to "" so you will se default one and I return so other part of the code won't run
                if (body.error != null) {
                    setAlbumCover('');
                    //I assume track never changes that's why a hardcoded the id
                    TrackPlayer.updateMetadataForTrack('1111', {
                        title: track,
                        artist: artist,
                        artwork: 'https://ktinternet.net/radio-logos/retroland.png',
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
                            ? 'https://ktinternet.net/radio-logos/retroland.png'
                            : img,
                });
            })
            .catch((error) => {
                setAlbumCover('');
                TrackPlayer.updateMetadataForTrack('1111', {
                    title: track,
                    artist: artist,
                    artwork: 'https://ktinternet.net/radio-logos/retroland.png',
                });
                console.log('error log', error);
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
            await TrackPlayer.reset();
            await TrackPlayer.setupPlayer().then(async () => {
                TrackPlayer.add({
                    id: '1111',
                    url: 'https://panel.retrolandigital.com:8170/app',
                    artist: 'Digital Retroland',
                    title: '70s Disco Nights',
                    artwork: 'https://ktinternet.net/radio-logos/retroland.png',
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
        <SafeAreaView style={globalStyles.container}>
            <Image source={{ uri: data.img }}
                style={globalStyles.cover} />
            <TouchableOpacity
                style={globalStyles.playButtonContainer}
                onPress={togglePlayback}>
                <Icon
                    name={playButton}
                    size={15}
                    color="#000"
                />
            </TouchableOpacity>
            <View >
                <Text
                    adjustsFontSizeToFit={false}
                    numberOfLines={3}
                    style={globalStyles.metaText}>
                    {artistName}
                </Text>
                <Text
                    adjustsFontSizeToFit={false}
                    numberOfLines={3}
                    style={globalStyles.metaText}>
                    {trackName}
                </Text>
            </View>
        </SafeAreaView>
    )
}


