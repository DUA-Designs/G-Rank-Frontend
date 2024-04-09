import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import axios from 'axios';

 export const tasksAPI=createAsyncThunk('tasks/tasksAPI',  async ( )=>{
 
  
        
   try {
     const res = await axios.get(`https://g-rank-backend.onrender.com/getTasks`);
     
     return res.data.tasks;
   } catch (err) {
     return err;
   }
   
   
 }
 );
 





export const getTasks=createSlice({
  name:"tasks",
  initialState:{
    value:[],
     
     
  },
  reducers: {
    
  } 
  ,extraReducers(builder){
       builder.addCase(tasksAPI.fulfilled,(state,action)=>{
        state.value=action.payload
       
       })
       builder.addCase(tasksAPI.rejected,(state,action)=>{
        state.value=[]
      
       })
  }
  
 
 
   
 




 });
 
 

export default getTasks.reducer;