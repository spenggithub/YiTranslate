import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {THEME_COLOR} from '../style'
import {Select} from 'teaset'
import Modal from 'react-native-modalbox'
import axios from 'axios'
import {API_CONFIG} from '../config'
import {Input} from 'teaset'
import TranslateResultItem from '../components/TranslateResultItem'
import Header from '../components/Header'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native';

export default class Collection extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      translatedResult:[]
    }
  }
  getTranslatedResult=()=>{
    storage.getAllDataForKey('translateResult').then(translatedResult=>{
      console.log(translatedResult);
      let translatedResultCopy = [];
      translatedResult.forEach((item)=>{
        if(item.translateResult.collectedStatus){
          console.log(item)
          translatedResultCopy.push(item)
        }
      });
      this.setState({
        translatedResult:translatedResultCopy
      });
    })
  };
  componentDidMount(){
    this.getTranslatedResult()
  }
  static navigationOptions = {
    drawerLabel:'收藏',
    drawerIcon:()=>(
        <Icon name={'md-home'} size={30}/>
    )
  };
  render(){
    return(
        <View style={{flex:1,backgroundColor:'#eee'}}>
          <Header title='收藏'/>
          <View style={{flex:1}}>
            <FlatList
                style={styles.translatedResult}
                data={this.state.translatedResult}
                renderItem={({item})=>(
                    <TranslateResultItem translateResult={item}/>
                )}
            />
          </View>
        </View>
    )
  }

}
const styles = StyleSheet.create({
  translateItem:{

  },
  translatedResult:{
    marginTop:10,
    paddingLeft:10,
    paddingRight:10,
  }
});
