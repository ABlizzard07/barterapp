import React,{Component} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import db from '../config.js';
import firebase from 'firebase'

export default class WelcomeScreen extends Component{
  constructor(){
    super();
    this.state = {
      emailId: '',
      password: ''
    }
  }

  userLogin = async (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      return alert('Successfully logged in!')   
    })

    .catch((error) => {
      var theerror = error.code;
      var errorMessage = theerror.message;

      return alert(errorMessage)
      
    })
  }

  userSignUp = async (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
      return alert('Welcome to the Barter App!');
    })
      .catch((error) => {
        var theerror = error.code;
        var errorMessage = theerror.message;

        return alert(errorMessage)
      })
  }

  render(){
    return (
      <View style = {styles.container}>
       <Text style = {styles.title}>Bartering App</Text>

       <TextInput style = {styles.input} onChangeText = {(text) => {
         this.setState({
           emailId: text
         })
       }} value = {this.state.emailId} placeholder = 'Email' placeholderTextColor = 'blue' keyboardType = 'emailAddress'></TextInput>

       <TextInput style = {styles.input} onChangeText = {(text) => {
         this.setState({
           password: text
         })
       }} value = {this.state.password} placeholder = 'Password' secureTextEntry = {true} placeholderTextColor = '#000044' keyboardType = 'emailAddress'></TextInput>

       <TouchableOpacity style = {styles.submit} onPress = {this.userSignUp(this.state.emailId, this.state.password)}>
         <Text style = {styles.buttonText}>Sign Up</Text>
       </TouchableOpacity>

       <TouchableOpacity style = {styles.submit} onPress = {this.userLogin(this.state.emailId, this.state.password)}>
         <Text style = {styles.buttonText}>Log In</Text>
       </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F8BE85',
        alignItems: 'center',
        justifyContent: 'center'
      },
      title :{
        fontSize:65,
        fontWeight:'300',
        paddingBottom:30,
        color : '#BB0000'
      },
      input:{
        width: '70%',
        height: 40,
        borderBottomWidth: 2,
        borderColor : '#CC11DD',
        fontSize: 20,
        marginTop:15,
        padding:10,
        alignSelf: 'center'
      },
      button:{
        width:200,
        height:80,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#00DD00",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 15,
        padding: 10
      },
      buttonText:{
        color:'#004400',
        fontWeight:'200',
        fontSize:20
      }
     
})