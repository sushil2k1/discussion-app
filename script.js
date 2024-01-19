let a = [];
let queField = document.querySelector("#queField");  //question field
let subField = document.querySelector("#subField");  //subject field
let subBtn = document.querySelector("#submit");      //submit button
let cont = document.querySelector('#cont');      //container are where we store our questions
let newQue = document.querySelector('#qbtn')      // new question button
let right = document.querySelector('#right');   // selecting right side of the display



newQue.addEventListener("click", function () {

    right.style.display = "block";
    let rightRes = document.querySelector('#res');
    rightRes.style.display = "none";
    // console.log(rightRes)   
})

window.onload = getData;

function getData() {
    let data = localStorage.getItem('tasks');
    if (data) {
        a = JSON.parse(data);
    }
    else {
        a = [];
    }

    if (a.length) {
        a.forEach(element => {
            if (element.star == true)
                createElement(element)
        });
        a.forEach(element => {
            if (element.star == false)
                createElement(element)
        });
    }
}

function submitQue() {
    let queValue = queField.value.trim();
    let subValue = subField.value.trim();
    if (queValue == "" || subValue == "") {
        alert("Add question and subject properly")
    }
    else {
        let id = Date.now();
        // console.log(id);
        let questionObj = {
            q: queValue, //question
            s: subValue, //subject
            Qid: id,     //question ID
            arr: [],
            star: false
        }
        a.push(questionObj)
        saveData(a);
        queField.value = "";
        subField.value = "";
        createElement(questionObj)

    }



}

function createElement(obj) {
    let div = document.createElement("div");
    div.id = obj.Qid;
    let h = document.createElement("h4");
    h.innerHTML = obj.s;
    let p = document.createElement("p");
    p.innerHTML = obj.q;

    let favBtn = document.createElement('button');
    favBtn.innerText = "\u2606";
    favBtn.style.fontSize = "30px";
    // favBtn.className="heart";
    if (obj.star == true) {
        favBtn.style.color = "red";
    }
    else
        favBtn.style.backgroundColor = '';

    //   Apendind childs in containter
    div.appendChild(h);
    div.appendChild(p);
    div.appendChild(favBtn);
    cont.appendChild(div)
    // window.location.reload()


    // Adding eventlistener to the favBtn
    favBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        let a = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        // favBtn.parentNode.style.display= "none";
        let v = favBtn.parentNode.id;
        let T = a.filter(e => {
            return e.Qid == v
        });
        if (T[0].star == false) {
            T[0].star = true;
            console.log(T[0].star);
            favBtn.style.color = "red";

            // removeObj(a, v);
            cont.prepend(favBtn.parentNode);
            // a.unshift(T[0]);




        }
        else if (T[0].star == true) {
            T[0].star = false;

            cont.appendChild(favBtn.parentNode);
            favBtn.style.color = "black";
            favBtn.innerText = "\u2606";
            favBtn.style.fontSize = "30px";





        }
        console.log(T);


        localStorage.setItem('tasks', JSON.stringify(a));
        // console.log(v);
        // console.log(T[0].Qid);


    })




    // Button for hide the right side content
    // subBtn.addEventListener("click", function () {
    //     right.style.display = "none";
    // })

    // Button for showing the right side content
    newQue.addEventListener("click", function () {
        right.style.display = "block";
        // right.className="show"
        // location.reload()
        // console.log(right);
    })


    // Creating right side's responses and the particular question
    // div.addEventListener("click",function(){
    //     let a=document.getElementById(div.id);
    //     console.log(a);
    //     let b=document.getElementById('res')
    //     console.log(b)
    //     window.onload()
    //     right.style.display="none"
    //     b.style.display="block"

    // })

}

cont.addEventListener("click", function (e) {


    right.style.display = "none";     //hides the display of right side

    let a = e.target.parentNode.id;  //targetting id of the div we are clicking
       console.log(a); 
    let tempArr = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    //    console.log(tempArr)
    let newId = parseInt(a);
    // console.log(newId)
    // console.log(typeof(a))
    // console.log(typeof(newId))
    let objIndex = tempArr.findIndex(obj => obj.Qid === newId);
    // console.log(objIndex)
    let sub = tempArr[objIndex].s;    //taking subject value in a variable
    // console.log(sub);
    let que = tempArr[objIndex].q;    //taking question value in a variable
    // console.log(que)


    let rightArea = document.getElementById('res')
    rightArea.innerHTML = "";
    console.log(rightArea)
    let h2 = document.createElement("h2");
    h2.innerHTML = "Question";
    // console.log(h4);
    rightArea.append(h2);
    rightArea.style.display = "block";
    // h2.style.fontSize="x-large";

    let div1 = document.createElement('div');
    // div.style.display="flex";
    // div.style.flexDirection="column";
    let subject = document.createElement('h4');
    subject.innerHTML = sub;
    let question = document.createElement('p');
    question.innerHTML = que;
    let button = document.createElement('button');
    button.id = "resolve";
    button.innerHTML = "Resolve";


    //  REMOVING ELEMENT
    button.addEventListener('click', function () {
        let l = document.getElementById(a);
        l.remove();
        let right = document.getElementById('res');
        right.innerHTML = "";
        let arr = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
        console.log(arr);
        let arr2 = removeObj(arr, a);
        localStorage.setItem('tasks', JSON.stringify(arr2));

    })





    // div1.innerHTML = `<h4>${sub}</h4>`;
    div1.append(subject);
    div1.append(question);

    rightArea.append(div1);
    rightArea.append(button)


    // Response section of a question
    let h3 = document.createElement('h3');
    h3.innerHTML = "Response"
    h3.style.marginTop = "36px"
    rightArea.append(h3)
    let div2 = document.createElement('div');
    div2.id = "responseDiv"
    rightArea.append(div2);

    let arrayRes = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    let responseArr = arrayRes[objIndex].arr;
    console.log(responseArr)    //response array data
    // createResponse(responseArr);

    if (responseArr.length) {
        responseArr.forEach(task => {
            createResponse(task);
            // widows.onload()
        });
    }

    function createResponse(arr) {
        let h4 = document.createElement('h4');
        h4.innerHTML = arr.name;
        let p = document.createElement('p');
        p.innerHTML = arr.comment;
        let div = document.createElement('li');
        div.id = arr.r_id;
        div.style.listStyleType = "none";
        div.style.border = "1px solid black";
        div.style.borderRadius = "4px"
        div.style.margin = "3px 3px 3px 3px";

        // let u = document.createElement('button');

        // div.style.backgroundColor=" rgb(159, 243, 243)"
        let a = document.getElementById('responseDiv');
        console.log(a);
        a.appendChild(div);
        div.appendChild(h4);
        div.appendChild(p);


        let d=document.createElement('span');
        // d.style.width="350px"
        // d.style.display="flex";
        // d.style.flexDirection="row"
        
        let upper = document.createElement('button');
        upper.innerText = "🔼";
        upper.style.width="34px";
        let votesDisplay = document.createElement('span');
        votesDisplay.innerText = `Upvotes: ${arr.up} | Downvotes: ${arr.down}`;
    
        d.appendChild(upper);
        let down = document.createElement('button');
        down.innerHTML = "🔽";
        down.style.width="34px";
        d.appendChild(down);
        div.appendChild(d);  
        div.appendChild(votesDisplay);


        upper.addEventListener("click",function(){
            arr.up++;
            votesDisplay.innerText= `Upvotes: ${arr.up} | Downvotes: ${arr.down}`;
            arr.netVote=arr.up-arr.down;
            let resId=event.target.parentNode.parentElement.id;

            updatelocalstorage(arr,resId);
           
            
        })
        
        down.addEventListener("click",function(event){
            arr.down++;
            votesDisplay.innerText= `Upvotes: ${arr.up} | Downvotes: ${arr.down}`;
            arr.netVote=arr.up-arr.down;
            let resId=event.target.parentNode.parentElement.id;

            console.log(resId);
            updatelocalstorage(arr,resId);
            



        })
    
        // function updatelocalstorage(arrr, resId) {
        //     console.log(arrr);
        //     let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        //    let index = tasks.filter(t=>t.arr.r_id === resId);
        //    let pIndex=tasks
        //    console.log(index);
                 
           
        // }
        function updatelocalstorage(arrr, resId) {
            let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        
            tasks.forEach(task => {
                let responseIndex = task.arr.findIndex(response => response.r_id == resId);
                console.log(responseIndex);
        
                if (responseIndex !== -1) {
                    task.arr[responseIndex] = arrr;
                    task.arr.sort((a, b) => b.netVote - a.netVote);
                    a.innerHTML="";
                    task.arr.forEach(response => {
                        createResponse(response);
                    });
                }
                        
                    
            });
           
            
            
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        

    }


    

    


    // Another div section where we can add our responses
    let h = document.createElement('h2');
    h.innerText = "Add Response";
    h.style.marginTop = "36px"
    rightArea.append(h)

    let div3 = document.createElement('div');
    rightArea.append(div3);
    let input1 = document.createElement('input');
    input1.id = "nameField";  //providind id to the name box where we comment our response
    input1.setAttribute("placeholder", "Enter Your Name");
    input1.style.width = "220px";
    input1.style.height = "32px";
    input1.style.border = "1px solid black";
    input1.style.fontSize = "18px"
    input1.style.borderRadius = "5px "
    div3.appendChild(input1);

    let input2 = document.createElement('input');
    input2.id = "commentField";   //providind id to the comment box where we comment our response
    input2.setAttribute("placeholder", "Enter Comment");
    input2.style.width = "620px";
    input2.style.height = "190px";
    input2.style.border = "1px solid black";
    input2.style.fontSize = "18px"
    input2.style.borderRadius = "5px";
    input2.style.marginTop = "10px";
    div3.appendChild(input2);

    let commenrBtn = document.createElement("button");
    commenrBtn.id = "submitComment";
    commenrBtn.innerHTML = "Comment";
    rightArea.appendChild(commenrBtn);



    //  Adding responses on an other array using object
    let resSubBtn = document.getElementById('submitComment');
    let addName = document.getElementById('nameField');
    let commentField = document.getElementById('commentField');
    // let R_id=Date.now();
    console.log(addName)
    resSubBtn.addEventListener('click', function () {
        let temp = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        let resObj = {
            name: addName.value,
            comment: commentField.value,
            r_id: Date.now(),
            up: 0,
            down: 0,
            netVote:0
        }




        addName.value = "";
        commentField.value = "";

        temp[objIndex].arr.push(resObj);
        // console.log(temp);
        localStorage.setItem('tasks', JSON.stringify(temp));
        createResponse(resObj);
        // location.reload();
        alert("Your comment is Added");
        console.log(resObj.r_id);



    })




})



function saveData(a) {
    localStorage.setItem("tasks", JSON.stringify(a))

}

function removeObj(arr, id) {
    id = parseInt(id)
    const objIndex = arr.findIndex((obj) => obj.taskid === id);
    console.log(objIndex);
    arr.splice(objIndex, 1)
    return arr;
}


let searchfield = document.getElementById('searchbox');

searchfield.addEventListener("input", function (event) {
    var svalue = event.target.value.toLowerCase();
    var matchingResults = false;

    cont.innerHTML = "";  

    a.forEach(function (value) {
        if (value.q.toLowerCase().includes(svalue) || value.s.toLowerCase().includes(svalue)) {
            createElement(value);
            matchingResults = true;
        }
    });

    if (matchingResults === false && svalue.trim() === "") {
        getData();  
        console.log("hello data");
    } else if (!matchingResults) {
        cont.innerHTML = "<h3>No Results Found</h3>";
    } else {
        var content = cont;
        var markInstance = new Mark(content);
        markInstance.unmark(); 
        markInstance.mark(svalue, { separateWordSearch: false });
    }
});











