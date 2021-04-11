import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from '@react-native-community/slider';
import SystemSetting from 'react-native-system-setting';


export default class VolumeSlider extends Component {
  isAndroid = Platform.OS === 'android';

  volumeListener = null;


  volTypes = ['music'];
  volIndex = 0;

  constructor(props) {
    super(props);
    this.state = {
      volume: 4,
      volType: this.volTypes[this.volIndex],
    };
  }

  async componentDidMount() {
    this.setState({
      volume: await SystemSetting.getVolume(this.state.volType),
    });
    // just init slider value directly
    this._changeSliderNativeVol(this.sliderVol, this.state.volume);

    this.volumeListener = SystemSetting.addVolumeListener(data => {
      const volume = this.isAndroid ? data[this.state.volType] : data.value;
      this._changeSliderNativeVol(this.sliderVol, volume);
      this.setState({
        volume: volume,
      });
    });
  }

  _changeSliderNativeVol(slider, value) {
    slider.setNativeProps({
      value: value,
    });
  }

  componentWillUnmount() {
    SystemSetting.removeListener(this.volumeListener);
  }

  _changeVol(value) {
    SystemSetting.setVolume(value, {
      type: this.state.volType,
      playSound: false,
      showUI: false,
    });
    this.setState({
      volume: value,
    });
  }

  _changeVolType = async () => {
    this.volIndex = ++this.volIndex % this.volTypes.length;
    const volType = this.volTypes[this.volIndex];
    const vol = await SystemSetting.getVolume(volType);
    this._changeSliderNativeVol(this.sliderVol, vol);
    this.setState({
      volType: volType,
      volume: vol,
    });
  };

  render() {
    const { volume } = this.state;
    return (
      <View style={styles.container}>
        <ValueView
          btn={
            this.isAndroid && {
              onPress: this._changeVolType,
            }
          }
          changeVal={val => this._changeVol(val)}
          refFunc={sliderVol => (this.sliderVol = sliderVol)}
        />
      </View>
    );
  }
}

const ValueView = props => {
  const { changeVal, refFunc } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FontAwesome5Icon
        name="volume-mute"
        size={25}
        color="#000"

      />
      <Slider
        ref={refFunc}
        style={styles.volumeSlider}
        onValueChange={changeVal}
      />
      <FontAwesome5Icon
        name="volume-up"
        size={25}
        color="#000"

      />
    </View>
  );
};

const styles = StyleSheet.create({
  volumeSlider: {
    alignSelf: 'center',
    alignContent: 'center',
    width: '75%',
  },

});
