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
  Navigator
} = React;

var oursToDo = React.createClass({
  
  render: function() {
    return (
      
      <Navigator
          initialRoute={{ name: login, component: login }}
          configureScene={() => {
            return Navigator.SceneConfigs.VerticalDownSwipeJump;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            if(route.component) {
              return <Component {...route.params} navigator={navigator} />
            }
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
