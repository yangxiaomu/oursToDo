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
  AlertIOS
} = React;

var PickerItemIOS = PickerIOS.Item;

var CAR_MAKES_AND_MODELS = {
  amc: {
    name: 'AMC',
    models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer'],
  },
  alfa: {
    name: 'Alfa-Romeo',
    models: ['159', '4C', 'Alfasud', 'Brera', 'GTV6', 'Giulia', 'MiTo', 'Spider'],
  }
};

module.exports = React.createClass({

  getInitialState: function() {
    return {
      carMake: 'amc',
      modelIndex: 0,
    };
  },

  render: function() {

    var make = CAR_MAKES_AND_MODELS[this.state.carMake];
    var selectionString = make.name + ' ' + make.models[this.state.modelIndex];

    var barChart = this.createBarChart();
    
    return (

      <View>
        <Text>Please choose a make for your car:</Text>
        <PickerIOS
          selectedValue={this.state.carMake}
          onValueChange={(carMake) => this.setState({carMake, modelIndex: 0})}>
          {Object.keys(CAR_MAKES_AND_MODELS).map((carMake) => (
            <PickerItemIOS
              key={carMake}
              value={carMake}
              label={CAR_MAKES_AND_MODELS[carMake].name}
              />
            )
          )}
        </PickerIOS>

        {barChart}

      </View>

    );
  },

  createBarChart: function() {

    return(

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
          height: 200,
          marginTop: 40,
        }} />

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
