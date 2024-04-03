import { createSlice } from '@reduxjs/toolkit'

 


export const employees=createSlice({
  name:"employees",
  initialState:{
    value:[]
  },
  reducers: {
    allEmps( state,action ) {
      state.value=action.payload?action.payload:[];
      
    }

  }




});
export const { allEmps } = employees.actions

export default employees.reducer;