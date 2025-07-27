import React, { JSX } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    VeniceblogStreets,
    VeniceinfoStreets,
    VeniceloadStreets,
    VenicemapStreets,
    VenicereadblogStreets,
    VenicereadplaceStreets,
    VenicerecommendStreets,
    VenicesavedStreets
} from './VeniceStreets/venicecmns/Venicescrnsstreets';

export type RootStackParamList = {
    VeniceblogStreets: undefined;
    VeniceloadStreets: undefined;
    VeniceinfoStreets: undefined;
    VenicemapStreets: undefined;
    VenicereadblogStreets: undefined;
    VenicereadplaceStreets: undefined;
    VenicerecommendStreets: undefined;
    VenicesavedStreets: undefined;
};

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {

  return (
      <NavigationContainer>
            <Stack.Navigator
                initialRouteName="VeniceloadStreets"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="VeniceblogStreets"
                    component={VeniceblogStreets}
                />
                <Stack.Screen
                    name="VeniceloadStreets"
                    component={VeniceloadStreets}
                />
                <Stack.Screen
                    name="VeniceinfoStreets"
                    component={VeniceinfoStreets}
                />
                <Stack.Screen
                    name="VenicemapStreets"
                    component={VenicemapStreets}
                />
                <Stack.Screen
                    name="VenicereadblogStreets"
                    component={VenicereadblogStreets}
                />
                <Stack.Screen
                    name="VenicereadplaceStreets"
                    component={VenicereadplaceStreets}
                />
                <Stack.Screen
                    name="VenicerecommendStreets"
                    component={VenicerecommendStreets}
                />
                <Stack.Screen
                    name="VenicesavedStreets"
                    component={VenicesavedStreets}
                />
            </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
