import React, {Component} from 'react'
import {Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../assets/MyHeader'

export default class SettingsScreen extends Component {
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      contact: '',
      address: '',
      email: '',
      id: ''
    }
  }

  updateData =()=> {
    db.collection('Users').doc(this.state.id).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      contact: this.state.contact,
      address: this.state.address
    })
  }

  render(){
    return (
      <View>
        <MyHeader navigation={this.props.navigation} title="Settings"/>
      <KeyboardAvoidingView>
      <MyHeader title = 'Settings' ></MyHeader>

      <TextInput style = {styles.input} placeholder = 'Change First Name' maxLength = {12} onChangeText = {(text) => {
        this.setState({firstName: text})
      }}></TextInput>

      <TextInput style = {styles.input} placeholder = 'Change Last Name' maxLength = {12} onChangeText = {(text) => {
        this.setState({lastName: text})
      }}></TextInput>

      <TextInput style = {styles.input} placeholder = 'Change Contact' keyboardType = 'numeric' maxLength = {15} onChangeText = {(text) => {
        this.setState({contact: text})
      }}></TextInput>

      <TextInput style = {styles.input} placeholder = 'Change Address' multiline = {true} onChangeText = {(text) => {
        this.setState({address: text})
      }}></TextInput>

      <TouchableOpacity style = {styles.button} onPress = {this.updateData}>
      <Text style = {styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 30,
    borderWidth: 2,
    borderColor: '#990077',
    marginTop: 65,
    marginBottom: 5,
    alignSelf: 'center',
    fontSize: 18,
    backgroundColor: '#EA9DDC'
  },

  button: {
    backgroundColor: '#FF8071',
    width: 200,
    height: 90,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 70,
    borderRadius: 9,
    shadowColor: '#9525F7',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: '0.7',
    shadowRadius: 8,
    elevation: 15
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 300
  }
})
