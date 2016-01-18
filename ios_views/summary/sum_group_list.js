/**
 * 组织列表
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var ReactCharts = require('react-native-charts');
var BarChart = ReactCharts.default.BarChart;
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var commonAPI = require('../common/commonAPI');
var Icon = require("react-native-vector-icons/FontAwesome");
var _ = require('underscore');

var {
  PickerIOS,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  AlertIOS,
  AsyncStorage
} = React;

var PickerItemIOS = PickerIOS.Item;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      loaded: false,
      valueChanged: false
    };
  },

  componentDidMount: function() {

    AsyncStorage.getItem("user_code").then((value) => {
      this.setState({
        user_code: value.toLowerCase()
      });

      this.getGroupList();
      
    }).done();
    
  },

  getGroupList: function() {

    var tempThis = this;

    fetch('http://10.2.8.118/hibiki/rest/1/binders/groups/views/allData/documents?members=' + this.state.user_code, {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': commonAPI.make_base_auth('b_wang', 'b_wang')
      }
    }).then(
      function(response) {
        if (response.status === 401) {
          AlertIOS.alert("Sm＠rtDB認証失敗しまいました！");
        }
        if (response.status === 200) {
          var result = JSON.parse(response._bodyText);
          result = commonAPI.objToArray(result);
          var groups = {};
          _.each(result.document, function(group, index) {
            var group = commonAPI.createGroup(group);
            if(!tempThis.state.index) {
              if(index == 0) {
                tempThis.setState({
                  index: group.group_code
                });
              }
            } 
            
            groups[group.group_code] = {name: group.group_name};
          });
          tempThis.setState({
            groups: groups
          });

          tempThis.getGroupUsers();

        }
      }
    )
    .done();
  },

  getGroupUsers: function() {

    this.setState({
      loaded: false
    })

    var tempThis = this;
    fetch('http://10.2.8.118/hibiki/rest/1/binders/groups/views/allData/documents?group_code=' + this.state.index, {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': commonAPI.make_base_auth('b_wang', 'b_wang')
      }
    }).then(
      function(response) {
        if (response.status === 401) {
          AlertIOS.alert("Sm＠rtDB認証失敗しまいました！");
        }
        if (response.status === 200) {
          var result = JSON.parse(response._bodyText);
          result = commonAPI.objToArray(result);
          var users = [];
          var totalGroups = {};
          _.each(result.document, function(group, index) {
            var group = commonAPI.createGroup(group);

            if(index == 0) {
              totalGroups.group_code = group.group_code;
            }
 
            users.push(group.members);
          });
          totalGroups.users = users;
          
          tempThis.getTaskAPI(totalGroups)
        }
      }
    )
    .done();
  },

  getTaskAPI: function(totalGroups) {
    var tempThis = this;

    fetch('http://10.2.8.118/hibiki/rest/1/binders/tasks/views/allData/documents?task_status=1&group_code=' + totalGroups.group_code + "&sort=finish_date:DESC", {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': commonAPI.make_base_auth('b_wang', 'b_wang')
      }
    }).then(
      function(response) {
        if (response.status === 401) {
          AlertIOS.alert("Sm＠rtDB認証失敗しまいました！");
        }
        if (response.status === 200) {
          var result = JSON.parse(response._bodyText);
          result = commonAPI.objToArray(result);
          var tasks = [];
          _.each(result.document, function(task, index) {
            var task = commonAPI.createTask(task);
            tasks.push(task);
          });

          var memberTasks = [];
          _.each(totalGroups.users, function(user,index) {
            memberTasks[index] = 0;
          });

          _.each(tasks, function(task) {
            _.each(totalGroups.users, function(user, index) {
              if(task.user_code == user) {
                memberTasks[index] ++;
              }
            });
          });

          totalGroups.tasks = memberTasks;

          tempThis.setState({
            loaded: true,
            totalGroups: totalGroups,
            valueChanged: false
          })


        }
      }
    )
    .done();
  },

  render: function() {

    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    if(this.state.valueChanged) {
      this.getGroupUsers();
      return this.renderLoadingView();
    }

    var totalGroups = this.state.totalGroups;

    var colorList = ['green', 'orange', 'blue', 'red', 'grey'];
    var dataList = [];

    _.each(totalGroups.users, function(user,index) {
      console.log(index)
      var dataObj = {};
      dataObj.fillColor = colorList[index];
      dataObj.data = [{value: totalGroups.tasks[index]}];
      dataObj.name = user;
      dataList.push(dataObj);
    });

    var barChart = this.createBarChart(dataList);
    var userNames = this.createUserNames(dataList);

    return (

      <View>
        <PickerIOS
          selectedValue={this.state.index}
          onValueChange={(group) => this.setState({index: group, valueChanged: true})}>
          {Object.keys(this.state.groups).map((group) => (
            <PickerItemIOS
              key={group}
              value={group}
              label={this.state.groups[group].name}
              />
            )
          )}
        </PickerIOS>

        

        {barChart}

        {userNames}

      </View>

    );
  },

  createBarChart: function(dataList) {

    var display = false;
    _.each(dataList, function(data) {
      if(data.data[0].value != 0) {
        display = true;
      }
    });

    if(display) {
      return (

        <BarChart
          dataSets={
            dataList
          }
          graduation={1}
          horizontal={false}
          showGrid={true}
          barSpacing={25}
          style={{
            height: 200,
            marginTop: 40,
          }} />
        
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>
            完了したタスクがありません。
          </Text>
        </View>
      );
    }

    
  },

  createUserNames: function(dataList) {
    var display = false;
    var userString = "";
    _.each(dataList, function(data, index) {
      
      userString += "                  " + data.name;
      
      if(data.data[0].value != 0) {
        display = true;
      }
    });
    if(display) {
      return (
        <Text style={{color: 'blue'}}>
        {userString}
        </Text>
        );
    } else {
      return (
         <Text style={{color: 'blue'}}>
        
        </Text>
        );
    }
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading……
        </Text>
      </View>
    );
  },

});

var styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },

  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  add: {
    fontSize: 20,
    textAlign: 'right',
    margin: 10,
    backgroundColor: 'yellow',
  },
  thumbnail : {
    width: 53,
    height: 53,
  },
});
