import { configureStore } from '@reduxjs/toolkit'
import userReducer from './counterSlice';
import Employees from './employeeSlice';
import formActiveSlice from './formSlice';
import tasksReducer from './dueTaskSlice';
import activeTasksReducer from './activeTasksSlice';

export default configureStore({
  reducer: {
    user:userReducer,employees:Employees,formActive: formActiveSlice,tasks:tasksReducer,activeTasks:activeTasksReducer
  }
})
