import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Card from './Card';

const { width } = Dimensions.get('window');

const cardsData = ['♠️', '♥️', '♦️', '♣️'];

const Deck = () => {
  const [cards, setCards] = useState(cardsData);

  const moveCardToBack = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card
          key={card}
          label={card}
          index={index}
          isTop={index === 0}
          onSwipeEnd={moveCardToBack}
        />
        
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Deck;
