import React,{useState,useEffect} from 'react';
import {StyleSheet,Text,View,FlatList,TouchableOpacity} from 'react-native';
import {Provider,Appbar,FAB,Menu} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const Home=({navigation})=> {
  const [visible, setVisible] =useState(false);
  const [pd,setPd]=useState([])
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Notes')
      return jsonValue != null ? JSON.parse(jsonValue):[];
    } catch(e) {
     console.log(e)
    }
  }
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('Notes', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  const doit=async ()=>{
    setPd(await getData())
  }
  const deleteNote=async (id)=>{
    let a=pd
    let b=[]
    for(let i=0;i<a.length;i++)
    {
      if(a[i].id!=id)
      {
        b.push(a[i])
      }
    }
    await storeData(b)
    doit()
  }
  const deleteAll=async ()=>{
    await storeData([])
    doit()
  }
  const sortByTime=async ()=>{
    let a=pd
    a.sort((a,b)=>(a.id>b.id?1:-1))
    await storeData(a)
    doit()
  }
  useEffect(()=>{
    doit()
  },[pd])
  return (
    <Provider>
    <View style={{flex:1}}>
      <Appbar.Header style={{backgroundColor:"#FFD700"}}>
        <Appbar.Content title={<Text style={{fontSize:30}}>Notes</Text>}/>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
          <Menu.Item onPress={doit} title="Refresh"/>
          <Menu.Item onPress={deleteAll} title="Delete All Notes"/>
          <Menu.Item onPress={sortByTime} title="Sort By Modified Time"/>
        </Menu>
      </Appbar.Header>
      <View style={styles.container}>
        {pd.length==0&&<Text>No Notes till now.</Text>}
        {pd.length!=0&&<FlatList data={pd} renderItem={({item})=><TouchableOpacity onPress={()=>{navigation.navigate("Note",item)}}><View style={{borderBottomWidth:1,height:75,width:windowWidth*(0.9),borderBottomColor:"grey",justifyContent:"center"}}><Text style={{fontSize:20,marginBottom:5}}>{item.Note.length>=30?item.Note.slice(0,30):item.Note}...</Text><View style={{flexDirection:"row"}}><Text style={{width:100,color:"grey"}}>{item.Cate}</Text><Text style={{marginHorizontal:30,color:"#C0C0C0"}}>Date : {item.Date}</Text><AntDesign name="delete" size={25} color="red" onPress={()=>{deleteNote(item.id)}}/></View></View></TouchableOpacity>} keyExtractor={item=>item.id.toString()}/>}
      </View>
      <FAB style={styles.fab} icon="border-color" onPress={() =>{navigation.navigate("Create",{"Note":"","Cate":"Uncategorized","Current":"New","id":0})}}/>
  </View>
  </Provider>
  );
}
export default Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:15
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:"red"
  },
});