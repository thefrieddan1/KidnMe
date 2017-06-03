import React, { Component } from 'react';
import { Text } from 'react-native';

class ListItem extends Component {

  render() {
    return (
      <Text style={styles.titleStyle}>
        {this.props.kid.val}
      </Text>
    );
 }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListItem;
