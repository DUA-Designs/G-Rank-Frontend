import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import axios from 'axios';

 export const activeTasksAPI=createAsyncThunk('activeTasks/activeTasksAPI',  async ( )=>{
 
  
        
   try {
     const res = await axios.get("https://g-rank-backend.onrender.com/activeTasks");
    
     
     return res.data.tasks;
   } catch (err) {
     return err;
   }
   
   
 }
 );
 





export const activeTasks=createSlice({
  name:"activeTasks",
  initialState:{
    value:[],
    status:"idle"
  },
  reducers: {
    
  } 
  ,extraReducers(builder){
       builder.addCase(activeTasksAPI.fulfilled,(state,action)=>{
        state.value=action.payload
        state.status="success"
       })
       builder.addCase(activeTasksAPI.rejected,(state,action)=>{
        state.value=[]
        state.status= action.error.message
       })
  }
  
 
 
   
 




 });
 
 

export default activeTasks.reducer;