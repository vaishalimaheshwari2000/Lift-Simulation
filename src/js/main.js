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

  for (let i = 0; i < floorCount.value; i++) {
    floor = document.createElement("div");
    floor.className = "floor";
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
    let pTag = document.createElement("p");
    pTag.setAttribute("id", "floorCount");
    let num = floorCount.value - i; // number of floor counts
    let textnew = document.createTextNode("Floor No. " + num);
    pTag.appendChild(textnew);
    floor.appendChild(pTag);
    lift_Space.appendChild(floor);
    // console.log(lift_Space);
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

  let requestArray = [];
  let flag = false,
    i = 0;
  let floorList = document.querySelectorAll(".floor");
  let reverseArray = Array.from(floorList).reverse();
  reverseArray.forEach((reverseArray, index) => {
    reverseArray.addEventListener("click", (event) => {
      handleLiftMovement(index);
    });
  });

  function handleLiftMovement(index) {
    freeLift = lifts.find((item) => {
      return item.dataset.status === "free";
    });

    if (freeLift === undefined) {
      requestArray.push(index);
    }

    liftsMovement(freeLift, index);
    freeLift.setAttribute("data-current", index);
  }

  function liftsMovement(freeLift, floorIndex) {
    freeLift.setAttribute("data-status", "busy");
    let currentPosition = Number(freeLift.dataset.current);
    distance = Math.abs(currentPosition - Number(floorIndex));
    freeLift.style.bottom = `${150.8 * floorIndex}px`;
    freeLift.style.transition = `bottom  ${distance * 2}s`;
    doorsMovement(freeLift);
  }

  function doorsMovement(freeLift) {
    setTimeout(() => {
      freeLift.childNodes[0].style.width = "0px";
      freeLift.childNodes[1].style.width = "0px";
      freeLift.style.transition = "none";
      freeLift.childNodes[0].style.transition = "width 2.5s";
      freeLift.childNodes[1].style.transition = "width 2.5s";

      setTimeout(() => {
        freeLift.childNodes[0].style.width = "1.5rem";
        freeLift.childNodes[1].style.width = "1.5rem";
        freeLift.childNodes[0].style.transition = "width 2.5s";
        freeLift.childNodes[1].style.transition = "width 2.5s";
        freeLift.style.transition = "none";
        freeLift.setAttribute("data-status", "free");
        console.log(requestArray);
      


         if (i < requestArray.length) {
           liftsMovement(freeLift, requestArray[i]);
           freeLift.setAttribute("data-current", requestArray[i]);
           flag = true;
           i++;
         }
      
      }, 2500);

      // if (flag) {
      //   setTimeout(() => {
      //     requestArray.pop();
      //   }, 5000);
      //   flag = false;
      // }
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
