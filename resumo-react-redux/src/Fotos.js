import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFotos, selectOverFiveYears } from './store/fotos';

const Fotos = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.fotos);
  const fotos = useSelector(selectOverFiveYears);
  React.useEffect(() => {
    dispatch(fetchFotos(1));
  }, [dispatch]);
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (fotos)
    return (
      <ul>
        {fotos.map(foto => (
          <li key={foto.id}>{foto.title}</li>
        ))}
      </ul>
    );
  else return null;
};

export default Fotos;
