import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
    name: "application",
    initialState: {
        loading: false,
        applicants:[]
    },
    reducers: {
        setApplicants:(state, action)=> {
            state.applicants = action.payload;
        },
    }
});
export const { setApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;