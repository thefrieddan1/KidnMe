import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class KidsList extends Component {
  render() {
    return (
      <Text>
        Hi
      </Text>
    );
  }
}

export default connect()(KidsList);
