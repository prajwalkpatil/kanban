const board = document.querySelector('.board');
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
            draggedCard.style.opacity = 0.6;
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

lists.forEach((list) => {
    listHandler(list);
});

cards.forEach((card) => {
    cardHandler(card);
});

const createNewList = (title = 'Untitled') => {
    let newList = document.createElement('div');
    newList.classList.add('list');
    let listTitle = document.createElement('div');
    listTitle.classList.add('list-title');
    listTitle.textContent = title;
    let listItems = document.createElement('div');
    listItems.classList.add('list-items');
    newList.appendChild(listTitle);
    newList.appendChild(listItems);
    listHandler(newList);
    board.appendChild(newList);
}

const createNewCard = (text = 'Card') => {
    let newCard = document.createElement('div');
    newCard.textContent = text;
    newCard.classList.add('card');
    newCard.draggable = true;
    cardHandler(newCard);
    return newCard;
}

document.addEventListener("dragend", () => {
    if (draggedToList && draggedCard) {
        draggedToList.appendChild(draggedCard);
        draggedCard.style.opacity = 1;
    }
    draggedCard = null;
    draggedFromList = null;
    draggedToList = null;
    greyedList.style.backgroundColor = "#FFFFFF";
})