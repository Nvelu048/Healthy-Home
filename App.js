/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {HistoryOfVisit, ViewVisit, Visit} from './src/Screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
const Stack = createStackNavigator();

const Screens = Object.freeze({
  HISTORY_OF_VISIT: 'Healthy Home',
  CREATE_VISIT: 'Create Visit',
  VIEW_VISIT: 'View Visit',
});

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screens.HISTORY_OF_VISIT}>
        <Stack.Screen
          name={Screens.HISTORY_OF_VISIT}
          component={HistoryOfVisit}
        />
        <Stack.Screen name={Screens.VIEW_VISIT} component={ViewVisit} />
        <Stack.Screen name={Screens.CREATE_VISIT} component={Visit} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export {Screens};

export default App;
