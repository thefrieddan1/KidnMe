import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionHeader = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.group}</Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#EAEAEA'
  },
  text: {
    fontSize: 13,
  },
});

export { SectionHeader };
