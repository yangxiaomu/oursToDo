/**
 * 统计详细
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
  Image,
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
        <View>
          <View>
            <Text style={styles.welcome}>
              统计画面!
            </Text>
          </View>
          <View>
            <Image
              source={require('./../../img/summary_demo.jpg')}
              style={styles.summary_demo}
            />
          </View>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  summary_demo : {
    width: 200,
    height: 200,
  },
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
