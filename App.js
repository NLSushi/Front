import React from 'react';
import { View, StyleSheet } from 'react-native';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import Navigation from './src/navigation';

Amplify.configure(config);

const App = () => {
  
  return (
    <View style={styles.default}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: '#7382B5',
    fontFamily: 'Roboto'
},
})

export default App;
