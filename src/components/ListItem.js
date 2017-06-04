import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';

class ListItem extends Component {
  render() {
    const { name } = this.props.baby;
    const { last_name } = this.props.baby;
    const { woke_up } = this.props.baby;
    return (
      <CardSection>
        <View>
          <Text style={styles.titleStyle}>
            {name} {last_name}
          </Text>
          <Text>
            {woke_up}
          </Text>
      </View>
    </CardSection>
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
