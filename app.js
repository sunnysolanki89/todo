let addText, addBtn, notesObj;
showNotes();
addBtn = document.getElementById("addBtn");
// console.log(nodesObj)
// If user adds a note, add it to the local storage
addBtn.addEventListener("click", function(e) {
  addText = document.getElementById("addText");
  addTitle = document.getElementById("addTitle");
  //let notes = localStorage.getItem("notes");
  if (addText.value != "" && addTitle.value != "" ) {
    notesStorage();
    //notesObj.push(addText.value);
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
  } else {
    e.preventDefault;
  }
  addText.value = "";
  addTitle.value = "";
  //console.log(addText.value);
  showNotes();
});

function showNotes() {
  notesStorage();
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `<div class="noteCard col-6 col-md-4 my-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Note ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" type="submit" class="btn btn-primary">Delete Note</button>
          </div>
        </div>
      </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

function deleteNote(index) {
  //console.log("I am deleting", index);
  notesStorage();
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
function notesStorage() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function() {
  let inputVal = search.value.toLowerCase();
  //console.log(inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function(element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});