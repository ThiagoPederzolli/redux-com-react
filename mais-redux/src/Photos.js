import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from './store/photos';

const Photos = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.photos);

  React.useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  if (!data) return null;
  return (
    <div>
      <ul>
        {data.map(photo => (
          <li key={photo.id}>
            {/* <img src={photo.src} alt={photo.title}/> */}
            {photo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;
