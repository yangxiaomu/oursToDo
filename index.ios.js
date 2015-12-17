/**
 * oursToDo
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var Navigation = require('./ios_views/common/navigation');
var GroupToDo = require('./ios_views/group/todo_group_list');
var Summary = require('./ios_views/summary/sum_group_list');

var Icon = require("react-native-vector-icons/FontAwesome");

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Navigator,
  ScrollView,
  StatusBarIOS
} = React;

StatusBarIOS.setHidden(true);
var oursToDo = React.createClass({

  getInitialState: function(){
    return {
      selectedTab: 'GroupToDo'
    };
  },
  render: function() {
    return (
      <TabBarIOS>

        <Icon.TabBarItem
          title=""
          iconName="dribbble"
          selectedIconName="dribbble"
          selected={this.state.selectedTab === "GroupToDo"}
          onPress={() => {
            this.setState({
              selectedTab: 'GroupToDo'
            });
          }}>
          <Navigation component={GroupToDo}/>
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title=""
          iconName="lightbulb-o"
          selectedIconName="lightbulb-o"
          selected={this.state.selectedTab === 'Summary'}
          onPress={() => {
            this.setState({
              selectedTab: 'Summary'
            });
          }}>          
          <Navigation component={Summary}/>
        </Icon.TabBarItem>
        
      </TabBarIOS>

    );
  }
});

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('oursToDo', () => oursToDo);
