import { observable, action } from 'mobx';
import { createContext } from 'react';

class CounterStore {
  @observable count = 0;

  @action increment() {
    this.count += 1;
  }

  @action decrement() {
    this.count -= 1;
  }
}

export const CounterStoreContext = createContext(new CounterStore());
