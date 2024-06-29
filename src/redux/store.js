import { configureStore } from '@reduxjs/toolkit'
import userReducer from './counterSlice';
import Employees from './employeeSlice';
import formActiveSlice from './formSlice';
import tasksReducer from './tasks';
import activeTasksReducer from './activeTasksSlice';
import sessionHandler from './sessionHandler';
import signInReducer from './signInSlice';

export default configureStore({
  reducer: {
    user:userReducer,employees:Employees,formActive: formActiveSlice,tasks:tasksReducer,activeTasks:activeTasksReducer,session:sessionHandler,signIn:signInReducer
  }
})
