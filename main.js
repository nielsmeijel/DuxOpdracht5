
//-------------------MAKING THE MODAL WORK-------------------//

function assembleTaskBodyLocalStorage() {
    // get the values from the form
    let taskName = document.getElementById('taskFormName').value;
    let taskLabel = document.getElementById('taskFormLabel').value;
    let taskStatus = document.getElementById('taskFormStatus').value;
    let taskCreated = document.getElementById('taskFormCreated').value;
    let taskDue = document.getElementById('taskFormDue').value;
    let taskDescription = document.getElementById('taskFormDescription').value;
    // assemble the values into an object
    let taskbody = {'taskName': taskName,
        'taskLabel':taskLabel, 
        'taskStatus':taskStatus, 
        'taskCreated':taskCreated, // parsed dates for sorting
        'taskDue':taskDue , // parsed dates for sorting
        'taskDescription': taskDescription};

    return taskbody;
}

function saveTaskToLocalStorage() {

    let taskbody = assembleTaskBodyLocalStorage();
    let tasksCollection = getTasksFromLocalStorage(); // get the tasksCollection from local storage

    // get the task id if any
    let taskId = document.getElementById('taskId').value; // consider taskid is a hidden field in the modal (this is either a value or it is null)

    if (!taskId) { // if task id does not exist > the reutrn of the getElementByID is empty > 
        // Create a new task ID
        taskId = Date.now().toString();
    }

    tasksCollection[taskId] = taskbody; // add the task to the tasksCollection dictionary

    localStorage.setItem("tasksCollection", JSON.stringify(tasksCollection)); // save the tasksCollection back to local storage
    
    main();
}

//---------------------------------------------------------------//






// approach 1: get all the tasks into a variable > loop over the variable and make rows into the respective tables > 
// problems: tables are populated from first to last, get element by id is called everytime for the table and row. 

// approach 2: get all the keys from the collection > make three subgroups of keys arranged by group. 
// for each group apply a function that sorts the key list in place according to taskCreated. 


function getTasksFromLocalStorage() {
    let tasksCollection = JSON.parse(localStorage.getItem("tasksCollection")) || {}; // get the tasksCollection from local storage which should be a dictionary. if its not create an emptyy dictiónary
    return tasksCollection;
}


function sortKeysByTaskCreated(keys, taskCollection) {
    keys.sort((a, b) => {
        let dateA = Date.parse(taskCollection[a].taskCreated);
        let dateB = Date.parse(taskCollection[b].taskCreated);
        return dateA - dateB;
    });
}


function createCell(content) {
    let cell = document.createElement('td');
    cell.textContent = content;
    return cell;
}

function createButton(key,task) {
    let button = document.createElement('button');
    button.className = 'btn btn-primary d-flex me-2';
    button.type = 'button';
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#exampleModal';
    button.onclick = function() { editTask(key,task); };

    let icon = document.createElement('i');
    icon.className = 'bi bi-pencil';
    button.appendChild(icon);

    let cell = document.createElement('td');
    cell.appendChild(button);
    return cell;
}

function populateTable(taskCollectionDict, tableBodyId, sortedKeysList) {
    let table = document.getElementById(tableBodyId);
    table.innerHTML = ''; // Clear the table first
    let rowNum = 1;

    for (let key of sortedKeysList) { // loop over the sorted keys
        let task = taskCollectionDict[key];
        let row = document.createElement('tr');
        row.setAttribute('data-task-id', key);
        row.setAttribute('class', 'align-middle');
        row.appendChild(createButton(key, task));
        row.appendChild(createCell(rowNum));
        row.appendChild(createCell(task.taskName));
        row.appendChild(createCell(task.taskCreated));
        row.appendChild(createCell(task.taskDue));
        row.appendChild(createCell(task.taskLabel));
        row.appendChild(createCell(task.taskStatus));
        row.appendChild(createCell(task.taskDescription));

        table.appendChild(row);
        rowNum++;
    }
}

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
    clearPreviousTask()
    let today = new Date();
    let formattedDate = formatDateToDDMMYYYY(today);
    document.getElementById('taskFormCreated').value = formattedDate;
}

function editTask(taskId, task) {

    document.getElementById('taskFormName').value = task.taskName;
    document.getElementById('taskFormLabel').value = task.taskLabel;
    document.getElementById('taskFormStatus').value = task.taskStatus;
    document.getElementById('taskFormCreated').value = task.taskCreated;
    document.getElementById('taskFormDue').value = task.taskDue;
    document.getElementById('taskFormDescription').value = task.taskDescription;

    // Store the task ID in a hidden input for later use
    document.getElementById('taskId').value = taskId;
}

function clearPreviousTask() { 
    document.getElementById('taskFormName').value = '';
    //document.getElementById('taskFormLabel').value = '';
    //document.getElementById('taskFormStatus').value = '';
    document.getElementById('taskFormCreated').value = '';
    document.getElementById('taskFormDue').value = '';
    document.getElementById('taskFormDescription').value = '';
    document.getElementById('taskId').value = '';
}


















////////////////////////// MAIN FUNCTION //////////////////////////
function main() {

    let taskCollection = getTasksFromLocalStorage() 
    let allTaskKeysArray = Object.keys(taskCollection)
    let keysByStatusGroup ={ "To Do": [],
                        "Started": [],
                        "Completed" : [],
    }
    allTaskKeysArray.forEach(key => {
        let task = taskCollection[key]
        if (task.taskStatus === "To Do") {
            keysByStatusGroup["To Do"].push(key)
        }
        if (task.taskStatus === "Started") {
            keysByStatusGroup["Started"].push(key)
        }
        if (task.taskStatus === "Completed") {
            keysByStatusGroup["Completed"].push(key)
        }
    });

    sortKeysByTaskCreated(keysByStatusGroup["To Do"], taskCollection);
    sortKeysByTaskCreated(keysByStatusGroup["Started"], taskCollection);
    sortKeysByTaskCreated(keysByStatusGroup["Completed"], taskCollection);

    // At this point i have the collection of tasks. and a dictionary of lists of sorted keys by taskCreated. 
    // I can now populate the tables.
    // for each table -> pass tbody id through a function
    // get the right keys list 
    // get the task collection

    populateTable(taskCollection, 'tableToDo', keysByStatusGroup["To Do"]);
    populateTable(taskCollection, 'tableStarted', keysByStatusGroup["Started"]);
    populateTable(taskCollection, 'tableCompleted', keysByStatusGroup["Completed"]);

}

main();