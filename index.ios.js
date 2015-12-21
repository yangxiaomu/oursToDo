/**
 * oursToDo
 * https://github.com/yangxiaomu/oursToDo.git
 */

'use strict';
var React = require('react-native');
var login = require('./ios_views/login/login.ios');

var {
  AppRegistry,
  StyleSheet,
  View,
} = React;

var oursToDo = React.createClass({
  
  render: function() {
    return (
      <NavigatorIOS style={styles.wrapper}
        navigationBarHidden={true}
        initialRoute={{
          component: login,
          title: 'login',
          //passProps: { myProp: 'foo' },
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  }
});

AppRegistry.registerComponent('oursToDo', () => oursToDo);
