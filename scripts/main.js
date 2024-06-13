let exampleArray = [
    {'taskName': 'Task 1','taskLabel':'huis', 'taskStatus':'To do', 'taskCreated':'06/06/2024', 'taskDue':'26/06/2024' , 'taskDescription': 'Description 1'},
    {'taskName': 'Task 2','taskLabel':'werk', 'taskStatus':'Completed', 'taskCreated':'03/06/2024', 'taskDue':'10/06/2024' , 'taskDescription': 'Description 2'},
    {'taskName': 'Task 3','taskLabel':'school', 'taskStatus':'Started', 'taskCreated':'01/06/2024', 'taskDue':'15/06/2024' , 'taskDescription': 'Description 3'},
    {'taskName': 'Task 4','taskLabel':'werk', 'taskStatus':'To do', 'taskCreated':'06/06/2024', 'taskDue':'26/06/2024' , 'taskDescription': 'Description 4'},
    {'taskName': 'Task 5','taskLabel':'school', 'taskStatus':'Completed', 'taskCreated':'03/06/2024', 'taskDue':'10/06/2024' , 'taskDescription': 'Description 5'},
    {'taskName': 'Task 6','taskLabel':'huis', 'taskStatus':'Started', 'taskCreated':'01/06/2024', 'taskDue':'15/06/2024' , 'taskDescription': 'Description 6'},
];

function clearAllTables() {
    document.getElementById('tableToDo').innerHTML = '';
    document.getElementById('tableStarted').innerHTML = '';
    document.getElementById('tableCompleted').innerHTML = '';
}

function formatDateToDDMMYYYY(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-based
    let year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    return `${day}/${month}/${year}`;
} 

function preFillModalFormDate() {
    let today = new Date();
        let formattedDate = formatDateToDDMMYYYY(today);
        document.getElementById('taskFormCreated').value = formattedDate;
}
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
    let taskId = document.getElementById('taskId').value;
    if (taskId) {
        localStorage.setItem(taskId, JSON.stringify(task));
    } else {
        // Create a new task
        taskId = Date.now();
        localStorage.setItem(taskId, JSON.stringify(task));
    }

0
    //console.log(localStorage);
    main();
}

let uniqueTasks = new Set();


// function to assign individual tasks to status groups
// had hier een else staan maar dat werkte niet 
function makeStatusGroups (task, taskId) {
    if (!uniqueTasks.has(taskId)) {
        if (task.taskStatus === 'To Do') {
            statusGroups['To Do'][taskId] = task;
        }
        if (task.taskStatus === 'Started') {
            statusGroups['Started'][taskId] = task;
        }
        if (task.taskStatus === 'Completed') {
            statusGroups['Completed'][taskId] = task;
        }
    }
}

// FUNCTION get tasks from local storage
function getTasks() {
    // get all the keys from local storage
    let keys = Object.keys(localStorage);
    // for each key get the task
    keys.forEach(key => {
        let task = JSON.parse(localStorage.getItem(key));
        //console.log(task);
        makeStatusGroups(task, key);
    });
}


function populateTable(taskDictStatusGroup, tableId) {
    let table = document.getElementById(tableId);
    let rowNum = 1;
    let keys = Object.keys(taskDictStatusGroup);
    for (let key of keys) {
        let task = taskDictStatusGroup[key];
        let row = document.createElement('tr');
        row.setAttribute('data-task-id', key);
        row.innerHTML = `
            <td>
                <button class="btn btn-primary d-flex me-2" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask(${key})">Edit
                    <i class="bi bi-pencil-fill" height="40" width="40"></i>
                </button>
            </td>
            <th scope="row">${rowNum}</th>
            <td>${task.taskName}</td>
            <td>${task.taskCreated}</td>
            <td>${task.taskDue}</td>
            <td>${task.taskLabel}</td>
            <td>${task.taskStatus}</td>
            <td>${task.taskDescription}</td>
        `
        table.appendChild(row);
        rowNum++;
    }
}

function main() {
    // Clear status groups and unique task IDs to prevent duplicates
    statusGroups = {
        'To Do': {},
        'Started': {},
        'Completed': {}
    };
    uniqueTasks.clear();

    getTasks();
    clearAllTables();
    console.log(statusGroups);
    populateTable(statusGroups['To Do'], 'tableToDo');
    populateTable(statusGroups['Started'], 'tableStarted');
    populateTable(statusGroups['Completed'], 'tableCompleted');
    console.log(statusGroups);
}

main();

function editTask(taskId) {
    let task = JSON.parse(localStorage.getItem(taskId));

    document.getElementById('taskFormName').value = task.taskName;
    document.getElementById('taskFormLabel').value = task.taskLabel;
    document.getElementById('taskFormStatus').value = task.taskStatus;
    document.getElementById('taskFormCreated').value = task.taskCreated;
    document.getElementById('taskFormDue').value = task.taskDue;
    document.getElementById('taskFormDescription').value = task.taskDescription;

    // Store the task ID in a hidden input for later use
    document.getElementById('taskId').value = taskId;
}