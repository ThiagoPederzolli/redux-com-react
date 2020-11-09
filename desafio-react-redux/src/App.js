import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, autoLogin } from './store/login';
// import { somar } from './store/contador';

function App() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  const { data } = useSelector(state => state.login.user);
  // console.log(data);
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ username, password }));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block' }} htmlFor="username">
          Usuário
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <label style={{ display: 'block' }} htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>Enviar</button>
        <p>{data?.email}</p>
      </form>
    </div>
  );
}

export default App;
