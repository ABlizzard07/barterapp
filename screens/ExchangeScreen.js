import React,{Component}from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity,} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends Component{
    constructor(){
      super();
      this.state={
        itemName: '',
        description: ''
      }
    }

    addItem =(item, info)=>{
        alert("Entering the database.");
        
        db.collection('requested_books').add({
            "item": item,
            "itemDescription": info
        })
    
        this.setState({
            itemName : '',
            description : ''
        })
    
        alert("Item Requested Successfully")

        this.props.navigation.navigate('HomeScreen');
      }

    render(){
        return (
          <View>
            <TextInput
            style={styles.formInput}
            placeholder="Item Name"
            onChangeText={(text)=>{
              this.setState({
                itemName: text
              })
            }} value = {this.state.itemName}/>
            <TextInput
            style={styles.formInput}
            multiline = {true}
            placeholder="Description"
            onChangeText={(text)=>{
            this.setState({
              description: text
            })
            }} value = {this.state.description}/>

        <TouchableOpacity
           style={[styles.button,{marginBottom:20, marginTop:20}]}
           onPress = {()=>{
             this.addItem(this.state.itemName, this.state.description)
           }}
           >
           <Text style={styles.buttonText}>Add Item</Text>
         </TouchableOpacity>

         </View>
        )
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