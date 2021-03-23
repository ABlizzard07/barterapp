import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'

export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state = {
      requestedItems : []
    }
  this.requestRef= null
  }

  allAvailableItems =()=>{
    this.requestRef = db.collection("availableItems")
    .onSnapshot((listener)=>{
      var requestedItems = listener.docs.map(document => document.data());
      this.setState({
        requestedItems : requestedItems
      })
    })
  }

  componentDidMount(){
    this.allAvailableItems()
  }

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.itemName}
        subtitle={item.description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'#ffff'}}>Exchange</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader navigation={this.props.navigation} title="Home"/>
   
          {
            this.state.requestedItems.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>Available Items are Loading...</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedItems}
                renderItem={this.renderItem}
              />
            )
          }
       
       </View> 
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
