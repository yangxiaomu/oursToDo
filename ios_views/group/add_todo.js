/**
 * 新增todo
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

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  DatePickerIOS,
  PickerIOS,
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
      deadline:'0',
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
      remindDate: '0',
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
   //  if (this.state.modalType == 1) {
   //    this.setState({deadline: date});
   //  } else {
   //    this.setState({remindDate: date});
   // };
   this.setState({selectDate: date});
  },

  render: function() {

    var make = CAR_MAKES_AND_MODELS[this.state.carMake];
    return (
      <View style={styles.container}>
        <Heading label="タイトル" />
        <View style={styles.separator} />
        <TextInput
          style={styles.todoTitle}
          autoCapitalize={'none'}
          clearButtonMode={'always'}
          keyboardType={'default'}
          multiline={true}
          placeholder="Todo Title..."
          onChangeText={(text) => this.setState({title: text})}
        />
        <View style={styles.separator} />
        
        <Heading label="詳細内容" />
        <View style={styles.separator} />
        <TextInput
          style={styles.todoContent}
          autoCapitalize={'none'}
          clearButtonMode={'always'}
          keyboardType={'default'}
          multiline={true}
          placeholder="Todo content..."
          onChangeText={(text) => this.setState({content: text})}
        />
        <View style={styles.separator} />

        <View style={styles.buttons}>
          <TouchableHighlight onPress={this.openModalDeadline} activeOpacity={0.4} underlayColor="#f8f8ff">
            <Icon name={this.state.deadline == 0 ? "calendar-o" : "calendar"} style={styles.iconButton} size={20} />
          </TouchableHighlight>

          <TouchableHighlight onPress={this.openModalRemind} activeOpacity={0.4} underlayColor="#f8f8ff">
            <Icon name={this.state.remindDate == 0 ? "bell-o" : "bell"} style={styles.iconButton} size={20} />
          </TouchableHighlight>

          <TouchableHighlight onPress={this.openModalImportance} activeOpacity={0.4} underlayColor="#f8f8ff">
            <Icon name={this.state.importance == 0 ? "flag-o" : "flag"} style={styles.iconButton} size={20} />
          </TouchableHighlight>
        </View>
        <View style={styles.separator} />

        <Button
        style={{fontSize: 15, color: 'white',backgroundColor: '1E90FF',padding:15}}
        styleDisabled={{color: 'red'}}
        onPress={this.addTodo}
        >
          Add
        </Button>
        <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal"} isDisabled={this.state.isDisabled}>
          <View style={styles.modalHeader}>
            <Icon.Button name="trash" backgroundColor="#f8f8ff" color="#000" marginRight={-10} onPress={this.deleteDeadline}/>
            <Text style={styles.heading,{marginTop:5}}>{this.state.modalType == 1 ? "deadline" : "remindDate"}</Text>
            <Icon.Button name="check" backgroundColor="#f8f8ff" color="#000" marginRight={-10} onPress={this.setDate}/>

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
            <Text style={styles.heading,{marginTop:5,marginLeft:46}}>重要度</Text>
            <Icon.Button name="check" backgroundColor="#f8f8ff" color="#000" marginRight={-10} onPress={this.setImprotance}/>
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
    
    this.setState({selectDate: this.props.date});

    this.refs.modal.close();
    this.render();
  },
  deleteDeadline: function() {
    if (this.state.modalType == 1) {
      this.setState({deadline: "0"});
    } else {
      this.setState({remindDate: "0"});
    };
    
    this.setState({selectDate: this.props.date});

    this.refs.modal.close();
    this.render();
  },

  setImprotance: function() {
    this.setState({importance:this.state.modelIndex});
    this.refs.modal2.close();   
    this.render();
  },

  addTodo: function() {

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        var csrfToken = JSON.parse(request.responseText).csrfToken;
        // 担当者更新
        request = null;
        this._addTodo(csrfToken);
      } else {
        AlertIOS.alert("システムエラー");
      }
    };

    request.open('POST', 'http://agc.dreamarts.com.cn/hibiki/rest/1/session?loginid=b_wang&password=b_wang', true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Accept", "application/json");
    request.send();

  },

  _addTodo: function(csrfToken) {

    var title = this.state.title;
    var content = this.state.content;
    var deadline = this.state.deadline;
    var remindDate = this.state.remindDate;
    var importance = this.state.importance;
    var task_code = Math.floor(Math.random()*99999999);
    var group_code = this.props.group_code;

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        this.props.navigator.pop();
      } else {
        AlertIOS.alert("システムエラー");
      }
    };

    var bodyObj = '?task_code=' + task_code + "&csrfToken=" + csrfToken + "&task_title=" + title + "&task_body=" + content + "&group_code=" + group_code + "&task_status=2";
    if(deadline) {
      var year = deadline.getFullYear();
      var month = deadline.getMonth() + 1;
      var day = deadline.getDate();
      var endDate = year + "-" + month + "-" + day;
      bodyObj += "&endDate=" + endDate;
    }
    if(remindDate) {
      var year = remindDate.getFullYear();
      var month = remindDate.getMonth() + 1;
      var day = remindDate.getDate();
      var endDate = year + "-" + month + "-" + day;
      var hour = remindDate.getHours();
      var minute = remindDate.getMinutes();
      var remindDate = endDate + "T" + hour + ":" + minute + ":" + "01";
      bodyObj += "&remindDate=" + remindDate;
    }
    if(importance) {
      bodyObj += "&task_level=" + importance;
    }
    request.open('POST', 'http://agc.dreamarts.com.cn/hibiki/rest/1/binders/tasks/documents' + bodyObj);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Accept", "application/json");
    request.send();
    
  }

});

// var　DatePicker = React.createClass({
//   render: function() {
//     <DatePickerIOS
//       date={this.state.deadline}
//       mode="datetime"
//       timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
//       onDateChange={this.onDateChange}
//     />
//   }
// });

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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  signin: {
    backgroundColor: '#1E90FF',
    padding: 15,
    alignItems: 'center'
  },
  whiteFont: {
    color: '#FFF'
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',

  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: 'f8f8ff',
    //margin:5,
    //justifyContent:'space-between',
  },
  iconButton: {
    color:"#DA552F",
    margin:10,
  },
  modalHeader: {
    flexDirection: 'row',
    margin:0,
    height:36,
    justifyContent:'space-between',
    backgroundColor:'#f8f8ff',
  },
  modal: {
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  modal3: {
    height: 200,
    width: 320
  },
});
