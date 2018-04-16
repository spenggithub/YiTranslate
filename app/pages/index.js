import React,{PureComponent} from 'react'
import Home from './home'
import Draw from './draw'
import Collection from './Collection'

import {StackNavigator,DrawerNavigator} from 'react-navigation'
export const StackNav = DrawerNavigator({
    Home:{screen:Home},
    Collection:{screen:Collection}
});
