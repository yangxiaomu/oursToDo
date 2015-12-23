'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var home = require('./../common/home');
var commonAPI = require('../common/commonAPI');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  AlertIOS,
  TouchableHighlight
} = React;

var login = React.createClass({
  getInitialState: function() {
    return {
      user_code: '',
      user_pass: ''
    }
  },
  render: function() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
            <View style={styles.header}>
                <Image style={styles.mark} source={require('./../../img/icon.png')} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                    <TextInput 
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Username"
                        placeholderTextColor="#FFF"
                        value={this.state.user_code}
                        onChangeText={(text) => this.setState({user_code: text})}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                    <TextInput
                        password={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Pasword"
                        placeholderTextColor="#FFF"
                        value={this.state.user_pass}
                        onChangeText={(text) => this.setState({user_pass: text})}
                    />
                </View>
            </View>
            <TouchableHighlight onPress={this.login}>
              <View style={styles.signin}>
                  <Text style={styles.whiteFont}>Sign In</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.signup}>
                <Text style={styles.greyFont}>Welcome To OursToDo</Text>
            </View>
        </View>
    );
  },

  login: function() {
    var user_code = this.state.user_code;
    var user_pass = this.state.user_pass;
    var temp = this;
    if(user_code == "" || user_pass == "") {
      AlertIOS.alert("ユーザー・パスワードをご入力ください。");
    } else {
      fetch('http://agc.dreamarts.com.cn/hibiki/rest/1/binders/users/views/allData/documents?user_code=' + user_code + "&user_pass=" + user_pass, {
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
          if (parseInt(result.totalCount) > 0) {
            temp.props.navigator.push({
              component: home,
              passProps: {
                user_code: user_code
              }
            });
          } else {
            AlertIOS.alert("ユーザー・パスワードが無効！");
            temp.state.user_code = '';
            temp.state.user_pass = '';
          }

        }
      }
    ).catch(function(err) {
      if(err) {
        AlertIOS.alert("システムエラー！");  
        temp.state.user_code = '';
        temp.state.user_pass = '';
      }
    });
    }
    
  }
});

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 180,
        height: 200
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})

AppRegistry.registerComponent('login', () => login);

module.exports = login;
