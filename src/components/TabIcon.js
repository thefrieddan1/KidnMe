import React, { Component } from 'react';
import { Text } from 'react-native';

class TabIcon extends Component {
    render() {
        return (
            <Text style={{ color: this.props.selected ? 'red' : 'black' }}>{this.props.title}</Text>
        );
    }
}

export default TabIcon;
