import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'contador',
  initialState: {
    total: 0,
  },
  reducers: {
    incrementar(state) {
      state.total += 1;
    },
    reduzir(state) {
      state.total -= 1;
    },
    somar: {
      reducer: (state, action) => state.total + action.payload,
      prepare: payload => ({ payload, meta: 'local ' }),
    },
  },
});
export const { incrementar, reduzir, somar } = slice.actions;
export default slice.reducer;

// const slice = createSlice({
//   name: 'contador',
//   initialState: 0,
//   reducers: {
//     incrementar: state => (state += 1),
//     reduzir: state => (state -= 1),
//   },
// });
