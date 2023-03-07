import { StyleSheet, Text, Image, View, FlatList, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ListCocktail() {
    const [cocktails, setCocktails] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            const cocktails = [];
            for (let i=0; i < 10; i++) {
                cocktails.push(fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(res => res.json()));
            }
            const data = await Promise.all(cocktails)
            setCocktails(data.map(cocktail => ({
                id: cocktail.drinks[0].idDrink,
                name: cocktail.drinks[0].strDrink,
                photo: cocktail.drinks[0].strDrinkThumb,
            })))
        }
        fetchData()
    }, []);

    const renderItem = ({ item }) => (
        <Pressable id={item.id} onPress={() => navigation.navigate('Detail', { id: item.id })}>
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.photo }} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
        </Pressable>
    );
    
    return (
        <FlatList
            data={cocktails}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      backgroundColor: 'white', 
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 20,
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
  });
