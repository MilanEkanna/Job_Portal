import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        jobsFilter: [],
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setJobsFilter: (state, action) => {
            if (!state.jobsFilter.includes(action.payload)) {
                state.jobsFilter = [...state.jobsFilter || [], action.payload];
            }
            console.log(state.jobsFilter);
        },
        removeJobFromFilter: (state, action) => {
            state.jobsFilter = (state.jobsFilter || []).filter(item => item !== action.payload);
            console.log(state.jobsFilter);
        },
        disSelectAllFilters: (state, action) => {
            state.jobsFilter = []
        }
    }
});

export const { 
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setJobsFilter,
    removeJobFromFilter ,
    disSelectAllFilters
} = jobSlice.actions;

export default jobSlice.reducer;
