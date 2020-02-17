import * as React from 'react';
import { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CounterStoreContext } from './stores/CounterStore';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {
  const counterStore = useContext(CounterStoreContext);

  return (
    <View style={styles.container}>
      <Text>Hello, World</Text>
      <Text>{counterStore.count}</Text>
      <Button title="increment" onPress={() => counterStore.increment()} />
      <Button title="decrement" onPress={() => counterStore.decrement()} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
