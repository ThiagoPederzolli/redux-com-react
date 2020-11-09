import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilters, selectUniqueColors } from './store/products';

const Filter = () => {
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [selectedColors, setselectedColors] = React.useState([]);
  const colors = useSelector(selectUniqueColors);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(changeFilters({ name: 'colors', value: selectedColors }));
  }, [selectedColors, dispatch]);

  React.useEffect(() => {
    dispatch(
      changeFilters({
        name: 'prices',
        value: {
          min: Number(minPrice),
          max: Number(maxPrice),
        },
      }),
    );
  }, [minPrice, maxPrice, dispatch]);

  function handleChange({ target }) {
    if (target.checked) {
      setselectedColors([...selectedColors, target.value]);
    } else {
      setselectedColors(selectedColors.filter(color => color !== target.value));
    }
  }

  function handleChecked(color) {
    return selectedColors.includes(color);
  }
  return (
    <div>
      <input
        type="number"
        value={minPrice}
        placeholder="min"
        onChange={({ target }) => setMinPrice(target.value)}
      />
      <input
        type="number"
        value={maxPrice}
        placeholder="max"
        onChange={({ target }) => setMaxPrice(target.value)}
      />
      {colors.map(color => (
        <label key={color}>
          <input
            type="checkbox"
            value={color}
            checked={handleChecked(color)}
            onChange={handleChange}
          />
          {color}
        </label>
      ))}

      {/* <label>
        <input
          type="checkbox"
          value="rosa"
          checked={handleChecked('rosa')}
          onChange={handleChange}
        />
        Rosa
      </label> */}
    </div>
  );
};

export default Filter;
