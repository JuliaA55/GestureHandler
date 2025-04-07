import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

interface Props {
  label: string;
  index: number;
  isTop: boolean;
  onSwipeEnd: () => void;
}

const Card = ({ label, index, isTop, onSwipeEnd }: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1 - index * 0.05);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value + index * 10 },
      { rotateZ: `${rotateZ.value}deg` },
      { scale: scale.value },
    ],
    zIndex: 100 - index,
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (!isTop) return;
      translateX.value = e.translationX;
      translateY.value = e.translationY;
      rotateZ.value = e.translationX / 20;
    })
    .onEnd((e) => {
      if (!isTop) return;

      if (Math.abs(e.translationX) > SWIPE_THRESHOLD) {
        translateX.value = withTiming(e.translationX > 0 ? width * 1.5 : -width * 1.5, {}, () => {
          translateX.value = 0;
          translateY.value = 0;
          rotateZ.value = 0;
          scale.value = 1;
          runOnJS(onSwipeEnd)();
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotateZ.value = withSpring(0);
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.text}>{label}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: 300,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default Card;
