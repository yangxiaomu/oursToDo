/**
 * 新增todo
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var Header = require('./../common/header');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <View>
      <Header
        navigator={this.props.navigator}
        initObj={{
            backName: '组织',
            title: ''
      }}/>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          新增todo!
        </Text>
      </View>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
