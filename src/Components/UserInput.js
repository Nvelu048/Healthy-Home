import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import Fonts from '../Util/fonts';

const UserInput = (props) => {
  return (
    <View style={styles.userInput}>
      <Text
        style={[
          styles.textField,
          {
            flex: 1,
            fontWeight: 'bold',
            textAlign: 'right',
            alignSelf: 'flex-start'
          },
        ]}
        text>
        {props.name}
      </Text>
      <TextInput
        placeholder={props.placeholder}
        multiline={props.multiline ? true : false}
        style={[
          styles.textField,
          {flex: 1, alignSelf: 'flex-start'},
        ]}
        value={props.value}
        onChangeText={(text) => props.setValue(text)}
      />
    </View>
  );
};

UserInput.defaults = {
  userInputProps: {},
};

const styles = StyleSheet.create({
  userInput: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  textField: {
    fontSize: Fonts.Large,
  },
});

export default UserInput;
