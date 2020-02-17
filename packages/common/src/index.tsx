import * as React from 'react';
import { useContext } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import { CounterStoreContext } from './stores/CounterStore';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {
  const counterStore = useContext(CounterStoreContext);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text>Hello, World</Text>
        <Text>{counterStore.count}</Text>
        <Button title="increment" onPress={() => counterStore.increment()} />
        <Button title="decrement" onPress={() => counterStore.decrement()} />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
