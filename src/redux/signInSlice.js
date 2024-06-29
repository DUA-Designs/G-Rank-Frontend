import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import axios from 'axios';

//  export const userAPI=createAsyncThunk('signInSlice',  async ({employeeID})=>{
 
  
        
//    try {
//      const res = await axios.get(`https://g-rank-backend.onrender.com/active?EmployeeID=${employeeID}`);
     
//      return res.data.user;
//    } catch (err) {
//      return err;
//    }
   
   
//  }
//  );
 





export const checkUserSignIn=createSlice({
  name:"signIn",
  initialState:{
    value:false,
    status:"idle"
  },
  reducers: {
    signInChecker( state,action ) {
      state.value=action.payload?action.payload:false;
    }
  } 
//   ,extraReducers(builder){
//        builder.addCase(userAPI.fulfilled,(state,action)=>{
//         state.value=action.payload
//         state.status="success"
//        })
//        builder.addCase(userAPI.rejected,(state,action)=>{
//         state.value={}
//         state.status= action.error.message
//        })
//   }
  
 
 
   
 




 });
export const { signInChecker  } = checkUserSignIn.actions
 

export default checkUserSignIn.reducer;