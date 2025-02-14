
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
  
    user: null,
   
  },
  reducers: { // reducers are functions that handle actions 
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    
  },
});
export const {
  setLoading, 
  setUser, 
} = authSlice.actions;
export default authSlice.reducer;