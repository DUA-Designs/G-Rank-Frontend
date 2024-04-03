import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import axios from 'axios';

 export const userAPI=createAsyncThunk('user/userAPI',  async ({employeeID})=>{
 
  
        
   try {
     const res = await axios.get(`https://g-rank-backend.onrender.com/active?EmployeeID=${employeeID}`);
     
     return res.data.user;
   } catch (err) {
     return err;
   }
   
   
 }
 );
 





export const assignUser=createSlice({
  name:"user",
  initialState:{
    value:{},
    status:"idle"
  },
  reducers: {
    currentUser( state,action ) {
      state.value=action.payload?action.payload:[];
    }
  } 
  ,extraReducers(builder){
       builder.addCase(userAPI.fulfilled,(state,action)=>{
        state.value=action.payload
        state.status="success"
       })
       builder.addCase(userAPI.rejected,(state,action)=>{
        state.value={}
        state.status= action.error.message
       })
  }
  
 
 
   
 




 });
export const { currentUser  } = assignUser.actions
 

export default assignUser.reducer;