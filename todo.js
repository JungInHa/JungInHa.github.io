const toDoForm = document.querySelector(".js-toDoForm") //form element,
    toDoInput = toDoForm.querySelector("input") //input element from form element, 
    toDoList = document.querySelector(".js-toDoList") // ul to-do list;

const TODOS_LS = 'toDos'; 

let toDos = []; //ready to hold todo list elements as an array

function filterFn(toDo) {
    return toDo.id === 1 
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
} 

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "✔️";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault(); // input 또는 button 클릭 이벤트가 발생 했을때 페이지가 리로드가 되는데 그 현상을 막아줌
    const currentValue = toDoInput.value; //toDoInput = toDoForm.querySelector("input") 
    paintToDo(currentValue);
    toDoInput.value = ""; // clear anything in input
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS); //get toDos(=array) in the local storage
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    } // if there is something in the toDos: parse the loadedToDos(array) into parsedToDos. for each parsedToDos, execute such function named toDo, which will execute paintToDo about text in toDo.
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
    //when submit happens for toDoForm, call the function handleSubmit
}
init();
