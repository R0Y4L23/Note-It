import React from 'react'
import {Text,View,ScrollView} from 'react-native';
import {Provider,Appbar} from 'react-native-paper';
const Note = ({navigation,route}) => {
    return (
        <Provider>
          <View style={{flex:1}}>
            <Appbar.Header>
              <Appbar.BackAction onPress={()=>{navigation.navigate("Home")}}/>
              <Appbar.Content title={<Text style={{fontSize:20}}>Read Note</Text>}/>
              <Appbar.Action icon="border-color" onPress={()=>{navigation.navigate("Create",{"Note":route.params.Note,"Cate":route.params.Cate,"Current":"Modify","id":route.params.id})}}/>
            </Appbar.Header>
            <View style={{flex:1}}>
            <View style={{flex:10,borderBottomColor:'grey',borderBottomWidth:1}}>
            <ScrollView keyboardDismissMode={"interactive"}>
             <Text style={{padding:10,fontSize:15}}>{route.params.Note}</Text>
            </ScrollView>
            </View>
            <View style={{flex:1,flexDirection:"row"}}>
            <Text style={{fontSize:20,paddingLeft:30,paddingTop:10}}>{route.params.Cate}</Text>
            <Text style={{fontSize:20,paddingLeft:30,paddingTop:10,color:'grey'}}>Date : {route.params.Date}</Text>
            </View>
            </View>
          </View>
        </Provider>
    )
}
export default Note