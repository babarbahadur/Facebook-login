import React from "react";
import { View, TouchableOpacity, NativeModules } from "react-native";
import { Content, Button } from "native-base";
import { SocialIcon } from 'react-native-elements';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import firebase from 'firebase'
import LinkedInModal from 'react-native-linkedin'

const { RNTwitterSignIn } = NativeModules

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "gaobOoOwXbCbPTpCgKBKgpc42",
  TWITTER_CONSUMER_SECRET: "zUOasieeirFwjtrcUiv2QpsUgMoHpcKz1wUHmp8mnVYlRPtCPf"
}

console.disableYellowBox = true;

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

componentDidMount = () => {
  GoogleSignin.configure({});
} 

  _fbAuth() {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result){
      if(result.isCancelled) {
        alert('Login cancelled');
      } else {
        console.log('Login was a successful' + result.grantedPermissions.toString());

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

  onLoginGoogle() {
    GoogleSignin
    .signIn()
    .then((data) => {
      //create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      //login with credential
      return firebase.auth().signInWithCredential(credential);
      
    })
    .then((currentUser) => {
      console.log(`Google login with user: ${JSON.stringify(currentUser.toJSON())}` );
    })
    .catch((error) => {
      console.log(`Login fail with error: ${error}` );
      alert('Login cancelled');
    });
  }
  onLinkedInLogin = () => {
      <View>
        <LinkedInModal
          onPress = "true"
          clientID="86li8a5icdlteg"
          clientSecret="41v6apmBGDnW7tI6"
          redirectUri="https://www.google.com"
          onSuccess={token => console.log(token)}
        />
        </View>
  }

  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData)
        const { authToken, authTokenSecret} = loginData
        if (authToken && authTokenSecret) {
        }
      })
      .then((data) => {
        const credential = firebase.auth.TwitterAuthProvider.credential(data.secret, data.accessToken);
      //login with credential
      return firebase.auth().signInWithCredential(credential);
      })
      .catch(error => {
        console.log(error)
      }
    )
  }
 
  render() {
    return (
      <Content>
      <View style={{ marginTop: 20, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column' }} >
          <TouchableOpacity>
              <SocialIcon type="facebook" onPress= {this._fbAuth}/>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity>
              <SocialIcon type="google-plus-official"  onPress = {this.onLoginGoogle}/>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <SocialIcon type="twitter" onPress = {this._twitterSignIn} />
        </View>
        <View>
        <LinkedInModal
          clientID="86li8a5icdlteg"
          clientSecret="41v6apmBGDnW7tI6"
          redirectUri="https://www.google.com"
          onSuccess={token => console.log(token)}
        />
        </View>
      </View>
      </Content>
      
    );
  }
}
