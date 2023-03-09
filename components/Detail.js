import { StyleSheet, Image, Text, ScrollView, View } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function DetailCocktail({ id }) {
    const [cocktail, setCocktail] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data = await response.json()
            setCocktail(data.drinks[0])
        }
        fetchData()
    }, [id])

    return (
        <ScrollView>
          {cocktail ? (
            <View style={styles.container}>
              <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
              <Text style={styles.title}>{cocktail.strDrink}</Text>
              <Text style={styles.subtitle}>{cocktail.strCategory}</Text>
              <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
              {Object.keys(cocktail)
                .filter((key) => key.startsWith('strIngredient') && cocktail[key])
                .map((ingredientKey) => (
                <>
                    <Text key={ingredientKey} style={styles.ingredient}>
                        {cocktail[ingredientKey]}
                    </Text>
                    <Text key={`measure_${ingredientKey}`} style={styles.measure}>
                        {cocktail[`strMeasure${ingredientKey.slice(13)}`]}
                    </Text>
                </>
                ))
              }
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    instructions: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 30,
    },
    ingredient: {
      fontSize: 16,
      marginBottom: 5,
    },
    measure: {
      fontSize: 14,
      fontStyle: 'italic',
      color: 'grey',
      marginBottom: 10,
    },
  });