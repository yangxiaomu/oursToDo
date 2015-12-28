/**
 * todo详细
 * https://github.com/yangxiaomu/oursToDo.git
 */
'use strict';

var React = require('react-native');
var Header = require('./../common/header');
var Button = require('react-native-button');
var Icon = require("react-native-vector-icons/FontAwesome");
var Modal = require('react-native-modalbox');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var todoDemo = {
  title:'NHK：对应邮件转送bug',
  content:"bug再现:"+
  "1.大发大水发斯蒂芬 2.嘎嘎大咖飒飒的 3.哈哈几节课",
  deadline:'2015-12-25 12:00',
  remindDate:'2015-12-24 8:00',
};

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  PickerIOS,
  DatePickerIOS,
  TouchableHighlight
} = React;

var PickerItemIOS = PickerIOS.Item;

var IMPORTANCE = ['','低','中','高'];
var CAR_MAKES_AND_MODELS = {
  amc: {
    name: 'AMC',
    models: ['','低','中','高'],
  },
};

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  },
  
  getInitialState: function() {
    this.state = {
      isModalOpen: false
    };
    return {
      title: '',
      content: '',
      deadline:'',
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
      remindDate: '',
      selectDate: this.props.date,
      importance:'',
      carMake: 'amc',
      modelIndex: 0,
      user_pass: '',
      isOpen: false,
      isDisabled: false,
      modalType:'',
    }
  },

  openModalDeadline: function(id) {
    this.setState({modalType: 1});
    this.refs.modal.open();
  },
  openModalRemind: function(id) {
    this.setState({modalType: 2});
    this.refs.modal.open();
  },
  openModalImportance: function(id) {
    this.refs.modal2.open();
  },
  toggleDisable: function() {
    this.setState({isDisabled: !this.state.isDisabled});
  },

  onDateChange: function(date) {       
    this.setState({selectDate: date});
  },
  // onDateChange: function(date) {
  //   this.setState({date: date});
  // },

  render: function() {
    var make = CAR_MAKES_AND_MODELS[this.state.carMake];
    return (
      <View style={styles.container}>
        <Heading label="タイトル" />
        <View style={styles.separator} />
        <TextInput
          style={styles.todoTitle}
          autoCapitalize={'none'}
          keyboardType={'default'}
          
          defaultValue={todoDemo.title}
          onChangeText={(text) => this.setState({title: text})}
        />
        <View style={styles.separator} />
        
        <Heading label="詳細内容" />
        <View style={styles.separator} />
        <TextInput
          style={styles.multiline}
          autoCapitalize={'none'}
          clearButtonMode={'always'}
          keyboardType={'default'}
          multiline={true}
          defaultValue={todoDemo.content}
          onChangeText={(text) => this.setState({content: text})}
        />
        <View style={styles.separator} />

        <View style={styles.buttons}>
          <TouchableHighlight onPress={this.openModalDeadline} activeOpacity={0.4} underlayColor="#f8f8ff">
            <Icon name="calendar" style={styles.iconButton} size={20} />
          </TouchableHighlight>

          <TouchableHighlight onPress={this.openModalRemind} activeOpacity={0.4} underlayColor="#f8f8ff">
            <Icon name="bell-o" style={styles.iconButton} size={20} />
          </TouchableHighlight>

          <TouchableHighlight onPress={this.openModalImportance} activeOpacity={0.4} underlayColor="#f8f8ff">
            <Icon name="flag-o" style={styles.iconButton} size={20} />
          </TouchableHighlight>

        </View>
        <View style={styles.separator} />

        <View style={styles.buttons}>
          <Button
          style={styles.update}
          styleDisabled={{color: 'white'}}
          onPress={this.update}
          >
            更新
          </Button>
          <Button
          style={styles.update}
          styleDisabled={{color: 'red'}}
          onPress={this.take}
          >
            认领
          </Button>
        </View>

        <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal"} isDisabled={this.state.isDisabled}>
          <View style={styles.modalHeader}>
            <Icon.Button name="trash-o" backgroundColor="#a5de37" onPress={this.deleteDeadline}/>
            <Text>{this.state.modalType == 1 ? "deadline" : "remindDate"}</Text>
            <Icon.Button name="check" backgroundColor="#a5de37" onPress={this.setDate}/>

          </View>
          <View style={styles.separator} />


          <DatePickerIOS
            date={this.state.selectDate}
            mode={this.state.modalType == 1 ? "date" : "datetime"}
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
          />
        </Modal>

        <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal2"} isDisabled={this.state.isDisabled}>
          <View style={styles.modalHeader}>
            <Text/>
            <Text>importance</Text>
            <Icon.Button name="check" backgroundColor="#a5de37" onPress={this.setImprotance}/>
          </View>
          <View style={styles.separator} />

          <PickerIOS
          selectedValue={this.state.modelIndex}
          key={this.state.carMake}
          onValueChange={(modelIndex) => this.setState({modelIndex})}>
          {CAR_MAKES_AND_MODELS[this.state.carMake].models.map(
            (modelName, modelIndex) => (
              <PickerItemIOS
                key={this.state.carMake + '_' + modelIndex}
                value={modelIndex}
                label={modelName}
              />
            ))
          }
        </PickerIOS>
        </Modal>
      </View>
    );
  },

  setDate: function() {
    if (this.state.modalType == 1) {
      this.setState({deadline: this.state.selectDate});
    } else {
      this.setState({remindDate: this.state.selectDate});
    };
    this.refs.modal.close();
  },

  setImprotance: function() {
    this.setState({importance:this.state.modelIndex});
    this.refs.modal2.close();   
  },

  addTodo: function() {
    var title = this.state.title;
    var content = this.state.content;
    var deadline = this.state.deadline;
    var remindDate = this.state.remindDate;


  }
});

var　DatePicker = React.createClass({
  render: function() {
    <DatePickerIOS
      date={this.state.deadline}
      mode="datetime"
      timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
      onDateChange={this.onDateChange}
    />
  }
});

var Heading = React.createClass({
  render: function() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  summary_demo : {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop:44,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize:15,
    padding:5,
    height: 40
  },
  todoTitle: {
    margin:0,
    height: 40, 
    borderColor: 'gray',
    backgroundColor: '#FFF',
    //borderWidth:1,
    //borderRadius:5
  },
  todoContent: {
    margin:0,
    height: 200, 
    borderColor: 'gray',
    backgroundColor: '#FFF',

    //borderWidth:1,
    //borderRadius:5
  },
  multiline: {
    //borderWidth: 0.5,
    //borderColor: '#0f0f0f',
    //flex: 1,
    fontSize: 15,
    height: 150,
    padding: 4,
    marginBottom: 4,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  update: {
    color: 'white',
    backgroundColor: '1E90FF',
    margin:5,
    padding:10,
    flex:1,
    borderRadius:5,
  },
  whiteFont: {
    color: '#FFF'
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#99ffff',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: 'f8f8ff',
  },
  iconButton: {
    color:"#DA552F",
    margin:10,
  },
  modalHeader: {
    flexDirection: 'row',
    margin:0,
    justifyContent:'space-between',
    backgroundColor:'#f8f8ff',
  },
  modal3: {
    height: 200,
    width: 320
  },
});
