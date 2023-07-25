const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');
let draggedCard = null;
let draggedFromList = null;
let draggedToList = null;
let greyedList = null;

const cardHandler = (card) => {
    card.addEventListener("dragenter", () => {
        draggedFromList = card.parentElement;
        if (!draggedCard) {
            draggedCard = card;
            console.log(`${card.innerHTML} is being dragged!`)
        }
    })
}

const listHandler = (list) => {
    list.addEventListener("dragover", () => {
        draggedToList = list.querySelector(".list-items");
        if (greyedList) {
            greyedList.style.backgroundColor = "#FFFFFF";
        }
        greyedList = list.querySelector(".list-items");
        greyedList.style.backgroundColor = "#E9EAEC";
    })

}
for (let card of cards) {
    cardHandler(card);
}

for (let list of lists) {
    listHandler(list);
}

document.addEventListener("dragend", () => {
    if (draggedToList && draggedCard) {
        draggedToList.appendChild(draggedCard);
    }
    draggedCard = null;
    draggedFromList = null;
    draggedToList = null;
    greyedList.style.backgroundColor = "#FFFFFF";
    console.log("Drag ended");
})