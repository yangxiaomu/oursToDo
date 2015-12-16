/**
 * 组织列表
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var TodoList = require('./todo_list');
var AddToDo = require('./add_todo');

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var GROUP_LIST={"groups":[
  {id:'1',name:'suzuken',icon:'suzuken.png'}
  ,{id:'2',name:'fuji',icon:'fujifilm.jpg'}
  ,{id:'3',name:'NHK',icon:'nhk.png'}
]};

var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
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

  componentDidMount: function() {
    // this.getGroupByAPI();
    this.getGroup();
  },
  
  /**
   * 从smartDB restAPI获取组织列表
   * added by ql_wu
   */
  getGroupByAPI: function() {
    var _data=MOVE_RETURN;
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },
  
  /**
   * 获取组织列表，假数据，开发测试用
   * added by ql_wu
   */
  getGroup: function(){
    var _data=GROUP_LIST;
    this.setState({dataSource: this.state.dataSource.cloneWithRows(_data.groups),
      loaded: true,});
  },

  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return (
      
      <View>
        <View>
        <Text style={styles.add}  onPress={this.addToDoPage}>+</Text>
        </View>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderGroup}
            style={styles.listView}
          />
        </View>
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
          正在加载数据……
        </Text>
      </View>
    );
  },

  /**
   * 跳转：组织下todo list画面
   * added by ql_wu
   */
  todoListPage: function(id){
    this.props.navigator.push({
      component: TodoList,
      passProps:{
        id: id
      }
    });
  },

  /**
   * 跳转：新增todo画面
   * added by ql_wu
   */
  addToDoPage:function(){
    this.props.navigator.push({
      component: AddToDo,
    });
  },
  
  /**
   * 绘制group
   * added by ql_wu
   */
  renderGroup: function(group) {
    return (
      <View style={styles.container}>
        <Image
          source={require('./../../img/icon_group_todo.jpg')}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title} onPress={this.todoListPage.bind(this,group.id)}>{group.name}</Text>
        </View>
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