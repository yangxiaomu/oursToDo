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
  AlertIOS,
  AsyncStorage,
  ActionSheetIOS
} = React;

StatusBarIOS.setHidden(true);
var home = React.createClass({
  getInitialState: function(){
    //AlertIOS.alert(this.prop.user_code)    
    return {
      selectedTab: oursToDo
    };
  },
  componentWillMount: function() {
    Icon.getImageSource('share-square-o', 12)
      .then((source) => {
        this.setState({ shareIcon: source })
      });
  },

  componentDidMount: function() {
    AsyncStorage.getItem("user_code").then((value) => {
      this.setState({
        user_code: value.toLowerCase()
      })
    }).done();
  },

  onRightButtonPress: function() {
    AlertIOS.alert("すみません、グループ追加機能がまだですよ！Sm@rtDBで追加お願いします。");
  },
  onShareButtonPress: function() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'https://code.facebook.com',
      message: 'message to go with the shared url',
      subject: 'a subject to go in the email heading',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    },
    (error) => {
      console.error(error);
    },
    (success, method) => {
      var text;
      if (success) {
        text = `Shared via ${method}`;
      } else {
        text = 'You didn\'t share';
      }
      this.setState({text});
    });
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
              user_code: this.state.user_code},
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
              user_code: this.state.user_code},
              rightButtonIcon: this.state.shareIcon,
              onRightButtonPress: this.onShareButtonPress
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
          iconSize={11}
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
          iconSize={11}
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


