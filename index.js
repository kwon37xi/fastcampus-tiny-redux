import { createStore } from "./redux.js";

const COUNTER = "count";
const FETCH = "fetch";

const middleware1 = (store) => (dispatch) => (action) => {
  if (action.type === FETCH) {
    setTimeout(() => {
      dispatch({
        type: "fetch-response",
        payload: [1, 2, 3],
      });
    }, 2000);
  } else {
    dispatch(action);
  }
};

function reducer(state, action) {
  if (action.type === "count") {
    return { ...state, counter: action.payload.counter };
  }

  if (action.type === "fetch-response") {
    return { ...state, response: action.payload };
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

const store = createStore(reducer, [middleware1]);

store.subscribe(listener);

function counter(data) {
  store.dispatch(actionCreator(COUNTER, data));
}

counter({ counter: 1 });
store.dispatch(actionCreator(FETCH));
