function reducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return state + 1;
    case 'REDUZIR':
      return state - 1;
    default:
      return state;
  }
}

const logger = store => next => action => {
  console.group(action.type);
  console.log('ACTION', action);
  console.log('PREV_STATE', store.getState());
  // const result = next(action);
  console.log('NEW_STATE', store.getState());
  console.groupEnd();
  return next(action);
};

// const reduzirMiddle = store => next => action => {
//   if (action.type === 'REDUZIR') window.alert('REDUZIU');
//   return next(action);
// };

// const { applyMiddleware, compose } = Redux;
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// reduzirMiddle;
// const enhancer = composeEnhancers(applyMiddleware(logger));

// Desestrutução das funções do Redux (não é necessário, podemos usar Redux.compose)
const { compose, applyMiddleware } = Redux;
// Verifica se __REDUX_DEVTOOLS_EXTENSION__COMPOSE__ existe, se nõa usa o compose puro.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Aplica o Middleware com o compose
const enhancer = composeEnhancers(applyMiddleware(logger));
// Utiliza a devTools + middleware como enhancer da store
const store = Redux.createStore(reducer, enhancer);

store.dispatch({ type: 'INCREMENTAR' });
store.dispatch({ type: 'INCREMENTAR' });
store.dispatch({ type: 'INCREMENTAR' });
store.dispatch({ type: 'INCREMENTAR' });
const teste = store.dispatch({ type: 'REDUZIR' });

console.log(teste);
