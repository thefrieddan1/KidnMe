import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import firebase from 'firebase';
import { CardSection } from './common';

class ListItem extends Component {
  render() {
    const { name, last_name, woke_up, image } = this.props.baby;
    const img = image || `https://firebasestorage.googleapis.com/v0/b/kidnme-d36d6.appspot.com/o/Images%2Fdefault.png?alt=media&token=1ffda325-d7dd-4b2d-bbdc-d21529e8603b`;
    return (
      <View>
        <Text style={styles.titleStyle}>
          {name} {last_name}
        </Text>
        <Text>
          {woke_up}
        </Text>
        <Image
        style={styles.imageStyle}
        source={{ uri: img }}
        resizeMode='contain'
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
