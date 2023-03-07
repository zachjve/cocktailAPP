import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListCocktail from './components/List';
import DetailCocktail from './components/Detail';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <ListCocktail></ListCocktail>
  );
}

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Favorites cocktail'z</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const DetailScreen = ({ route }) => {
  const { id } = route.params;
  return (
    <DetailCocktail id={id}></DetailCocktail>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Detail" component={DetailScreen} />
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
