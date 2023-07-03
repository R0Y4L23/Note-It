import React,{useEffect,useState} from 'react'
import {Text,View,TextInput,ScrollView,TouchableOpacity} from 'react-native';
import {Provider,Appbar,Menu} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;
const Create = ({navigation,route}) => {
  const [pd,setPd]=useState([])
  const [visible, setVisible] =useState(false);
  const openMenu=()=>setVisible(true);
  const closeMenu=()=>setVisible(false);
  const [text,setText]=useState(route.params.Note)
  const [cate,setCate]=useState(route.params.Cate)
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('Notes', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Notes')
      return jsonValue != null ? JSON.parse(jsonValue):[];
    } catch(e) {
     console.log(e)
    }
  }
    const create=async ()=>{
      if(text!=""&&route.params.Current=="New")
      {
          let c=new Date()
          let newOBJ={"Note":text,"Cate":cate,"id":Date.now(),"Date":`${c.getDate()}/${c.getMonth()}/${c.getFullYear()}`}
          let a=pd
          a.push(newOBJ)
          await storeData(a)
          navigation.navigate("Home")
      }
      else if(text!=""&&route.params.Current=="Modify")
      {
        let c=new Date()
        let a=pd
        let objIndex = a.findIndex((obj => obj.id == route.params.id));
        a[objIndex].Note=text
        a[objIndex].Cate=cate
        a[objIndex].id=Date.now()
        a[objIndex].Date=`${c.getDate()}/${c.getMonth()}/${c.getFullYear()}`
        await storeData(a)
        navigation.navigate("Home")
      }
    }
    useEffect(()=>{
      const doit=async ()=>{
        setPd(await getData())
      }
      doit()
    },[])
    return (
        <Provider>
          <View style={{flex:1}}>
            <Appbar.Header style={{backgroundColor:"#FFA500"}}>
              <Appbar.BackAction onPress={()=>{navigation.navigate("Home")}}/>
              <Appbar.Content title={<Text style={{fontSize:20}}>{route.params.Current} Note</Text>}/>
              <Appbar.Action icon="check" onPress={create}/>
            </Appbar.Header>
            <View style={{flex:1}}>
            <View style={{flex:10,borderBottomColor:'grey',borderBottomWidth:1}}>
            <ScrollView keyboardDismissMode={"interactive"}>
             <TextInput style={{padding:10,fontSize:15}} multiline={true} value={text} onChangeText={setText} autoFocus={true}/>
            </ScrollView>
            </View>
            <View style={{flex:1}}>
            <Menu visible={visible} style={{top:windowHeight*0.53,left:25}} onDismiss={closeMenu} anchor={<TouchableOpacity onPress={openMenu}><Text style={{fontSize:20,paddingLeft:30,paddingTop:10}}>{cate}     <AntDesign name="caretdown" size={10} color="black"/></Text></TouchableOpacity>}>
              <Menu.Item onPress={()=>{setCate("Uncategorized");closeMenu();}} title="Uncategorized"/>
              <Menu.Item onPress={()=>{setCate("Work");closeMenu();}} title="Work"/>
              <Menu.Item onPress={()=>{setCate("Personal");closeMenu();}} title="Personal"/>
              <Menu.Item onPress={()=>{setCate("Family affair");closeMenu();}} title="Family affair"/>
              <Menu.Item onPress={()=>{setCate("Study");closeMenu();}} title="Study"/>
            </Menu>  
            </View>
            </View>
          </View>
        </Provider>
    )
}
export default Create