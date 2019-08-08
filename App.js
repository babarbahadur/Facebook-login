import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Content } from "native-base";
import { SocialIcon } from 'react-native-elements';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk'
import firebase from 'firebase'


var config = {
    apiKey: "AIzaSyCMqje7iJz1wruDd14MqxxQdWfL1aFa3A0",
    authDomain: "zawena2.firebaseapp.com",
    databaseURL: "https://zawena2.firebaseio.com",
    projectId: "zawena2",
    storageBucket: "",
    messagingSenderId: "658242629884",
    appId: "1:658242629884:web:82214e2c71bdc2a2"
}

const firebaseRef = firebase.initializeApp(config)

export default class App extends React.Component {

 
  _fbAuth() {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result){
      if(result.isCancelled) {
        alert('Login cancelled');
      } else {
        //console.log('Login was a successful' + result.grantedPermissions.toString());

        AccessToken.getCurrentAccessToken().then((accessTokenData) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
          firebase.auth().signInWithCredential(credential).then((result) => {
            //Promise was successfull
          }, (error) => {
            //Promise was rejected
            console.log(error)
          })
        }, (error => {
          console.log('Some error occured: ' + error)
        }))
      }
    }, 
    function(error) {
      alert('Login fail with error: ' + error);
    }
    );  
  }
 
  render() {
    return (
      <Content>
      <View style={{ marginTop: 20, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column' }} >
          <TouchableOpacity onPress = {this._fbAuth()}>
          <SocialIcon type="facebook"/>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <SocialIcon type="google-plus-official" onPress={() => { alert('google'); }} />
        </View>
        <View style={{ flexDirection: 'column' }}>
          <SocialIcon type="linkedin" onPress={() => { alert('linkedin'); }} />
        </View>
      </View>
      </Content>
    );
  }
}
