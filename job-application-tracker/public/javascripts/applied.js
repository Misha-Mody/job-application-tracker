const cards = document.querySelectorAll(".draggable");
const columns = document.querySelectorAll(".column-box");
const emptybox = document.querySelectorAll(".droppable");
let draggedItem = null;

for (let i = 0; i < cards.length; i++) {
  const item = cards[i];

  item.addEventListener("dragstart", function () {
    draggedItem = item;
    setTimeout(function () {
      draggedItem.style.display = "none";
      for (let box of emptybox) {
        box.style.display = "block";
      }
    }, 0);
  });

  item.addEventListener("dragend", function () {
    setTimeout(function () {
      draggedItem.style.display = "block";
      draggedItem = null;
      for (let box of emptybox) {
        box.style.display = "none";
      }
    }, 0);
  });

  for (let j = 0; j < columns.length; j++) {
    const col = columns[j];
    col.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    col.addEventListener("dragenter", function () {
      e.preventDefault();
    });

    col.addEventListener("drop", function () {
      this.append(draggedItem);
    });
  }
}
