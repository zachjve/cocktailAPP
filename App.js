import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Tout les commentaires sur l'explication du code ce trouvent dans le fichier readme.

import ListCocktail from './components/List';
import DetailCocktail from './components/Detail';
import LoginScreen from './components/User';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <ListCocktail></ListCocktail>
  );
}

const UserScreen = () => {
  return (
    <LoginScreen></LoginScreen>
  );
}
 
const DetailScreen = ({ route }) => {
  if (route.params !== undefined) {
    const { id } = route.params;
      return (
        <DetailCocktail id={id}></DetailCocktail>
      );
  }
  return (
    <DetailCocktail id={11007}></DetailCocktail>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Refresh screen for new cocktails!" 
          component={HomeScreen} 
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{
            tabBarShowLabel: false, 
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wine-outline" size={size} color={color} />
            ),
            headerShown: false,
          }} 
        />
        <Tab.Screen 
          name="User" 
          component={UserScreen} 
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
            headerShown: false,
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
