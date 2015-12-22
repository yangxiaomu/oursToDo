/**
 * 组织列表
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var ReactCharts = require('react-native-charts');
var BarChart = ReactCharts.default.BarChart;

var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
} = React;

module.exports = React.createClass({

  render: function() {

    return (

      <BarChart
        dataSets={[
          { 
            fillColor: '#46b3f7', 
            data: [
              { value: 15 },
              { value: 10 },
              { value: 12 },
              { value: 11 },
            ]
          },
          { 
            fillColor: '#3386b9', 
            data: [
              { value: 14 },
              { value: 11 },
              { value: 14 },
              { value: 13 },
            ]
          },
        ]}
        graduation={1}
        horizontal={false}
        showGrid={true}
        barSpacing={5}
        style={{
          height: 300,
          marginTop: 60,
      }} />

    );
  }

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
