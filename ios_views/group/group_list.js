/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
// var GroupToDO = require('./ios_views/group_list');
// var Summary = require('./ios_views/sum_list');

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
    // this.fetchData();
    this.getGroup();
  },
  fetchData: function() {
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
        <Text style={styles.add}>+</Text>
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

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载数据……
        </Text>
      </View>
    );
  },

  renderGroup: function(group) {
    var path = 'localhost:/Users/dac/project/oursToDo/img/icon_group_todo.jpg';
    return (
      <View style={styles.container}>
        <Image
          source={require('./../../img/icon_group_todo.jpg')}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{group.name}</Text>
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
