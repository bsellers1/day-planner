// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.

console.log(dayjs().format("MMM D, YYYY"));
var currentTimeEl = $("#current-time");
currentTimeEl.text(dayjs().format("MMM D, YYYY"));

function clearInfo(isTrue) { // clears storage
  if (isTrue) {
    localStorage.clear();
    save();
  }
  $('#modal').modal('hide');
}

function save() { // saves, checks, and shows local storage to their hours
  for (i = 9; i < 17; i++) {
    var equa = '0' + i;
    var info = $('.description');
    $('#0' + i).children(info).val(localStorage.getItem(equa));
  }
}

function clear() {
  var date = localStorage.getItem('date');
  if(!date) return;
  if (date !== dayjs().format('dddd, MMMM D, YYYY')) { 
    $('#modalLabel').text(currentDate);
    $('#modal').modal('show');
  }
}

$(document).ready(function () {
  $('.saveBtn').on('click', function (event) {
    event.preventDefault();
    var time = $(this).parent().attr('id');
    var text = $(this).siblings('.description').val();
    localStorage.setItem(time, text);
    localStorage.setItem('date', dayjs().format('dddd, MMMM D, YYYY'));
  });

  setInterval(checkTime, 100000);
  clear();
  save()
});