const button = document.querySelector("#btn");
const liftSpaces = document.querySelector("#lift_space");
// console.log(liftSpaces);
liftSpaces.style.display = "none";
button.addEventListener("click", () => {
  const liftSection = document.querySelector("#lift_section"); // main box element for a whole  lift space which helps to bring all lift in a row
  const box = document.querySelector(".form-simulate");
  const floorCount = document.querySelector("#floorcount");
  const liftCount = document.querySelector("#lift");
  const lift_Space = document.querySelector("#main_section"); // arrow img  include up and down arrow buttons
  const lift = document.querySelector("#lift_space"); // for lift space

  box.style.display = "none";
  let floor = "";
  for (let i = 0; i < floorCount.value; i++) {
    floor = document.createElement("div");

    floor.className = "floor";
    lift_Space.appendChild(floor);
    if (i > 0 && i < floorCount.value - 1) {
      floor.innerHTML += `<button type="button" class ='upButton'>Up</button>`;
      floor.innerHTML += `<button type="button" class ='downButton'>Down</button>`;
    }
    if (i == 0) {
      floor.innerHTML += `<button type="button" class='downButton'>Down</button>`;
    }
    if (i == floorCount.value - 1) {
      floor.innerHTML += `<button type='button' class ='upButton'>Up</button>`;
    }
    const pTag = document.createElement("p"); // para tag
    pTag.setAttribute("id", "floorCount");
    const num = floorCount.value - i; // number of floor counts
    const textnew = document.createTextNode("Floor No. " + num);
    pTag.appendChild(textnew);
    floor.appendChild(pTag);
  }

  let doorleft = "",
    doorright = "",
    lift_background = "",
    lifts = [], distance = '';
   initialValue =0 ;
  for (let j = 0; j < liftCount.value; j++) {
    doorleft = document.createElement("div"); // door left element for a left lift door
    doorleft.setAttribute("class", "left");
    doorright = document.createElement("div"); // door right element for a right lift door
    doorright.setAttribute("class", "right");
    lift_background = document.createElement("div"); // background for the lift, when the door will open
    lift_background.setAttribute("class", "lift_box");
    lift_background.setAttribute("data-status", "free");
    lift_background.appendChild(doorleft);
    lift_background.appendChild(doorright);
    lift_background.style.display = "flex";
    const last = floor.childNodes[floor.childNodes.length - 1];
    floor.insertBefore(liftSection, last);
    lift_background.setAttribute("data-status", "free");
    lift_background.setAttribute("data-current", 0);
    liftSection.appendChild(lift_background);

    lifts.push(lift_background);


  }



  const floorList = document.querySelectorAll(".floor");
  const reverseArray = Array.from(floorList).reverse();
  const rightDoor = document.querySelectorAll(".right");
  const leftDoor = document.querySelectorAll(".left");
  const liftBox = document.querySelector(".lift_box");
  const button = document.querySelector('button');
  reverseArray.forEach((reverseArray, index) => {
    reverseArray.addEventListener("click", (event) => {
      handleLiftMovement(index);
    });
  });



  function handleLiftMovement(index) {
   
 let freeLift = lifts.find((item) => {
      return item.dataset.status === "free";
    });

    liftsMovement(freeLift,index);
    freeLift.setAttribute("data-current", index);
    
  }
 

  function liftsMovement(freeLift,floorIndex) {
    
    
    
    distance = Math.abs(Number(freeLift.dataset.current) - Number(floorIndex));
    console.log(distance);
    freeLift.setAttribute("data-status", "busy");


    // freeLift.style.position = "relative";
    freeLift.style.bottom = `${(150 * (floorIndex))}px`;
    freeLift.style.transition = `bottom  ${distance * 2}s`;
    // freeLift.style.marginBottom = "0px";
    console.log( `bottom  ${distance * 2}s`);
    
    doorsMovement(freeLift);
}

  function doorsMovement(freeLift){
    // console.log(`${distance*2000}`);
    
   setTimeout(() => {
 
    freeLift.childNodes[0].style.transition = "width 2.5s";
    freeLift.childNodes[1].style.transition = "width 2.5s";
    freeLift.childNodes[0].style.width = "0px";
    freeLift.childNodes[1].style.width = "0px";
    freeLift.style.boxShadow = '0vw 0vw 0.1vw 0.1vw #00bcd4';
    setTimeout(() => {

      freeLift.childNodes[0].style.transition = "width 5s";
      freeLift.childNodes[1].style.transition = "width 5s";
      freeLift.childNodes[0].style.width = "22px";
      freeLift.childNodes[1].style.width = "22px";
      freeLift.dataset.status = "free";
      freeLift.style.boxShadow = 'none';
    }, 2500);
    
  }, `${distance * 2000}`);
 


  // setTimeout(() => {

  // }, 2500);
   


  // freeLift.dataset.status = "free";

  }




  const liftSpaces = document.querySelector("#lift_space");
  liftSpaces.style.display = "block";
});