// task button
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// track tasks by counting
var taskIdCounter = 0;

// page content
var pageContentEl = document.querySelector("#page-content");



// generate new task
var taskFormHandler = function(event) {

    event.preventDefault();

    // variable decleratuion for taskNameInput
    var taskNameInput = document.querySelector("input[name='task-name']").value;

    // variable decleratuion for taskType
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!")
        return false;
    }
    formEl.reset();

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

}

// create task function
var createTaskEl = function(taskDataObj) {

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    // give it a class name
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // add list item info (name and type and id) to list item
    listItemEl.appendChild(taskInfoEl);

    // task id counter and actions
    var taskActionsEl = createTaskActions(taskIdCounter);

    // add task id counter and actions to listItemEl
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;

    // taskDataObj

    };

// createTaskActions to edit and remove tasks
var createTaskActions = function(taskId) {

    //actionContainerEl dynamically created to hold edit and delete buttons
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId)

    // append edit button to actionContainerEl
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    // append delete button to actionContainerEl
    actionContainerEl.appendChild(deleteButtonEl);

    // add dropdown to select edit or delete
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    // append dropdown to actionContainerEl
    actionContainerEl.appendChild(statusSelectEl);

    // array of statusChoices
    var statusChoices = ["To Do", "In Progress", "Completed"];

    // for loop
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
        }

    return actionContainerEl;


    };
// callback through click event on button
formEl.addEventListener("submit", taskFormHandler);

// task button handling
var taskButtonHandler = function(event) {

    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
        } 

    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
        }

    };

// edit button functionality
var editTask = function(taskId){
    // announce edit button useage and taskId
    console.log("editing task #" + taskId);

    // get task list item element with taskId for editing
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from taskSelected task name  
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    // get content from taskSelected task type
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    // save edit 
    document.querySelector("#save-task").textContent = "Save Task";

    // include taskId
    formEl.setAttribute("data-task-id", taskId);

    };

// delete button functionality
var deleteTask = function(taskId){

    // get task list item element with taskId for deletion
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // delete task via .remove
    taskSelected.remove();

    };

// task button event listener 
pageContentEl.addEventListener("click", taskButtonHandler);


