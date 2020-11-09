import React from 'react';
import { useSelector } from 'react-redux';
import Loading from './Helper/Loading';
import Login from './Login';
import Photos from './Photos';

const Content = () => {
  const { user, token } = useSelector(state => state.login);
  const loading = user.loading || token.loading;
  if (loading) return <Loading />;
  if (user.data) return <Photos />;
  else return <Login />;
};

export default Content;
