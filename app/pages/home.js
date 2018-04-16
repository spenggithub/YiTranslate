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
const md5 = require('../util/md5')
import {LANG_LIST} from '../config'
import {TO_LANG_LIST} from '../config'
const {height,width}  = Dimensions.get('window')
export default class Home extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            from:'auto',
            fromText:'自动选择',
            to:'zh',
            toText:'中文',
            focus:false,
            translateResult:{},
            translateResultText:'',
            translatedResult:[]
        }
    }
    static navigationOptions = {
      // title:'易翻译',
      //   headerLeft:(
      //       <Icon name={'ios-menu'} size={30} color={'#fff'}/>
      //   ),
      //   headerStyle:{
      //     backgroundColor:THEME_COLOR,
      //       paddingLeft:20
      //   },
      //   headerTitleStyle:{
      //     color:'#fff'
      //   }
        drawerLabel:'首页',
        drawerIcon:()=>(
            <Icon name={'md-home'} size={30}/>
        )
    };

    //从本地存储中获取翻译历史
    getTranslatedResult=()=>{
        storage.getAllDataForKey('translateResult').then(translatedResult=>{
            this.setState({
                translatedResult
            });
        })
    };
    componentDidMount(){
        this.getTranslatedResult()
    }
    openModal = () =>{
        this.refs.calendarstart.open()
        this.refs.blurInput.blur()
        this.setState({
            focus:true
        })
    }
    closeModal = () =>{
        this.refs.calendarstart.close()
    }
    //输入文字时实时翻译
    onChangeTranslate= (q) =>{
        let md5Text = API_CONFIG.APP_ID+q+API_CONFIG.SALT+API_CONFIG.APP_KEY;
        let sign = md5.md5(md5Text);
        axios.get(API_CONFIG.URL,{
            params:{
                q,
                from:this.state.from,
                to:this.state.to,
                appid:API_CONFIG.APP_ID,
                salt:API_CONFIG.SALT,
                sign
            }
        }).then(response=>{
            let res = response.data;
            let trans_result = res.trans_result[0];
            trans_result.collectedStatus = false;
            this.setState({
                translateResult:trans_result,
                translateResultText:res.trans_result[0].dst
            })
        }).catch(err=>{
            console.log(err)
        })
    };
    //降翻译结果保存到本地存储
    saveTranslateResult(){
        let {translateResult} = this.state;
        storage.save({
            key:'translateResult',
            id:translateResult.src,
            data:{
                translateResult
            }
        })
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#eee'}}>
                <Header title='首页'/>
                <View style={styles.langWrap}>
                    <Select
                        style={styles.select}
                        valueStyle={styles.valueStyle}
                        value={this.state.fromText}
                        items={LANG_LIST}
                        getItemValue={(item, index) => item.value}
                        getItemText={(item, index) => item.text}
                        iconTintColor={THEME_COLOR}
                        placeholder='Select item'
                        pickerTitle='选择语言'
                        onSelected={(item, index) => this.setState({from: item.value,fromText:item.text})}
                    />
                    <Icon style={{fontWeight:'700'}} name='ios-swap' size={30} color={this.state.from==='auto'?THEME_COLOR:'#ccc'}/>
                    <Select
                        style={styles.select}
                        valueStyle={styles.valueStyle}
                        value={this.state.toText}
                        items={LANG_LIST}
                        getItemValue={(item, index) => item.value}
                        getItemText={(item, index) => item.text}
                        iconTintColor={THEME_COLOR}
                        placeholder='Select item'
                        pickerTitle='选择语言'
                        onSelected={(item, index) => this.setState({to: item.value,toText:item.text})}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput ref='blurInput' onFocus={this.openModal} placeholder='输入需要翻译的文本'/>
                </View>
                <View style={{flex:1}}>
                    <FlatList
                        style={styles.translatedResult}
                        data={this.state.translatedResult}
                        renderItem={({item})=>(
                            <TranslateResultItem translateResult={item}/>
                        )}
                    />
                </View>
                <Modal
                    backdropPressToClose={true}
                    position='top'
                    keyboardTopOffset={0}
                    ref={"calendarstart"}>
                    <View>
                        <View style={styles.translateItem}>
                            <Input onEndEditing={()=>this.saveTranslateResult()} clearButtonMode={'while-editing'} onChangeText={(q)=>this.onChangeTranslate(q)}  autoFocus={this.state.focus} placeholder={'输入文字'+'('+this.state.fromText+')'}/>
                        </View>
                        <View style={styles.translateItem}>
                            <Input disabled={true} value={this.state.translateResultText} placeholder='输入文字'/>
                        </View>
                        <TouchableHighlight underlayColor={'#fff'} onPress={this.closeModal}>
                            <Icon style={styles.exitIcon} name='ios-close' color='#333' size={40}/>
                        </TouchableHighlight>

                    </View>
                </Modal>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 20,
        padding: 10,
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    langWrap:{
        marginTop:5,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'#fff'
    },
    inputWrapper:{
      backgroundColor:'#fff'
    },
    select:{
        borderWidth:0
    },
    valueStyle:{
        fontSize:20,
        color:THEME_COLOR
    },
    translateItem:{

    },
    exitIcon:{
        alignSelf:'center',
        marginTop:20,
    },
    translatedResult:{
        marginTop:10,
        paddingLeft:10,
        paddingRight:10,
    }
});
