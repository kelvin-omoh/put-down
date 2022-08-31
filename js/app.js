const clear =document.querySelector(".clear");
const dateElement = document.querySelector(".date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");
let LIST ,id;
// LIST = [],id=0;


const check = "fa-check-circle";
const unCheck = "fa-circle";
const lineThrough = "lineThrough";

//show date
let today =  new Date();
let options = {
    weekday:"long",
    month:"short",
    day:"numeric"
}
dateElement.innerHTML  = today.toLocaleDateString("en-US",options);
 

//getting data from local storage
let data = localStorage.getItem("TODO")
 
//check if local storage is empty
if(data){//if there is data in local storage
LIST= JSON.parse(data);
loadList(LIST)
id = LIST.length

}

else{//means if no data in local storage
    LIST=[];
    id=0;
}



//FUNCTION TO LOAD ITEM TO THE LIST IN LOCAL STORAGE
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
};

//function addto
function addToDo(toDo,id,done,trash){
    if(trash){
    return;//this would prevent the code from running
   }
   //checking if todo is not completed
   const DONE = done ? check: unCheck;
   let LINE = done ? lineThrough :""; 
    let item = `
    <li class="item">
      <i class="fa far ${DONE} co " job="complete" id="${id}"></i>
      <p class="text ${LINE}">${toDo}</p>     
      <i class="fa fa-trash-alt de" job="delete" id="${id}"></i>
    </li>`;
    const position = "beforeend";


    list.insertAdjacentHTML(position,item); 
}


//adding item to the list when a user uses the ENTER KEY.

document.addEventListener("keyup",(e)=>{
    if(e.keyCode===13){
        const toDo =input.value;
        
        
 
        //checking if there's an input or if the input is empty
        if(toDo){
            addToDo(toDo,id,false,false)
            LIST.push({
                name:toDo,
                id:id,
                done:false,
                trash:false
            })
            toastr["success"]("New item added to the list!")

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates":true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
              }


// add item to local Storage {must be added to where the list is}
localStorage.setItem("TODO",JSON.stringify(LIST))
              id++

        }
      else{
              


               toastr["error"](" No item added to the list !!!");

               
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

      } 
            input.value="";
     
    }
})


// complete todo function 
function completeToDo(element){
element.classList.toggle(check)
element.classList.toggle(unCheck)
element.parentNode.querySelector(".text").classList.toggle(lineThrough);

//updating the element in the array
LIST[element.id].done=LIST[element.id].done?false:true;


// add item to local Storage {must be added to where the list is}
localStorage.setItem("Todo",JSON.stringify(LIST))




toastr["info"]("Item completed! Good Job 🤩")

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
}

// remove todo function 
function removeToDo(element){
 element.parentNode.parentNode.removeChild(element.parentNode);

 LIST[element.id].trash=true;



// add item to local Storage {must be added to where the list is}
localStorage.setItem("TODO",JSON.stringify(LIST))
}



list.addEventListener("click",(event)=>{
     const element = event.target;//its returns the clicked element
    const elementJob = element.attributes.job.value//its returns either complete or delete;


    if(elementJob=="complete"){
        completeToDo(element);
    }
    else if(elementJob=="delete"){
         removeToDo(element);
    }
   
// add item to local Storage {must be added to where the list is}
localStorage.setItem("TODO",JSON.stringify(LIST))
})


clear.addEventListener("click",()=>{
 
  
    localStorage.clear();





//     toastr["info"]("All items have been cleared permanently!!!")

//     toastr.options = {
//       "closeButton": true,
//       "debug": false,
//       "newestOnTop": true,
//       "progressBar": true,
//       "positionClass": "toast-top-center",
//       "preventDuplicates": true,
//       "onclick": null,
//       "showDuration": "300",
//       "hideDuration": "1000",
//       "timeOut": "6000",
//       "extendedTimeOut": "1000",
//       "showEasing": "swing",
//       "hideEasing": "linear",
//       "showMethod": "fadeIn",
//       "hideMethod": "fadeOut"
//     }
 location.reload();
   
})



// preloader 

let reload =  window.addEventListener("load",()=>{
     setInterval(loading,3000)
 });
 
 
function loading (){
    document.querySelector(".preloader").classList.add("fade");   
}

