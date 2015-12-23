/**
 * todo列表
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var Header = require('./../common/header');
var todoDetail = require('./todo_detail');

var GROUP_LIST={"groups":[
  {id:'1',name:'suzuken',icon:'suzuken.png'}
  ,{id:'2',name:'fuji',icon:'fujifilm.jpg'}
  ,{id:'3',name:'NHK',icon:'nhk.png'}
  ,{id:'4',name:'SmartDB',icon:'nhk.png'}
  ,{id:'5',name:'ICO',icon:'nhk.png'}
  ,{id:'6',name:'devOps',icon:'nhk.png'}
]};

var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  AlertIOS,
  TouchableHighlight
} = React;

var todoList= React.createClass({
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
  todoListPage: function(id){
    this.props.navigator.push({
      title: 'ICO',
      component: todoDetail,
      onLeftButtonPress: () => this.props.navigator.pop(),
      passProps: {
        text: 'This page has an icon for the right button in the nav bar',
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
      title: 'AddToDo',
      component: AddToDo,
    });
  },
  
  
  renderGroup: function(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource= require('./../../img/t_yang.jpg');
    return (
      <TouchableHighlight onPress={() => this.todoListPage(rowData.id)}>
        <View style={styles.container}>
          <Image style={styles.thumbnail} source={imgSource} />
          <View style={styles.postDetailsContainer}>
            <Text style={styles.postTitle}>
              {rowData.name}
            </Text>
            <Text style={styles.postDetailsLine}>
              {LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
            </Text>
          <View style={styles.separator} />
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';


var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var styles = StyleSheet.create({
  listContainer: {

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#fff',
  },
  listView: {
    backgroundColor: '#F8F8FF',
    //marginTop:44
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
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

module.exports = todoList;


