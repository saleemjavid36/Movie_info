import { createSlice } from '@reduxjs/toolkit'
export const homeSlice = createSlice({
  name: 'home',
  initialState:{
    url:{},
    genres:{}
  },
  reducers: {
    getAPiConfiguration:(state,action) =>{
        state.url = action.payload
    },
    getGeneres:(state,action)=>{
        state.genres = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getAPiConfiguration,getGeneres} = homeSlice.actions

export default homeSlice.reducer