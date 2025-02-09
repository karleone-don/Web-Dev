function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();
    if (text === "") return;

    let table = document.getElementById("taskTable").getElementsByTagName("tbody")[0];
    let row = table.insertRow();
    
    let cell = row.insertCell();
    cell.classList.add("task-cell");

    let doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    doneBtn.innerText = "✔";
    
    let span = document.createElement("span");
    span.innerText = text;
    span.classList.add("task-text");

    doneBtn.onclick = function() {
        doneBtn.classList.toggle("completed"); 
        span.classList.toggle("completed");
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");

    let img = document.createElement("img");
    img.src = "icons/trash.svg";
    img.alt = "Удалить";
    deleteBtn.appendChild(img);

    deleteBtn.onclick = function() {
        row.remove();
    };

    cell.appendChild(doneBtn);
    cell.appendChild(span);
    cell.appendChild(deleteBtn);

    input.value = "";
}
