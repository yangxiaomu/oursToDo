/**
 * 组织列表
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var TodoList = require('./todo_list');
var AddToDo = require('./add_todo');
var Icon = require("react-native-vector-icons/FontAwesome");
var commonAPI = require('../common/commonAPI');
var _ = require('underscore');

var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  AlertIOS,
  Navigator,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentWillMount: function() {
    Icon.getImageSource('plus-circle', 20)
      .then((source) => {
        this.setState({ shareIcon: source })
      });
  },

  componentDidMount: function() {
    this.getGroupByAPI();
  },
  
  /**
   * 从smartDB restAPI获取组织列表
   * added by ql_wu
   */
  getGroupByAPI: function() {
    var tempThis = this;

    fetch('http://agc.dreamarts.com.cn/hibiki/rest/1/binders/groups/views/allData/documents?members=' + 'b_wang', {
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
          var groups = [];
          _.each(result.document, function(group, index) {
            var group = commonAPI.createGroup(group);
            group.users = 0;
            group.tasks = 0;
            groups.push(group);
          });

          tempThis.getGroupUsers(groups, tempThis);

        }
      }
    )
    .done();
  },

  getGroupUsers: function(groups, tempThis) {
    fetch('http://agc.dreamarts.com.cn/hibiki/rest/1/binders/groups/views/allData/documents', {
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
          var totalGroups = [];
          _.each(result.document, function(group, index) {
            var group = commonAPI.createGroup(group);
            totalGroups.push(group);
          });

          var tmpGroups = [];
          _.each(groups, function(item) {
            _.each(totalGroups, function(item2) {
              if (item.group_code == item2.group_code) {
                item.users++;
              }
            });
            tmpGroups.push(item);
          });

          tempThis.getGroupTasks(tmpGroups, tempThis);
          
        }
      }
    )
    .done();
  },

  getGroupTasks: function(groups, tempThis) {
    fetch('http://agc.dreamarts.com.cn/hibiki/rest/1/binders/tasks/views/allData/documents', {
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

          var tmpGroups = [];
          _.each(groups, function(item) {
            _.each(tasks, function(item2) {
              if (item.group_code == item2.group_code) {
                item.tasks++;
              }
            });
            tmpGroups.push(item);
          });

          tempThis.setState({
            dataSource: tempThis.state.dataSource.cloneWithRows(tmpGroups),
            loaded: true,
          });
          
        }
      }
    )
    .done();
  },

  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return (
      <View style={styles.listContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderGroup}
          style={styles.listView}
        />
      </View>
    );

  },
  
  /**
   * 数据等待画面
   * added by ql_wu
   */
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading……
        </Text>
      </View>
    );
  },

  /**
   * 跳转：组织下todo list画面
   * added by ql_wu
   */
  todoListPage: function(group_code){
    this.props.navigator.push({
      title: group_code,
      component: TodoList,
      onLeftButtonPress: () => this.props.navigator.pop(),
      rightButtonIcon: this.state.shareIcon,
      onRightButtonPress: () => this.props.navigator.push({
        title: 'NewTodo',
        component: AddToDo,
        leftButtonTitle: 'Cancel',
        onLeftButtonPress: () => this.props.navigator.pop(),
      }),
      passProps: {
        text: 'This page has an icon for the right button in the nav bar',
        id: group_code
      }
    });
  },

  /**
   * 跳转：新增todo画面
   * added by ql_wu
   */
  addToDoPage:function(){
    this.props.navigator.push({
      title: 'AddToDo',
      component: AddToDo,
    });
  },
  
  /**
   * 绘制group
   * added by ql_wu
   */
  renderGroup: function(rowData: string) {
    var rowHash = Math.abs(hashCode(rowData));
    var imageURL = '';
    if (rowData.group_code == "idea") {
      imageURL = require('./../../img/idea.jpg');
    } else if (rowData.group_code == "nhk") {
      imageURL = require('./../../img/nhk.jpg');
    } else if (rowData.group_code == "fuji") {
      imageURL = require('./../../img/fuji.jpg');
    } else if (rowData.group_code == "react_native") {
      imageURL = require('./../../img/react_native.jpg');
    } else if (rowData.group_code == "java") {
      imageURL = require('./../../img/java.jpg');
    } else if (rowData.group_code == "sports") {
      imageURL = require('./../../img/sports.jpg');
    }

    return (
      <TouchableHighlight onPress={() => this.todoListPage(rowData.group_name_short)}>
        <View style={styles.container}>
          <Image style={styles.thumbnail} source={imageURL} />

          <View style={styles.postDetailsContainer}>
            <Text style={styles.postTitle}>
              {rowData.group_name}
            </Text>
            <Text style={styles.postDetailsLine}>
              参加者：{rowData.users}人      タスク数：{rowData.tasks}
            </Text>
          <View style={styles.separator} />
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var styles = StyleSheet.create({
  listContainer: {
    marginTop: 45,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#fff',
  },
  listView: {
    backgroundColor: '#F8F8FF',
  },
  text: {
    flex: 1,
  },
  postCount: {
    fontSize: 20,
    textAlign: 'right',
    margin: 10,
    color: 'gray',
    marginLeft: 15,
  },
  postDetailsContainer:{
    flex: 1,
  },
  postTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    color: '#DA552F'
  },
  postDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
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
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#FFFFFD',
  },
  thumbnail : {
    width: 48,
    height: 45,
    borderRadius: 25,
    marginTop: 1,
    alignSelf: 'center',
    marginRight: 15,
    marginLeft: 15
  },
  separator: {
    height: 1,
    //marginRight: 20,
    backgroundColor: '#CCCCCC',
  },
  searchRow: {
    backgroundColor: '#eeeeee',
    paddingTop: 75,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
  },
  searchInput: {
    height: 36,
    padding: 4,
    //marginRight: 5,
    margin:5,
    marginTop:44,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});
