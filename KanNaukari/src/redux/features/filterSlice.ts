import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IFilterState {
  job_city: string;
  search_key: string;
  job_type: string;
  job_experience: string;
  english_fluency: string;
  Experience: string[];
  job_skills: string[];
  tags: string[];
}

// Define the initial state using that type
const initialState: IFilterState = {
  job_city: "",
  search_key: "",
  job_type: "",
  job_experience: "",
  english_fluency: "",
  Experience: [],
  job_skills: [],
  tags: [],
};

export const filterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      if (state.job_city === action.payload) {
        state.job_city = "Select Location";
      } else {
        state.job_city = action.payload;
      }
    },
    setJobType: (state, action: PayloadAction<string>) => {
      if (state.job_type === action.payload) {
        state.job_type = "";
      } else {
        state.job_type = action.payload;
      }
    },
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.search_key = action.payload
    },
    setEnglishFluency: (state, action: PayloadAction<string>) => {
      if (state.english_fluency === action.payload) {
        state.english_fluency = "";
      } else {
        state.english_fluency = action.payload;
      }
    },
    setExperience: (state, action: PayloadAction<string>) => {
      if (state.Experience.includes(action.payload)) {
        state.Experience = state.Experience.filter((e) => e !== action.payload);
      } else {
        state.Experience.push(action.payload);
      }
    },
    setcategory: (state, action: PayloadAction<string>) => {
      if (state.job_skills.includes(action.payload)) {
        state.job_skills = state.job_skills.filter((c) => c !== action.payload);
      } else {
        state.job_skills.push(action.payload);
      }
    },
    setTags: (state, action: PayloadAction<string>) => {
      if (state.tags.includes(action.payload)) {
        state.tags = state.tags.filter((t) => t !== action.payload);
      } else {
        state.tags.push(action.payload);
      }
    },
    resetFilter: (state) => {
      state.job_city = "";
      state.job_type = "";
      state.english_fluency = "";
      state.job_skills = [];
      state.tags = [];
      state.Experience = [];
    },
    resetSkills: (state) => {
        state.job_skills = [];
      
    },
    resetExperience: (state) => {
        state.Experience = [];
      
    },
    
  },
});

export const {
  setLocation,
  setcategory,
  setExperience,
  setJobType,
  setTags,
  resetFilter,
  resetSkills,
  resetExperience,
  setEnglishFluency,
  setSearchKey,
} = filterSlice.actions;

export default filterSlice.reducer;
