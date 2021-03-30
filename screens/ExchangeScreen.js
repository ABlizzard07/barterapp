import React,{Component}from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity,} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../assets/MyHeader'

export default class ExchangeScreen extends Component{
    constructor(){
      super();
      this.state={
        userId : firebase.auth().currentUser.email,
        itemName:"",
        reasonToRequest:"",
        IsItemRequestActive : "",
        requestedItemName: "",
        itemStatus:"",
        exchangeId:"",
        userDocId: '',
        docId :'',
      }
    }

    createUniqueId(){
      var unique = Math.random().toString(12).substring(4);
      this.setState({
        exchangeId: unique
      })
    }

    addItem =(item, info)=>{
        alert("Entering the database.");
        
        db.collection('requested_items').add({
            "item": item,
            "itemDescription": info
        })
    
        this.setState({
            itemName : '',
            description : '',
            exchangeId: ''
        })
    
        alert("Item Requested Successfully")

        this.props.navigation.navigate('HomeScreen');
      }

      getIsExchangeRequestActive(){
        db.collection('users')
        .where('email_id','==',this.state.userId)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.setState({
              IsExchangeRequestActive: doc.data().IsExchangeRequestActive,
              userDocId : doc.id
            })
          })
        })
      }

      getExchangeRequest =()=>{
        var itemRequest = db.collection('requested_items')
        .where('user_id','==',this.state.userId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            if(doc.data().item_status !== "received"){
              this.setState({
                exchangeId : doc.data().exchange_id,
                requestedItemName: doc.data().item_name,
                itemStatus:doc.data().item_status,
                docId     : doc.id
              })
            }
          })
      })}

      render(){

        if(this.state.IsItemRequestActive === true){
          return(
    
            // Status screen
    
            <View style = {{flex:1,justifyContent:'center'}}>
              <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
              <Text>Item Name</Text>
              <Text>{this.state.requestedItemName}</Text>
              </View>
              <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
              <Text> Item Status </Text>
    
              <Text>{this.state.ItemStatus}</Text>
              </View>
    
              <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
              onPress={()=>{
                this.sendNotification()
                this.updateItemRequestStatus();
                this.receivedItems(this.state.requestedItemName)
              }}>
              <Text>I recieved the Item </Text>
              </TouchableOpacity>
            </View>
          )
        }
        else
        {
        return(
          // Form screen
            <View style={{flex:1}}>
              <MyHeader title="Request Item" navigation ={this.props.navigation}/>
    
              <ScrollView>
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                  <TextInput
                    style ={styles.formTextInput}
                    placeholder={"enter item name"}
                    onChangeText={(text)=>{
                        this.setState({
                            ItemName:text
                        })
                    }}
                    value={this.state.ItemName}
                  />
                  <TextInput
                    style ={[styles.formTextInput,{height:300}]}
                    multiline
                    numberOfLines ={8}
                    placeholder={"Why do you need the Item"}
                    onChangeText ={(text)=>{
                        this.setState({
                            reasonToRequest:text
                        })
                    }}
                    value ={this.state.reasonToRequest}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{ this.addRequest(this.state.ItemName,this.state.reasonToRequest);
                    }}
                    >
                    <Text>Request</Text>
                  </TouchableOpacity>
    
                </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
      }
    }

}

const styles = StyleSheet.create({
    button:{
        width:320,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        padding: 10
      },
      buttonText:{
        color:'red',
        fontWeight:'200',
        fontSize:20
      },
    formInput:{
        width:"70%",
        height:30,
        alignSelf:'center',
        borderColor:'#ff4402',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    }
})