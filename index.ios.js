/**
 * oursToDo
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var Navigation = require('./ios_views/common/navigation');
var GroupToDo = require('./ios_views/group/group_list');
var Summary = require('./ios_views/summary/sum_list');

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
        <TabBarIOS.Item
          title="todo列表"
          selected={this.state.selectedTab === 'GroupToDo'}
          // icon={require('./img/icon_group_todo.jpg')}
          onPress={() => {
            this.setState({
              selectedTab: 'GroupToDo'
            });
          }}>
          <Navigation component={GroupToDo}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item 
          title="统计"
          selected={this.state.selectedTab === 'Summary'}
          // icon={require('./img/icon_summary.png')}
          onPress={() => {
            this.setState({
              selectedTab: 'Summary'
            });
          }}>          
          <Navigation component={Summary}/>
        </TabBarIOS.Item>
      </TabBarIOS>

    );
  }
});

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('oursToDo', () => oursToDo);
