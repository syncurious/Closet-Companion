import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  user: {},
  isLogin: false,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const {setUserData, setIsLogin} = userReducer.actions;

export default userReducer.reducer;
