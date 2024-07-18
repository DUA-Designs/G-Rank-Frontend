   function ActiveTasksUI2(){


 
    let filledObject=[];

for ( let i=0;i<activeTasks.length;i++){
  
 
 
            filledObject.push(  {Id:activeTasks[i].id,Task:activeTasks[i].Task,Department:activeTasks[i].Department,Priority:activeTasks[i].Priority,Description:activeTasks[i].Description,Deadline:activeTasks[i].Deadline,startedDate:activeTasks[i].startedDate,endDate:activeTasks[i].endDate,Status:activeTasks[i].Progress,Checklist:activeTasks[i].selectedTask,Dev:activeTasks[i].Dev ,Action:<i class="pi pi-plus"></i>})
           

            

}
 

    const completedData = {
      

        getTreeTableNodesData() {
            return  filledObject;
        },

        getTreeTableNodes() {
            return Promise.resolve(this.getTreeTableNodesData());
        },

         
    };
    completedData.getTreeTableNodes().then((data) => setCompleted(data));



    }
  