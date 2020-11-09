import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementar, reduzir } from './store/contador';

const Contador = () => {
  const contador = useSelector(state => state.contador);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(incrementar())}>+</button>
      <button onClick={() => dispatch(reduzir())}>-</button>
      {contador}
    </div>
  );
};

export default Contador;
