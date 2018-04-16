import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'

export default class TranslateResultItem extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            collectedStatus:this.props.translateResult.translateResult.collectedStatus||false
        }
    }
    toggleCollectTranslateResult=()=>{
        let {collectedStatus} = this.state;
        this.setState({
            collectedStatus:!collectedStatus
        });
        let {translateResult} = this.props.translateResult;
        if(collectedStatus){
            translateResult.collectedStatus = false;
            storage.save({
                key:'translateResult',
                id:translateResult.src,
                data:{
                    translateResult:translateResult
                }
            })
        }
        else {
            translateResult.collectedStatus = true
            storage.save({
                key:'translateResult',
                id:translateResult.src,
                data:{
                    translateResult:translateResult
                }
            })
        }
    }
    getCollectedTranslateResult = () =>{
        let {translateResult} = this.props.translateResult;
    };
    render(){
        let {translateResult} = this.props.translateResult;
        return(
            <View style={styles.item}>
                <View>
                    <Text style={styles.src}>{translateResult.src}</Text>
                    <Text style={styles.dst}>{translateResult.dst}</Text>
                </View>
                <TouchableWithoutFeedback onPress={()=>this.toggleCollectTranslateResult()}>
                    <Icon name={this.state.collectedStatus?'md-star':'md-star-outline'} size={25} color={this.state.collectedStatus?'#FECD40':'#000'}/>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
const styles = StyleSheet.create({
   item:{
       backgroundColor:'#fff',
       paddingTop:10,
       paddingBottom:10,
       borderRadius:5,
       paddingLeft:10,
       paddingRight:20,
       borderBottomColor:'#ccc',
       borderBottomWidth:1,
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center'
   },
    src:{
       color:'#111',
        fontSize:16,
        marginBottom:5
    },
    dst:{
       color:'#444'
    }
});
