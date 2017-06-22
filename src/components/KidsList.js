import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { kidFetch, kidsFetch } from '../actions';
import ListItem from './ListItem';
import { SearchHeader, SectionHeader } from './common';

class KidsList extends Component {
  componentWillMount() {
    const id = this.props.data;
    // id is not null when parent log in.
    if (id) {
      this.props.kidFetch(id);
    } else {
      this.props.kidsFetch();
    }
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ babies }) {
    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        getSectionData,
        getRowData
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(babies);
    this.dataSource = ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds);
  }

  /*
  * formating the data
  * for HeaderSection with sticky headers according to groups
  */
  formatData(babies) {
    // now groups is hard coded need to take the groups from the children group
    const groups = 'babies,paotot,bogrim'.split(',');

    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    for (let sectionId = 0; sectionId < groups.length; sectionId++) {
      const currentGroup = groups[sectionId];
      const users = babies.filter((baby) => baby.group === currentGroup);

      if (users.length > 0) {
        sectionIds.push(sectionId);
        dataBlob[sectionId] = { group: currentGroup };
        rowIds.push([]);

        for (let i = 0; i < users.length; i++) {
          const rowId = `${sectionId}:${i}`;
          rowIds[rowIds.length - 1].push(rowId);
          dataBlob[rowId] = users[i];
        }
      }
    }
    return { dataBlob, sectionIds, rowIds };
  }

  renderRow(baby) {
    return <ListItem baby={baby} />;
  }

  render() {
    return (
        <ListView
          style={styles.container}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderHeader={() => <SearchHeader />}
          renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

const mapStateToProps = state => {
  const id = state.id;
  const babies = _.map(state.kids, (val, uid) => {
    return { ...val, uid };
  });
  return { babies, id };
};

export default connect(mapStateToProps, { kidsFetch, kidFetch })(KidsList);
