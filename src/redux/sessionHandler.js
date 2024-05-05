import { createSlice } from '@reduxjs/toolkit'

 


export const sessionHandler=createSlice({
  name:"session",
  initialState:{
    value:"Inactive"
  },
  reducers: {
    userLogout( state  ) {
      state.value="Logout";
      
    },userLogin(state){
        state.value="Login";
    }
     
    

  }




});
export const { userLogout,userLogin } = sessionHandler.actions

export default sessionHandler.reducer;