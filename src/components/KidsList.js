import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, TextInput, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { kidFetch, kidsFetch } from '../actions';
import ListItem from './ListItem';
import { SectionHeader } from './common';

class KidsList extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        getSectionData,
        getRowData
    });
    this.state = {
      dataSource: this.createDataSource(this.props)
    };
  }

  componentWillMount() {
    const id = this.props.data;
    // id is not null when parent log in.
    if (id) {
      this.props.kidFetch(id);
    } else {
      this.props.kidsFetch();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setDataSource(nextProps);
  }

  setDataSource({ babies }) {
    const { dataBlob, sectionIds, rowIds } = this.formatData(babies);
    this.setState({ dataSource: this.ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds) });
  }

  createDataSource({ babies }) {
    const { dataBlob, sectionIds, rowIds } = this.formatData(babies);
    return this.ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds);
  }

  /*
  * formating the data
  * for HeaderSection with sticky headers according to groups
  */
  formatData(babies) {
    const groups = _.uniqBy(_.map(babies, 'group'));
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

  renderSearchHeader({ babies }) {
    return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={(text) => {
          const rows = [];
          rows.babies = [];
          for (let i = 0; i < babies.length; i++) {
            const firstName = babies[i].name.toLowerCase();
            const lastName = babies[i].lastName.toLowerCase();
            if (firstName.search(text.toLowerCase()) !== -1 ||
                lastName.search(text.toLowerCase()) !== -1) {
              rows.babies.push(babies[i]);
            }
          }
          this.setDataSource(rows);
        }}
      />
    </View>
  );
}

  render() {
    return (
        <ListView
          style={styles.container}
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderHeader={() => this.renderSearchHeader(this.props)}
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
  searchContainer: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  }
});

const mapStateToProps = state => {
  const id = state.id;
  const babies = _.map(state.kids, (val, uid) => {
    return { ...val, uid };
  });
  return { babies, id };
};

export default connect(mapStateToProps, { kidsFetch, kidFetch })(KidsList);
