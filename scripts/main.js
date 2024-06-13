let exampleArray = [
    {'taskName': 'Task 1','taskLabel':'huis', 'taskStatus':'To do', 'taskCreated':'06/06/2024', 'taskDue':'26/06/2024' , 'taskDescription': 'Description 1'},
    {'taskName': 'Task 2','taskLabel':'werk', 'taskStatus':'Completed', 'taskCreated':'03/06/2024', 'taskDue':'10/06/2024' , 'taskDescription': 'Description 2'},
    {'taskName': 'Task 3','taskLabel':'school', 'taskStatus':'Started', 'taskCreated':'01/06/2024', 'taskDue':'15/06/2024' , 'taskDescription': 'Description 3'},
    {'taskName': 'Task 4','taskLabel':'werk', 'taskStatus':'To do', 'taskCreated':'06/06/2024', 'taskDue':'26/06/2024' , 'taskDescription': 'Description 4'},
    {'taskName': 'Task 5','taskLabel':'school', 'taskStatus':'Completed', 'taskCreated':'03/06/2024', 'taskDue':'10/06/2024' , 'taskDescription': 'Description 5'},
    {'taskName': 'Task 6','taskLabel':'huis', 'taskStatus':'Started', 'taskCreated':'01/06/2024', 'taskDue':'15/06/2024' , 'taskDescription': 'Description 6'},
];


/*
    * we click on the modal and get a form to fill in the task
    * we click on the save button to save the task
    * assemble inputs into an object
    * set the object to local storage
    * check what the key or oder is, log on console 
    * 
    * FUNCTION save tasks to local storage.
    * tasks are saved to local storage as a json object DONE 
    * 
    * FUNCTION get tasks from local storage
    * this part of the code needs to be repeated everytime a task is edited or created. 
    * we get the tasks from local storage
    * FUNCTION display tasks
    * for each task
    * check the status 
    * use the status to call the class of the correct accrodion 
    * * FUNCTION that passes html for the row of the table with the task.
    * 
    * each task has a button to edit the task (displayed in the table row)
    * when the button is clicked the modal opens with the form filled in with the task details
    * user can edit the task and save it. 
    * the tables are then populated again. 
    * 
    * each task has a button to delete the task (displayed in the table row)
    * when the button is clicked the task is deleted from the local storage
    * the tables are then populated again.
    * 
    * 
    */

// FUNCTION save tasks to local storage.

function saveTask() {
    // get the values from the form
    let taskName = document.getElementById('taskFormName').value;
    let taskLabel = document.getElementById('taskFormLabel').value;
    let taskStatus = document.getElementById('taskFormStatus').value;
    let taskCreated = document.getElementById('taskFormCreated').value;
    let taskDue = document.getElementById('taskFormDue').value;
    let taskDescription = document.getElementById('taskFormDescription').value;
    // assemble the values into an object
    let task = {'taskName': taskName,'taskLabel':taskLabel, 'taskStatus':taskStatus, 'taskCreated':taskCreated, 'taskDue':taskDue , 'taskDescription': taskDescription};
    // primary key for the task
    let taskId = Date.now()
    // save the task to local storage as json object
    localStorage.setItem(taskId, JSON.stringify(task));
    //console.log(localStorage);
}

// FUNCTION get tasks from local storage
function getTasks() {
    // get all the keys from local storage
    let keys = Object.keys(localStorage);
    // for each key get the task
    keys.forEach(key => {
        let task = JSON.parse(localStorage.getItem(key));
        console.log(task);
    });
}