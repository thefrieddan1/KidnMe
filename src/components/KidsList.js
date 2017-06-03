import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { kidsFetch } from '../actions';
import ListItem from './ListItem';

class KidsList extends Component {
  componentWillMount() {
    this.props.kidsFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ kids }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(kids);
  }

  renderRow(kid) {
    return <ListItem kid={kid} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const kids = _.map(state.kids, (val) => {
    return { val };
  });
  return { kids };
};

export default connect(mapStateToProps, { kidsFetch })(KidsList);
