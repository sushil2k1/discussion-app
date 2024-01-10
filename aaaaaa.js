let todos = [];
let field = document.getElementById("input-field");
let cont = document.getElementById('container');

window.onload = getData;

function getData() {
    let data = localStorage.getItem('tasks');
    if (data) {
        todos = JSON.parse(data);
    } else {
        todos = [];
    }
    if (todos.length) {
        todos.forEach(task => {
            createTask(task);
            // widows.onload()
        });
    }
}

function createTask(obj) {
    let div = document.createElement('div');
    div.id = obj.taskid;
    let li = document.createElement('li');
    li.innerHTML = obj.task;
    let edit = document.createElement('button');
    edit.innerText = 'Edit';
    let del = document.createElement('button');
    del.innerText = 'X';
    let check = document.createElement('input');
    check.setAttribute("type", "checkbox");
    if(obj.isChecked){
        li.className="checking"
    }
    
    check.checked = obj.isChecked;

    

    cont.appendChild(div);
    div.appendChild(li);
    div.appendChild(check);
    div.appendChild(edit);
    div.appendChild(del);

    // deleteing the tasks
    del.addEventListener("click", function () {
        let l = document.getElementById(div.id);
        l.remove();
        // console.log(todos);

        let todosUp = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
        // console.log(todosUp);
        let a = removeObj(todosUp, div.id);
        localStorage.setItem('tasks', JSON.stringify(todosUp));

    });



    // edit work
    edit.addEventListener("click", () => {
        let val = prompt("Edit your Task here:", obj.task);
        if (val !== null) {
            let todosUp = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

            const index = todosUp.findIndex((task) => task.taskid === obj.taskid);


            if (index !== -1) {
                todosUp[index].task = val;
                localStorage.setItem('tasks', JSON.stringify(todosUp));
            }

            li.innerText = val;
        }
        location.reload(); 
    });


    // checkbox value
    check.addEventListener("click", () => {
let element = event.target.parentNode.firstChild;
console.log(element)
        let todosUp1 = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

        


        const index = todosUp1.findIndex((task) => task.taskid === obj.taskid);
        let val = todosUp1[index].isChecked;
        console.log(val)
        console.log(index)
        if(val===false)
        {

           

            todosUp1[index].isChecked=true;
            localStorage.setItem('tasks', JSON.stringify(todosUp1));
            // let p=document.querySelector("li");
            element.className="checking"

        }
        else{
            todosUp1[index].isChecked=false;
            element.removeAttribute('checking')
            localStorage.setItem('tasks', JSON.stringify(todosUp1));
            // let p=document.querySelector("li");
            element.className="checking2"


        }

      


    })

    // if(val===true){
    //     li.className="checking"
    // }
}

function addtask() {
    let taskValue = field.value.trim();

    if (taskValue == "") {
        alert('Enter something');
    } else {
        let id = Date.now();
        let todoObj = {
            task: taskValue,
            taskid: id,
            isChecked: false
        }
        todos.push(todoObj);
        field.value = "";
        saveData(todos);
        createTask(todoObj);
    }
}

function saveData(todos) {
    localStorage.setItem("tasks", JSON.stringify(todos));
}

function removeObj(arr, id) {
    id = parseInt(id)
    const objIndex = arr.findIndex((obj) => obj.taskid === id);
    console.log(objIndex);
    arr.splice(objIndex, 1)
    return arr;
}


function cleen(){
    localStorage.removeItem("tasks");
    cont.innerHTML=""
}

// extra

// s.addEventListener('input',e=>{
//     const val=e.target.value;
    
//     console.log(val)

//     let string = document.getElementById('cont').innerHTML;
    
//     console.log(string);

//     let a= localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[];
    



    
// })