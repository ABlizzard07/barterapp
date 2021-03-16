import React,{Component}from 'react';
import {View, Text, StyleSheet, TouchableOpacity,} from 'react-native';
import {Card} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class ReceiverDetails extends Component{
    constructor(){
      super();
      this.state = {
        userName        : "",
        userId: firebase.auth().currentUser.email,
        recieverId      : this.props.navigation.getParam('details')["user_id"],
        requestId       : this.props.navigation.getParam('details')["exchangeId"],
        itemName        : this.props.navigation.getParam('details')["itemName"],
        reason_for_requesting     : this.props.navigation.getParam('details')["description"],
      }
    }

    addNotification=()=>{
      alert("Adding notification")
      var message = this.state.userName + " has shown interest in donating the book"
      db.collection("all_notifications").add({
        "targeted_user_id"    : this.state.recieverId,
        "donor_id"            : this.state.userId,
        "request_id"          : this.state.requestId,
        "item_name"           : this.state.itemName,
        "date"                : firebase.firestore.FieldValue.serverTimestamp(),
        "notification_status" : "unread",
        "message"             : message
      })
    }

    render(){
        return (
          <View>
            <Card
                title={"Book Information"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
              </Card>
            </Card>
            <Card
              title={"Reciever Information"}
              titleStyle= {{fontSize : 20}}
              >
              <Card>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
              </Card>
            </Card>
            
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.addNotification()
                      this.props.navigation.navigate('MyBarters')
                    }}>
                  <Text>I want to Barter</Text>
                </TouchableOpacity>
                </View>
         
        )
    }

}

const styles = StyleSheet.create({
    
})