let button = document.querySelector("#btn");
let liftSpaces = document.querySelector("#lift_space");
let backButton = document.querySelector("#regenerate_btn");
let box = document.querySelector(".form-simulate");


liftSpaces.style.display = "none";
button.addEventListener("click", () => {
  let liftSection = document.createElement("div");
  liftSection.setAttribute("id", "lift_section");

  let box = document.querySelector(".form-simulate");
  let floorCount = document.querySelector("#floorcount");
  let liftCount = document.querySelector("#lift");
  let lift_Space = document.querySelector("#main_section");
  lift_Space.appendChild(liftSection);
  let lift = document.querySelector("#lift_space"); // for lift space
  box.style.display = "none";
  let floor;
  let errorSection = document.querySelector("#error_section");


  for (let i = 0; i < floorCount.value; i++) {
   floor = document.createElement("div");
    floor.className = "floor";
    // lift_Space.appendChild(floor);
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
    let pTag = document.createElement("p"); // para tag
    pTag.setAttribute("id", "floorCount");
    let num = floorCount.value - i; // number of floor counts
    let textnew = document.createTextNode("Floor No. " + num);
    pTag.appendChild(textnew);
    floor.appendChild(pTag);
    lift_Space.appendChild(floor);
    console.log(lift_Space);
  }
  let doorleft = "",
    doorright = "",
    lift_background = "",
    lifts = [],
    distance = "";
  initialValue = 0;
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
    let last = floor.childNodes[floor.childNodes.length - 1];
    floor.insertBefore(liftSection, last);
    lift_background.setAttribute("data-status", "free");
    lift_background.setAttribute("data-current", 0);
    liftSection.appendChild(lift_background);
    lifts.push(lift_background);
  }
  let floorList = document.querySelectorAll(".floor");
  let reverseArray = Array.from(floorList).reverse();
  let rightDoor = document.querySelectorAll(".right");
  let leftDoor = document.querySelectorAll(".left");
  let liftBox = document.querySelector(".lift_box");
  let button = document.querySelector("button");
  reverseArray.forEach((reverseArray, index) => {
    reverseArray.addEventListener("click", (event) => {
      handleLiftMovement(index);
    });
  });
  function handleLiftMovement(index) {
    let freeLift = lifts.find((item) => {
      return item.dataset.status === "free";
    });
    liftsMovement(freeLift, index);
    freeLift.setAttribute("data-current", index);
  }
  function liftsMovement(freeLift, floorIndex) {
    freeLift.setAttribute("data-status", "busy");
    let currentPosition = Number(freeLift.dataset.current);
    // console.log(currentPosition);
    distance = Math.abs(currentPosition - Number(floorIndex));
    // console.log(distance);
    // freeLift.style.position = "relative";
    freeLift.style.bottom = `${150.8 * floorIndex}px`;
    freeLift.style.transition = `bottom  ${distance * 2}s`;
    // freeLift.style.marginBottom = "0px";
    // console.log(`bottom  ${distance * 2}s`);
    doorsMovement(freeLift);
  }
  function doorsMovement(freeLift) {
    // console.log(`${distance*2000}`);
    setTimeout(() => {
      freeLift.childNodes[0].style.width = "0px";
      freeLift.childNodes[1].style.width = "0px";
      freeLift.style.transition = "none";
      freeLift.childNodes[0].style.transition = "width 2.5s";
      freeLift.childNodes[1].style.transition = "width 2.5s";
      // freeLift.style.boxShadow = "0vw 0vw 0.1vw 0.1vw #00bcd4";
      setTimeout(() => {
        freeLift.childNodes[0].style.width = "1.5rem";
        freeLift.childNodes[1].style.width = "1.5rem";
        freeLift.childNodes[0].style.transition = "width 2.5s";
        freeLift.childNodes[1].style.transition = "width 2.5s";
        freeLift.style.transition = "none";
        freeLift.dataset.status = "free";
        // freeLift.style.boxShadow = "none";
      }, 2500);
    }, `${distance * 2000}`);
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
  liftSpaces.style.display = "block";
});