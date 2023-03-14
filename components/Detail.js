import { StyleSheet, Image, Text, ScrollView, Fragment, View } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function DetailCocktail({ id }) {
    const [cocktail, setCocktail] = useState(null)

    const getIngredientImage = (ingredientName) => {
      return `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data = await response.json()
            setCocktail(data.drinks[0])
        }
        fetchData()
    }, [id])

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
          {cocktail &&
            <View style={styles.container}>
              <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
              <Text style={styles.title}>{cocktail.strDrink}</Text>
              <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
              <View>
                {[...Array(15)].map((_, i) => {
                  const ingredient = cocktail[`strIngredient${i + 1}`]
                  const measure = cocktail[`strMeasure${i + 1}`]
                  if (ingredient) {
                    const ingredientImageUrl = getIngredientImage(ingredient);
                    return (
                      <View style={styles.ingredientContainer} key={i}>
                        <Image source={{ uri: ingredientImageUrl }} style={styles.ingredientImage} />
                        <Text style={styles.ingredient}>{ingredient}</Text>
                        <Text style={styles.measure}>{measure}</Text>
                      </View>
                    );
                  } else {
                  return null;
                  }
                })}
              </View>     
            </View>
          }
        </ScrollView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 100,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  ingredientsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  ingredientTextContainer: {
    flex: 1,
  },
  ingredient: {
    fontSize: 18,
    marginBottom: 5,
  },
  measure: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'grey',
    marginLeft: 10,
  },
});