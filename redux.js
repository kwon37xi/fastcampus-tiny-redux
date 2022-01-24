// Store : 전역상태
// 전역 상태가 필요한데, 여러 컴포넌트에서 접근할 때 잘못된 수정이 발생했을 때 어디서 수정했는지 찾기 쉽게한다.
// 실제로 수정은 불가능하게 하고, 수정을 요청만 하게 한다. 수정은 한 곳에서만 일어난다.

// updater : 상태를 수정하는 유일한 함수
export function createStore(reducer, middleware = []) {
  let state;
  const handlers = [];

  function dispatch(action) {
    state = reducer(state, action);

    handlers.forEach((listener) => {
      listener();
    });
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    handlers.push(listener);
  }

  middleware = Array.from(middleware).reverse();

  const store = {
    dispatch,
    getState,
    subscribe,
  };

  let lastDispatch = dispatch;

  middleware.forEach((m) => {
    lastDispatch = m(store)(lastDispatch);
  });
  return { ...store, dispatch: lastDispatch };
}
