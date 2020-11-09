import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewPhotos } from '../store/photos';
import styles from './PhotosLoadMore.module.css';
import Loading from './Helper/Loading';

const PhotosLoadMore = () => {
  const dispatch = useDispatch();
  const { page, infinite, loading } = useSelector(state => state.photos);
  function handleClick() {
    dispatch(loadNewPhotos(page + 1));
  }
  if (loading) return <Loading />;
  if (!infinite) return null;
  return (
    <button onClick={handleClick} className={styles.button}>
      +
    </button>
  );
};

export default PhotosLoadMore;
