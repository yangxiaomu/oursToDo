/**
 * 组织列表
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var TodoList = require('./todo_list');
var AddToDo = require('./add_todo');
var Icon = require("react-native-vector-icons/FontAwesome");


var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var GROUP_LIST={"groups":[
  {id:'1',name:'suzuken',icon:'suzuken.png'}
  ,{id:'2',name:'fuji',icon:'fujifilm.jpg'}
  ,{id:'3',name:'NHK',icon:'nhk.png'}
  ,{id:'4',name:'SmartDB',icon:'nhk.png'}
  ,{id:'5',name:'ICO',icon:'nhk.png'}
  ,{id:'6',name:'devOps',icon:'nhk.png'}
  ,{id:'2',name:'fuji',icon:'fujifilm.jpg'}
  ,{id:'3',name:'NHK',icon:'nhk.png'}
  ,{id:'4',name:'SmartDB',icon:'nhk.png'}
  ,{id:'5',name:'ICO',icon:'nhk.png'}
  ,{id:'6',name:'devOps',icon:'nhk.png'}
]};

//var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects


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
    Icon.getImageSource('github-alt', 30)
      .then((source) => {
        this.setState({ shareIcon: source })
      });
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
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => this.setState({input: text})}
          placeholder='Search...'
        />

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
      title: 'ICO',
      component: TodoList,
      //leftButtonTitle: 'Custom Left',
      onLeftButtonPress: () => this.props.navigator.pop(),
      rightButtonIcon: this.state.shareIcon,
      //rightButtonTitle: 'New',

      onRightButtonPress: () => this.props.navigator.push({
        title: 'NewTodo',
        component: AddToDo,
        //leftButtonTitle: 'Custom Left',
        onLeftButtonPress: () => this.props.navigator.pop(),

      }),
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
  
  /**
   * 绘制group
   * added by ql_wu
   */
  renderGroup: function(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource= require('./../../img/group_2.jpg');
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#fff',
  },
  listView: {
    backgroundColor: '#aaa',
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
    height: 48,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'center',
    marginRight: 15,
    marginLeft: 15
  },
  separator: {
    height: 1,
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
