/**
 * oursToDo
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var Navigation = require('./navigation');
var oursToDo = require('./../group/todo_group_list');
var Summary = require('./../summary/sum_group_list');
var addGroup = require('./../group/add_group');

var Icon = require("react-native-vector-icons/FontAwesome");


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Navigator,
  ScrollView,
  NavigatorIOS,
  StatusBarIOS,
  AlertIOS
} = React;

StatusBarIOS.setHidden(true);
var home = React.createClass({
  getInitialState: function(){
    //AlertIOS.alert(this.prop.user_code)    
    return {
      selectedTab: oursToDo
    };
  },

  onRightButtonPress: function() {
    AlertIOS.alert("すみません、グループ追加機能がまだですよ！Sm@rtDBで追加お願いします。");
  },

  _renderContent: function(category: string, title: ?string) {
    if (title == "oursToDo") {
      return (
        <NavigatorIOS style={styles.wrapper}
          ref="nav"
          tintColor='#DA552F'
          barTintColor='#FFFFFD'
          titleTextColor='#DA552F'
          initialRoute={{
            component: this.state.selectedTab,
            title: title,
            passProps: {
              filter: category,
              user_code: "b_wang"},
            rightButtonTitle: "➕",
            onRightButtonPress: this.onRightButtonPress
          }}
        />
      );
    } else {
      return (
        <NavigatorIOS style={styles.wrapper}
          ref="nav"
          tintColor='#DA552F'
          barTintColor='#FFFFFD'
          titleTextColor='#DA552F'
          initialRoute={{
            component: this.state.selectedTab,
            title: title,
            passProps: {
              filter: category,
              user_code: "b_wang"}
          }}
        />
      );
    }
  },

  render: function() {
    return (
      <TabBarIOS tintColor={"#ea4c89"}>

        <Icon.TabBarItem
          title="oursToDo"
          iconName="group"
          selectedIconName="group"
          selected={this.state.selectedTab == oursToDo}
          onPress={() => {
            this.setState({
              selectedTab: oursToDo
            });
          }}>
          {this._renderContent("oursToDo", "oursToDo")}

        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="統計"
          iconName="bar-chart"
          selectedIconName="bar-chart"
          selected={this.state.selectedTab == Summary}
          onPress={() => {
            this.setState({
              selectedTab: Summary
            });
          }}>
          {this._renderContent("Summary", "Summary")}
        </Icon.TabBarItem>
        
      </TabBarIOS>

    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  }
});

module.exports = home;


