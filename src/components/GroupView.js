import _ from 'lodash';
import React, { Component } from 'react';
import { Text, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { groupFetch } from '../actions';

class GroupView extends Component {

  constructor(props) {
    super(props);
    this.props.groupFetch();
    const groups = _.uniqBy(_.map(this.props.babies, 'group'));

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: this.ds.cloneWithRows(groups)
    };
  }

  renderRow(item) {
    return <Text>{item}</Text>;
  }

  render() {
    return (
      <ListView
        style={styles.container}
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  const babies = _.map(state.kids, (val, uid) => {
    return { ...val, uid };
  });
  return { babies };
};

export default connect(mapStateToProps, { groupFetch })(GroupView);
