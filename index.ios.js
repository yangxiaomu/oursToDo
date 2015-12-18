'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var home = require('./ios_views/common/home');

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
                <Image style={styles.mark} source={require('./img/icon.png')} />
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
    fetch('http://agc.dreamarts.com.cn/hibiki/rest/1/binders/users/views/allData/documents?user_code=' + user_code + "&user_pass=" + user_pass, {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': make_base_auth('b_wang', 'b_wang')
      }
    }).then(
      function(response) {
        if (response.status === 401) {
          AlertIOS.alert("Sm＠rtDB認証失敗しまいました！");
        }
        if (response.status === 200) {
          var result = JSON.parse(response._bodyText);
          if (parseInt(result.totalCount) > 0) {
            AlertIOS.alert("ログイン成功！")
            this.props.navigator.push({
              component: home,
            });

          } else {
            AlertIOS.alert("ユーザー・パスワードが無効！")
          }

        }
      }
    ).catch(function(err) {
      //aAlertIOS.alert("システムエラー！");
    });
  }

});

function make_base_auth(user, password) {
  var tok = base64_encode(user + ":" + password);
  return "Basic " + tok;
}

function base64_encode(str){
  var c1, c2, c3;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";                
  var i = 0, len= str.length, string = '';

  while (i < len){
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len){
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt((c1 & 0x3) << 4);
      string += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len){
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      string += base64EncodeChars.charAt((c2 & 0xF) << 2);
      string += "=";
            break;
    }
    c3 = str.charCodeAt(i++);
    string += base64EncodeChars.charAt(c1 >> 2);
    string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    string += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return string;
}

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

AppRegistry.registerComponent('oursToDo', () => login);

module.exports = login;
