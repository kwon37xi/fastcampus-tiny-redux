import { createStore } from "./redux.js";

const COUNTER = "count";

function reducer(state, action) {
  if (action.type === "count") {
    return { ...state, counter: action.payload.counter };
  }
  return state;
}

function listener() {
  console.log(store.getState());
}

function actionCreator(type, payload) {
  return {
    type,
    payload,
  };
}

const store = createStore(reducer);

store.subscribe(listener);

function counter(data) {
  store.dispatch(actionCreator(COUNTER, data));
}

counter({ counter: 1 });
counter({ counter: 2 });
