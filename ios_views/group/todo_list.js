/**
 * todo列表
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var Header = require('./../common/header');
var todoDetail = require('./todo_detail');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var commonAPI = require('../common/commonAPI');
var Icon = require("react-native-vector-icons/FontAwesome");
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
  TouchableHighlight,
  SegmentedControlIOS
} = React;

var todoList= React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      values: ['未完了', '全て', '自分', '担当者なし'],
      selectedIndex: 0
    };
  },

  componentWillMount: function() {
    Icon.getImageSource('thumbs-up', 30)
      .then((source) => {
        this.setState({ haveIcon: source })
    });

    Icon.getImageSource('thumbs-o-up', 30)
    .then((source) => {
      this.setState({ haveOIcon: source })
    });
  },

  componentDidMount: function() {
    this.getTaskAPI();
  },
  
  /**
   * 从smartDB restAPI获取组织列表
   * added by ql_wu
   */
  getTaskAPI: function() {
    var tempThis = this;
    var user_code = this.props.user_code;
    var group_code = this.props.group_code;
    var tempThis = this;

    fetch('http://agc.dreamarts.com.cn/hibiki/rest/1/binders/tasks/views/allData/documents?group_code=' + group_code + "&sort=finish_date:DESC", {
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

          var selectedTasks = [];
          // 選択状態SegmentedControlIOS
          if(tempThis.state.selectedIndex == 0) {
            // 未完了
            _.each(tasks, function(task) {
              if(task.task_status.id == "2") {
                selectedTasks.push(task);
              }
            });
          } else if (tempThis.state.selectedIndex == 1) {
            // 完了
            selectedTasks = tasks;

          } else if (tempThis.state.selectedIndex == 2) {
            // 自分
            _.each(tasks, function(task) {
              if(task.user_code == "b_wang") {
                selectedTasks.push(task);
              }
            });
          } else if (tempThis.state.selectedIndex == 3) {
            // 担当者なし
            _.each(tasks, function(task) {
              if(task.user_code == "") {
                selectedTasks.push(task);
              }
            });
          }

          tempThis.setState({
            dataSource: tempThis.state.dataSource.cloneWithRows(selectedTasks),
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
    if (this.props.navigator) {
      this.props.navigator.navigationContext.addListener('didfocus',(event) => {
        this.getTaskAPI();
      });
    }

    return (
      <View style={styles.listContainer}>
        <SegmentedControlIOS 
          tintColor="#DA552F" 
          values={this.state.values}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderTask}
          style={styles.listView}
        />
      </View>
    );
  },

   _onChange: function(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
    this.getTaskAPI();
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
  goToTaskDetail: function(id){
    this.props.navigator.push({
      title: 'タスク詳細',
      component: todoDetail,
      onLeftButtonPress: () => this.props.navigator.pop(),
      passProps: {
        text: 'This page has an icon for the right button in the nav bar',
        task_code: id
      }
    });
  },
  

  renderTask: function(rowData: string, sectionID: number, rowID: number) {
    
    var imgSource = '';

    if (rowData.user_code == 'b_wang') {
      imgSource = require('./../../img/b_wang.jpg');
    } else if (rowData.user_code == 't_yang') {
      imgSource = require('./../../img/t_yang.jpg');
    } else if (rowData.user_code == 'ql_wu') {
      imgSource = require('./../../img/ql_wu.jpg');
    } else {
      imgSource = require('./../../img/wenhao.jpg');
    }

    var backgroundCSS = styles.postDetailsContainer;
    var titleCSS = styles.postTitle;
    var bodyCSS = styles.postDetailsLine;
    if (rowData.task_status.id == "1") {
      backgroundCSS = styles.postDetailsContainer_grey;
      titleCSS = styles.postTitle_white;
      bodyCSS = styles.postDetailsLine_white;
    }

    var displayIcon = this.state.haveIcon;
    if(rowData.user_code == "") {
      displayIcon = this.state.haveOIcon;
    }
    
    var taskBody = rowData.task_body.length > 15 ? rowData.task_body.substr(0, 15) + '...' : rowData.task_body.substr(0, 15)
    return (
      
        <View style={styles.container}>

          <TouchableHighlight onPress={() => this.goToTaskDetail(rowData.task_code)}>
            <Image style={styles.thumbnail} source={imgSource} />
          </TouchableHighlight>

          <View style={backgroundCSS}>

            <TouchableHighlight onPress={() => this.goToTaskDetail(rowData.task_code)}>
              <Text style={titleCSS}>
                {rowData.task_title}
              </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this.goToTaskDetail(rowData.task_code)}>
              <Text style={bodyCSS}>
                {taskBody}
              </Text>
             </TouchableHighlight>

            <View style={styles.separator} />

          </View>

          <TouchableHighlight onPress={() => this.updateTask('b_wang', rowData.record_id)}>
            <View style={{paddingTop: 10}}>
              <Image style={styles.thumbnail_star} source={displayIcon}/>
            </View>
          </TouchableHighlight>

        </View>

     
    );
  },

  updateTask(user_code, record_id) {

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        var csrfToken = JSON.parse(request.responseText).csrfToken;
        // 担当者更新
        request = null;
        this._udpateTask(csrfToken, user_code, record_id);
      } else {
        AlertIOS.alert("システムエラー");
      }
    };

    request.open('POST', 'http://agc.dreamarts.com.cn/hibiki/rest/1/session?loginid=b_wang&password=b_wang', true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Accept", "application/json");
    request.send();

  },

  _udpateTask: function(csrfToken, user_code, record_id) {

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        this.getTaskAPI();
      } else {
        AlertIOS.alert("システムエラー");
      }
    };

    request.open('POST', 'http://agc.dreamarts.com.cn/hibiki/rest/1/binders/tasks/documents/' + record_id + "?user_code=b_wang&_method=PUT&csrfToken=" + csrfToken, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Accept", "application/json");
    request.send();
    
  }

});

var styles = StyleSheet.create({
  listContainer: {
    height: windowSize.height,
    marginTop: 45
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#fff',
  },
  listView: {
    backgroundColor: 'white',
    marginTop:2
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
  postDetailsContainer_grey:{
    flex: 1,
    backgroundColor: 'gray'
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
  postTitle_white: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    color: 'white'
  },
  postDetailsLine_white: {
    fontSize: 12,
    marginBottom: 10,
    color: 'white',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  container: {
    //flex: 1,
    flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#FFFFFD',
  },
  thumbnail : {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginTop: 1,
    alignSelf: 'center',
    marginRight: 15,
    marginLeft: 15
  },
  thumbnail_star : {
    width: 25,
    height: 25,
    marginTop: 1,
    alignSelf: 'flex-end',
    marginRight: 3
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

module.exports = todoList;


