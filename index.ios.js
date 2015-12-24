/**
 * oursToDo
 * https://github.com/yangxiaomu/oursToDo.git
 */

'use strict';
var React = require('react-native');
var login = require('./ios_views/login/login.ios');

//for test by yt delete the code before commit 
var home = require('./ios_views/common/home');
var addTodo = require('./ios_views/group/add_todo');
var debug = 1;

var {
  AppRegistry,
  StyleSheet,
  View,
  Navigator
} = React;

var oursToDo = React.createClass({
  
  render: function() {
    var firstComponent;
    if (debug) {
      firstComponent=home;
    } else {
      firstComponent=login;
    }
    return (
      
      <Navigator
          initialRoute={{ name: login, component: firstComponent }}
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
