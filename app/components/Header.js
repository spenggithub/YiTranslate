import React, {PureComponent} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {THEME_COLOR} from '../style'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'

export default class Header extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let title = this.props.title;
    return (
        <View style={styles.headerWrap}>

          <Text style={styles.title}>{title}</Text>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  headerWrap: {
    paddingTop: 20,
    paddingLeft:15,
    paddingBottom:10,
    backgroundColor: THEME_COLOR,
    justifyContent:'center'
  },
  title: {
    fontSize:20,
    color:'#fff'
  }
});
