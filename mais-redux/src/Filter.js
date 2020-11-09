import React from 'react';
import { useSelector } from 'react-redux';
const selectUniqueColors = ({ products }) =>
  Array.from(new Set(products.data.map(({ color }) => color)));

const Filter = () => {
  // const colors = ['azul', 'rosa', 'preta'];
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [selectedColors, setselectedColors] = React.useState([]);
  const colors = useSelector(selectUniqueColors);
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
