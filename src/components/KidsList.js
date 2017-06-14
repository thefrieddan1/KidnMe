import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { kidsFetch } from '../actions';
import ListItem from './ListItem';
import { CardSection } from './common';

class KidsList extends Component {
  componentWillMount() {
    this.props.kidsFetch();
    this.createBabyDataSource(this.props);
    this.createPaototDataSource(this.props);
    this.createBogrimDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createBabyDataSource(nextProps);
    this.createPaototDataSource(nextProps);
    this.createBogrimDataSource(nextProps);
  }

  createBabyDataSource({ babies }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.babyDataSource = ds.cloneWithRows(babies);
  }

  createPaototDataSource({ paotot }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.paototDataSource = ds.cloneWithRows(paotot);
  }

  createBogrimDataSource({ bogrim }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.bogrimDataSource = ds.cloneWithRows(bogrim);
  }

  renderRow(baby) {
    return <ListItem baby={baby} />;
  }

  render() {
    return (
      <ScrollView>
        <CardSection>
        <Text>
          Babies
        </Text>
        <ListView
          enableEmptySections
          dataSource={this.babyDataSource}
          renderRow={this.renderRow}
        />
      </CardSection>
      <CardSection>
        <Text>
          Paotot
        </Text>
        <ListView
          enableEmptySections
          dataSource={this.paototDataSource}
          renderRow={this.renderRow}
        />
      </CardSection>
      <CardSection>
        <Text>
          Bogrim
        </Text>
        <ListView
          enableEmptySections
          dataSource={this.bogrimDataSource}
          renderRow={this.renderRow}
        />
      </CardSection>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const babies = _.map(state.kids.babies, (val, uid) => {
    return { ...val, uid };
  });
  const paotot = _.map(state.kids.paotot, (val, uid) => {
    return { ...val, uid };
  });
  const bogrim = _.map(state.kids.bogrim, (val, uid) => {
    return { ...val, uid };
  });

  return { babies, paotot, bogrim };
};

export default connect(mapStateToProps, { kidsFetch })(KidsList);
