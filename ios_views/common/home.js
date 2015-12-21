/**
 * oursToDo
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var Navigation = require('./navigation');
var GroupToDo = require('./../group/todo_group_list');
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
      selectedTab: GroupToDo
    };
  },

  onRightButtonPress: function() {
    this.refs.nav.push({
      title: 'addGroup',
      component: addGroup
    })
  },

  _renderContent: function(category: string, title: ?string) {
    if (title == "GroupToDo") {
      return (
        <NavigatorIOS style={styles.wrapper}
          ref="nav"
          tintColor='#DA552F'
          barTintColor='#FFFFFD'
          titleTextColor='#DA552F'
          initialRoute={{
            component: this.state.selectedTab,
            title: title,
            passProps: {filter: category},
            rightButtonTitle: "➕",
            onRightButtonPress: this.onRightButtonPress
          }}
        />
      );
    } else {
      return (
        <NavigatorIOS style={styles.wrapper}
          initialRoute={{
            component: this.state.selectedTab,
            title: title,
            passProps: {filter: category}
          }}
        />
      );
    }
  },

  render: function() {
    return (
      <TabBarIOS tintColor={"#ea4c89"}>

        <Icon.TabBarItem
          title="todo列表"
          iconName="dribbble"
          selectedIconName="dribbble"
          selected={this.state.selectedTab == GroupToDo}
          onPress={() => {
            this.setState({
              selectedTab: GroupToDo
            });
          }}>
          {this._renderContent("GroupToDo", "GroupToDo")}

        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="统计"
          iconName="lightbulb-o"
          selectedIconName="lightbulb-o"
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


