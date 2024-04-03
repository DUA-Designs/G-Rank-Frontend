import { createSlice } from '@reduxjs/toolkit'

 


export const formSlice=createSlice({
  name:"formActive",
  initialState:{
    value:"none"
  },
  reducers: {
    change( state,action ) {
      state.value=action.payload ;
      
    }

  }




});
export const { change } = formSlice.actions

export default formSlice.reducer;