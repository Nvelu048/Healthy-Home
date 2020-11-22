import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
const Button = (props) => {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </Pressable>
  );
};

Button.defaultProps = {
  text: 'Hello World',
  onPress: () => console.log('TODO:'),
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 6,
    height: 60,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Button;
