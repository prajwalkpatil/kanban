const board = document.querySelector('.board-add');
const boardBack = document.querySelector('.board');
const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');
const addListBackdrop = document.querySelector('.add-list-backdrop');
const dialogCloseButtons = document.querySelectorAll('#dialog-close');
const listAddButton = document.getElementById('list-add-button');
const listAddInput = document.getElementById('list-title-input');
const addListButton = document.getElementById('add-list');
const lightColors = document.getElementById('light-colors');
const regularColors = document.getElementById('regular-colors');

const changeColorButton = document.getElementById('change-color-button');
const changeColorConfirmButton = document.getElementById('change-color-confirm');
const changeColorBackdrop = document.querySelector('.change-color-backdrop');
const colorAddButton = document.getElementById('color-add-button');
const colorDialogCloseButton = document.getElementById('color-dialog-close');
const colorDialogClose = document.getElementById('dialog-close-color');
const selectedColorDisplay = document.getElementById('selected-color');

let draggedCard = null;
let draggedFromList = null;
let draggedToList = null;
let greyedList = null;
let colorPaletteLight = ["#94a3b8", "#9ca3af", "#a1a1aa", "#f87171", "#fb923c", "#fbbf24", "#facc15", "#a3e635", "#4ade80", "#34d399", "#2dd4bf", "#22d3ee", "#38bdf8", "#60a5fa", "#818cf8", "#a78bfa", "#c084fc", "#e879f9", "#f472b6", "#fb7185"];
let colorPaletteRegular = ["#64748b", "#6b7280", "#71717a", "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"];
let boardBackground = null;
let selectedColor = null;
boardBack.style.backgroundColor = boardBackground || "#E9EAEC";

// For random background
// boardBack.style.backgroundColor = colourPalette[Math.floor(Math.random() * colourPalette.length)];

const createPalette = () => {
    colorPaletteLight.forEach((colorItem) => {
        let newColor = document.createElement('div')
        newColor.classList.add('color-item');
        newColor.style.backgroundColor = colorItem;
        newColor.addEventListener("click", () => {
            selectedColor = colorItem;
            selectedColorDisplay.style.backgroundColor = colorItem;
        });
        lightColors.appendChild(newColor);
    })
    colorPaletteRegular.forEach((colorItem) => {
        let newColor = document.createElement('div')
        newColor.classList.add('color-item');
        newColor.style.backgroundColor = colorItem;
        newColor.addEventListener("click", () => {
            selectedColor = colorItem;
            selectedColorDisplay.style.backgroundColor = colorItem;
        });
        regularColors.appendChild(newColor);
    })
}
createPalette();

const resetInputs = () => {
    listAddInput.value = '';
}

const toggleBackdrop = (backdrop) => {
    backdrop.classList.toggle('hidden');
    resetInputs();
}

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


dialogCloseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        toggleBackdrop(addListBackdrop);
    })
});

listAddButton.addEventListener("click", () => {
    let title = listAddInput.value;
    if (title) {
        createNewList(title);
    }
    toggleBackdrop(addListBackdrop);
});


addListButton.addEventListener("click", () => {
    toggleBackdrop(addListBackdrop);
})


changeColorButton.addEventListener("click", () => {
    toggleBackdrop(changeColorBackdrop);
});

changeColorConfirmButton.addEventListener("click", () => {
    boardBackground = selectedColor;
    boardBack.style.backgroundColor = boardBackground;
});

colorDialogClose.addEventListener("click", () => {
    toggleBackdrop(changeColorBackdrop);
})

colorDialogCloseButton.addEventListener("click", () => {
    toggleBackdrop(changeColorBackdrop);
})