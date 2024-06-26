
function createCell(content) {
    let cell = document.createElement('td');
    cell.textContent = content;
    return cell;
}

function createButton(key) {
    let button = document.createElement('button');
    button.className = 'btn btn-primary d-flex me-2';
    button.type = 'button';
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#exampleModal';
    button.onclick = function() { editTask(key); };

    let icon = document.createElement('i');
    icon.className = 'bi bi-pencil';
    button.appendChild(icon);

    let cell = document.createElement('td');
    cell.appendChild(button);
    return cell;
}

export function populateTable(taskDictStatusGroup, tableId) {
    let table = document.getElementById(tableId);
    table.innerHTML = ''; // Clear the table first
    let rowNum = 1;
    let keys = Object.keys(taskDictStatusGroup);

    for (let key of keys) {
        let task = taskDictStatusGroup[key];
        let row = document.createElement('tr');
        row.setAttribute('data-task-id', key);
        row.setAttribute('class', 'align-middle');

        row.appendChild(createButton(key));
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