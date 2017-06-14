import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import TimePicker from 'react-native-modal-datetime-picker';
import { Button } from './common';

class ListItem extends Component {

  state = {
      isTimePickerVisible: false,
      isPoop: false,
      isWakeUp: false,
      isEat: false,
  }

  onPoopPress() {
    this.setState({ isPoop: true });
    this.showDateTimePicker();
    console.log('in poop button');
  }

  onWakeUpPressed() {
    this.setState({ isWakeUp: true });
    this.showDateTimePicker();
    console.log('in wake up button');
  }

  onEatPress() {
    this.setState({ isEat: true });
    this.showDateTimePicker();
    console.log('in eat button');
  }

   hideDateTimePicker() {
      this.setState({ isTimePickerVisible: false });
      this.setState({ isPoop: false });
      this.setState({ isWakeUp: false });
      this.setState({ isEat: false });
  }

   handleDatePicked(time) {
     if (this.state.isPoop) {
       console.log('A poop time has been picked: ', time);
     } else if (this.state.isEat) {
       console.log('eat time has been picked: ', time);
     } else if (this.state.isWakeUp) {
       console.log('sleep time has been picked: ', time);
     }
     this.hideDateTimePicker();
   }

   showDateTimePicker() {
     this.setState({ isTimePickerVisible: true });
   }


  render() {
    const { name, lastName, wokeUp, image, poop, eat } = this.props.baby;
    const img = image || 'https://firebasestorage.googleapis.com/v0/b/kidnme-d36d6.appspot.com/o/Images%2Fdefault.png?alt=media&token=1ffda325-d7dd-4b2d-bbdc-d21529e8603b';
    return (
      <View>
        <Image
        style={styles.imageStyle}
        source={{ uri: img }}
        resizeMode='contain'
        />
        <Text style={styles.titleStyle}>
          name: {name} {lastName}
        </Text>
        <Button onPress={this.onWakeUpPressed.bind(this)}>
          woke up at: {wokeUp}
        </Button>
        <Button onPress={this.onEatPress.bind(this)}>
          eat at: {eat}
        </Button>
        <Button onPress={this.onPoopPress.bind(this)}>
          poop at: {poop}
        </Button>
        <TimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleDatePicked.bind(this)}
          onCancel={this.hideDateTimePicker.bind(this)}
          mode='time'
        />
      </View>
    );
 }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  imageStyle: {
    height: 75,
    flex: 1,
    width: 75
  }
};

export default ListItem;
