import { combineReducers } from '@reduxjs/toolkit';
import createAsyncSlice from './helper/createAsyncSlice';
import getLocalStorage from './helper/getLocalStorage';

const token = createAsyncSlice({
  name: 'token',
  initialState: {
    data: {
      token: getLocalStorage('token', null),
    },
  },
  reducers: {
    fetchSuccess: {
      reducer(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: 'token',
              value: payload.token,
            },
          },
        };
      },
    },
  },
  fetchConfig: user => ({
    url: 'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  }),
});

const user = createAsyncSlice({
  name: 'user',
  fetchConfig: token => ({
    url: 'https://dogsapi.origamid.dev/json/api/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  }),
});

const reducer = combineReducers({ token: token.reducer, user: user.reducer });

const fetchToken = token.asyncAction;
const fetchUser = user.asyncAction;
export default reducer;
export const login = user => async dispatch => {
  try {
    const { payload } = await dispatch(fetchToken(user));
    console.log(payload);
    if (payload.token !== undefined) await dispatch(fetchUser(payload.token));
  } catch (error) {}
};

export const autoLogin = () => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.login.token.data;
  if (token) await dispatch(fetchUser(token));
};

// export default slice.reducer;

// const slice = createSlice({
//   name: 'login',
//   initialState: {
//     token: {
//       loading: false,
//       data: null,
//       error: null,
//     },
//     user: {
//       loading: false,
//       data: null,
//       error: null,
//     },
//   },
//   reducers: {
//     fetchTokenStarted(state) {
//       state.token.loading = true;
//     },
//     fetchTokenSuccess(state, action) {
//       state.token.loading = false;
//       state.token.data = action.payload;
//       state.token.error = null;
//     },
//     fetchTokenError(state, action) {
//       state.token.loading = false;
//       state.token.data = null;
//       state.token.error = action.payload;
//     },
//     fetchUserStarted(state) {
//       state.user.loading = true;
//     },
//     fetchUserSuccess(state, action) {
//       state.user.loading = false;
//       state.user.data = action.payload;
//       state.user.error = null;
//     },
//     fetchUserError(state, action) {
//       state.user.loading = false;
//       state.user.data = null;
//       state.user.error = action.payload;
//     },
//   },
// });
// const {
//   fetchTokenError,
//   fetchTokenStarted,
//   fetchTokenSuccess,
//   fetchUserError,
//   fetchUserStarted,
//   fetchUserSuccess,
// } = slice.actions;
// export const fetchToken = user => async dispatch => {
//   try {
//     dispatch(fetchTokenStarted());
//     const response = await fetch(
//       'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       },
//     );
//     const data = await response.json();
//     return dispatch(fetchTokenSuccess(data));
//   } catch (error) {
//     return dispatch(fetchTokenError(error.message));
//   }
// };

// export const fetchUser = token => async dispatch => {
//   try {
//     dispatch(fetchUserStarted());
// const response = await fetch('https://dogsapi.origamid.dev/json/api/user', {
//   method: 'GET',
//   headers: {
//     Authorization: 'Bearer ' + token,
//   },
//     });
//     const data = await response.json();
//     return dispatch(fetchUserSuccess(data));
//   } catch (error) {
//     return dispatch(fetchUserError(error.message));
//   }
// };
