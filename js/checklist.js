/*
Code providing checklist mechanics, including:
- saving checked items locally between sessions
- flipping the color of table rows upon checkbox press
- resetting all colors upon pressing resetbtn
*/


/********************* saveBoxes ********************\
creates an array of bool values denoting whether each 
box is checked or not, then saves a stringified version
of this array in local storage.
/****************************************************/
function saveBoxes(){
    const boxValues = Array.from(document.querySelectorAll('input[type="checkbox"]')).map(input => input.checked);
    localStorage.setItem('stored-boxes', JSON.stringify(boxValues));
}

/********************* updateBoxes ********************\
retrieves & parses the stored boolean array of box check
values, then sets each corresponding box element to be 
checked depending on this value, and also adds or removes
the bootstrap "success" (green color) class to the table
row the box resides in
/******************************************************/
function updateBoxes(){
  const boxValues = JSON.parse(localStorage.getItem('stored-boxes'));
  const boxes = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < boxes.length; i++) {
      boxes[i].checked = boxValues[i];
      if (boxValues[i]) {
        boxes[i].parentElement.parentElement.classList.add("success");
      } else {
        boxes[i].parentElement.parentElement.classList.remove("success");
      }
  }      
}

/****************************************************\
upon checkbox press, update the table row the box lives
in to either add or remove the success class (turns the
row green); also save updated check values locally
/****************************************************/
$("input[type='checkbox']").change(function(){
    if($(this).is(":checked")){
        $(this).parent().parent().addClass("success"); 
    }else{
        $(this).parent().parent().removeClass("success");  
    }
    saveBoxes();
});

/*****************************************\
upon page load, update all boxes according
to the check values stored locally.
/*****************************************/
$(document).ready(function(){
  updateBoxes();
});

/****************************************************\
upon press of reset btn, uncheck all checkboxes. save 
the cleared values locally and update the boxes/rows
/****************************************************/
$("#resetbtn").click(function() {
  const boxes = document.querySelectorAll('input[type="checkbox"]');
  boxes.forEach((box) => { box.checked = false; });
  saveBoxes();
  updateBoxes();
});