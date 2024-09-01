let button = document.querySelector("#btn");
let liftSpaces = document.querySelector("#lift_space");
let backButton = document.querySelector("#regenerate_btn");
let box = document.querySelector(".form-simulate");

liftSpaces.style.display = "none";
button.addEventListener("click", () => {
  let mp = new Map();
  let liftArray = [];
  let liftSection = document.createElement("div");
  liftSection.setAttribute("id", "lift_section");
  let count = 0;
  let box = document.querySelector(".form-simulate");
  let floorCount = document.querySelector("#floorcount");
  let liftCount = document.querySelector("#lift");
  let lift_Space = document.querySelector("#main_section");
  lift_Space.appendChild(liftSection);
  let lift = document.querySelector("#lift_space"); // for lift space
  if (floorCount.value > 0 && liftCount.value > 0 )
  box.style.display = "none";
  let floor;
  
  for (let i = 0; i < floorCount.value; i++) {
    floor = document.createElement("div");
    floor.className = "floor";
    floor.setAttribute("id", i);
    if (i > 0 && i < floorCount.value - 1) {
      floor.innerHTML += `<button type="button" class ='buttonList upButtonList'>Up</button>`;
      floor.innerHTML += `<button type="button" class ='buttonList downButtonList'>Down</button>`;
    }
    if (i == 0) {
      floor.innerHTML += `<button type="button" class='buttonList downButtonList'>Down</button>`;
    }
    if (i == floorCount.value - 1) {
      floor.innerHTML += `<button type='button' class ='buttonList upButtonList'>Up</button>`;
    }
    let pTag = document.createElement("p");
    pTag.setAttribute("id", "floorCount");
    let num = floorCount.value - i; // number of floor counts
    let textnew = document.createTextNode("Floor No. " + num);
    pTag.appendChild(textnew);
    floor.appendChild(pTag);
    lift_Space.appendChild(floor);
  }
  let doorleft = "",
    doorright = "",
    lift_background = "",
    lifts = [],
    distance = "";
  initialValue = 0;
  for (let j = 0; j < liftCount.value; j++) {
    doorleft = document.createElement("div");
    doorleft.setAttribute("class", "left");
    doorright = document.createElement("div");
    doorright.setAttribute("class", "right");
    lift_background = document.createElement("div"); // background for the lift, when the door will open
    lift_background.setAttribute("class", "lift_box");
    lift_background.setAttribute("id", j);
    lift_background.setAttribute("data-status", "free");
    lift_background.appendChild(doorleft);
    lift_background.appendChild(doorright);
    lift_background.style.display = "flex";
    let last = floor.childNodes[floor.childNodes.length - 1];
    floor.insertBefore(liftSection, last);
    lift_background.setAttribute("data-status", "free");
    lift_background.setAttribute("data-current", 0);
    liftSection.appendChild(lift_background);
    lifts.push(lift_background);
    console.log(lifts)
    liftArray[j] = 0 ; 
  }

  let requestArray = [];
  let flag = false,
  i = 0;
  let floorList = document.querySelectorAll(".floor");  //floor array
  let buttonList = document.querySelectorAll(".upButtonList");
  let downButtonList = document.querySelectorAll(".downButtonList");    //descending downbutton list array
  let reverseButtonArray = Array.from(buttonList).reverse();             //ascending UP Button
  let reverseDownButtonArray = Array.from(downButtonList).reverse();     //descending downbutton array
  let reverseFloorList = Array.from(floorList).reverse();


    reverseButtonArray.map((button,index) => {
           button.addEventListener("click", () => {
           console.log(` button click from this floor ${index}`);
           handleLiftMovement(index);
      });
    });
    reverseDownButtonArray.map((button,index) => {
      let flag = true ;
      button.addEventListener("click", () => {
  
      handleLiftMovement(index+1); 
     });
  });
   
     
  

  function handleLiftMovement(index) {
    console.log('check_status');
   
    freeLift = lifts.find((item) => {
   
      return item.dataset.status === "free";
    });
     
    if (freeLift === undefined) {
      requestArray.push(index);
    }

    liftsMovement(freeLift, index);
    freeLift.setAttribute("data-current", index); 
    
    mp.set("data-current" , index); 

  }

  function liftsMovement(freeLift, floorIndex) {
    freeLift.setAttribute("data-status", "busy");
    let currentPosition = Number(freeLift.dataset.current);
    distance = Math.abs(currentPosition - Number(floorIndex));
    freeLift.style.bottom = `${150.8 * floorIndex}px`;
    freeLift.style.transition = `bottom  ${distance * 2}s`;
    doorsMovement(freeLift, requestArray);
     
  }


  function doorsMovement(freeLift, requestArray) {
    setTimeout(() => {
      freeLift.childNodes[0].style.width = "0px";
      freeLift.childNodes[1].style.width = "0px";
      freeLift.style.transition = "none";
      freeLift.childNodes[0].style.transition = "width 2.5s";
      freeLift.childNodes[1].style.transition = "width 2.5s";
    }, `${distance * 2000}`);
    setTimeout(() => {
      freeLift.childNodes[0].style.width = "1.5rem";
      freeLift.childNodes[1].style.width = "1.5rem";
      freeLift.childNodes[0].style.transition = "width 2.5s";
      freeLift.childNodes[1].style.transition = "width 2.5s";
      freeLift.style.transition = "none";
      freeLift.setAttribute("data-status", "free");
      console.log(requestArray);



    }, `${(distance * 2000) + 2500}`);

    setTimeout(() => {
      if (requestArray.length > 0) { 
        liftsMovement(freeLift, requestArray[0]);
        freeLift.setAttribute("data-current", requestArray[0]);
        requestArray.shift();
      }
    }, `${(distance * 2000) + 5000}`);
  }

  backButton.addEventListener("click", () => {
    let child = lift_Space.firstElementChild;
    while (child) {
      child.remove();
      child = lift_Space.firstElementChild;
    }
    box.style.display = "block";
    liftSpaces.style.display = "none";
  });
  let liftSpaces = document.querySelector("#lift_space");
  if (floorCount.value > 0 && liftCount.value > 0 )
  liftSpaces.style.display = "block";
});

