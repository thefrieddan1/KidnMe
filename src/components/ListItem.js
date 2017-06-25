import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import TimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { poopTimeSave, wokeUpTimeSave, eatTimeSave } from '../actions';

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
  }

  onWakeUpPressed() {
    this.setState({ isWakeUp: true });
    this.showDateTimePicker();
  }

  onEatPress() {
    this.setState({ isEat: true });
    this.showDateTimePicker();
  }

   hideDateTimePicker() {
      this.setState({ isTimePickerVisible: false });
      this.setState({ isPoop: false });
      this.setState({ isWakeUp: false });
      this.setState({ isEat: false });
  }

   handleTimePicked(time) {
     const d = new Date(time);
     let hours = d.getHours();
     if (hours < 10) {
       hours = `0${hours}`;
     }
     let minutes = d.getMinutes();
     if (minutes < 10) {
       minutes = `0${minutes}`;
     }
     const newTime = `${hours}:${minutes}`;
     if (this.state.isPoop) {
       console.log('poop time has been picked: ', newTime);
       this.props.poopTimeSave(newTime, this.props.baby.uid);
     } else if (this.state.isEat) {
       console.log('eat time has been picked: ', newTime);
       this.props.eatTimeSave(newTime, this.props.baby.uid);
     } else if (this.state.isWakeUp) {
       console.log('wokeUp time has been picked: ', newTime);
       this.props.wokeUpTimeSave(newTime, this.props.baby.uid);
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
      <View style={styles.container}>
        <Image
        style={styles.imageStyle}
        source={{ uri: img }}
        />
        <Text style={styles.titleStyle}>
          {name} {lastName}
        </Text>
        <Icon.Button
          style={styles.buttonIcon}
          onPress={this.onWakeUpPressed.bind(this)}
          name="food-fork-drink"
          size={20}
          backgroundColor="white"
          color="#3A8EDB"
        >
          <Text style={styles.detailStyle}>{wokeUp}</Text>
        </Icon.Button>
        <Icon.Button
          style={styles.buttonIcon}
          onPress={this.onEatPress.bind(this)}
          name="sleep"
          size={20}
          backgroundColor="white"
          color="gold"
        >
          <Text style={styles.detailStyle}>{eat}</Text>
        </Icon.Button>
        <Icon.Button
          style={styles.buttonIcon}
          onPress={this.onPoopPress.bind(this)}
          name="emoticon-poop"
          size={20}
          backgroundColor="white"
          color="brown"
        >
          <Text style={styles.detailStyle}>{poop}</Text>
        </Icon.Button>
        <TimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleTimePicked.bind(this)}
          onCancel={this.hideDateTimePicker.bind(this)}
          mode='time'
        />
      </View>
    );
 }
}

const styles = {
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonIcon: {
    marginLeft: 3,
    paddingLeft: 6
  },
  detail: {
    fontSize: 10,
  },
  titleStyle: {
    marginLeft: 6,
    fontSize: 16,
    paddingLeft: 15
  },
  imageStyle: {
    height: 35,
    width: 35,
    borderRadius: 20
  },
};

const mapStateToProps = (state) => {
  const { wokeUp, poop, eat } = state.kids;
  return { wokeUp, poop, eat };
};

export default connect(mapStateToProps, {
  poopTimeSave, eatTimeSave, wokeUpTimeSave
})(ListItem);
