const board = document.querySelector('.board-add');
const boardBack = document.querySelector('.board');
const cards = document.querySelectorAll('.card');
const lists = Array.from(document.querySelectorAll('.list'));
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

let radios = 0;

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
    let addCardElement = createNewCardSection();
    addCardHandler(addCardElement);
    newList.appendChild(addCardElement);
}

const createNewCard = (text = 'Card', priority = "default") => {
    let newCard = document.createElement('div');
    newCard.textContent = text;
    newCard.classList.add('card');
    newCard.draggable = true;
    if (priority !== 'default') {
        if (priority == "high") {
            newCard.classList.add('card-p1');
        }
        else if (priority == 'medium') {
            newCard.classList.add('card-p2');
        }
        else if (priority == 'low') {
            newCard.classList.add('card-p3');
        }
    }
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

listAddInput.addEventListener("focus", () => {
    listAddInput.addEventListener("keypress", (event) => {
        if (event.key === 'Enter') {
            let title = listAddInput.value;
            if (title) {
                createNewList(title);
            }
            toggleBackdrop(addListBackdrop);
        }
    });
})

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


const addCardHandler = (section) => {
    let inputs = section.querySelector('.card-name-input');
    let sectionToggle = section.querySelector('.priority-input');
    let cardAddName = section.querySelector('.card-name-input');
    let cardAddBtn = section.querySelector('.card-add-button');
    let sectionPriority = section.querySelector('.priority-input');
    let options = Array.from(sectionPriority.getElementsByTagName('label'));
    let divs = Array.from(sectionPriority.querySelectorAll('.priority-item'));

    inputs.addEventListener("focus", () => {
        sectionToggle.classList.remove('hidden');
        window.addEventListener("keypress", (event) => {
            if (event.key === 'Enter') {
                let cardsList = section.parentElement.querySelector('.list-items');
                let newCardName = cardAddName.value;
                let priorityValue = section.querySelector('input[type="radio"]:checked').value;
                if (newCardName) {
                    cardsList.appendChild(createNewCard(newCardName, priorityValue))
                }
                cardAddName.value = "";
                sectionToggle.classList.add('hidden');
                cardAddName.blur();
            }
        })
    })
    cardAddBtn.addEventListener("click", () => {
        let cardsList = section.parentElement.querySelector('.list-items');
        let newCardName = cardAddName.value;
        let priorityValue = section.querySelector('input[type="radio"]:checked').value;
        if (newCardName) {
            cardsList.appendChild(createNewCard(newCardName, priorityValue))
        }
        cardAddName.value = "";
        sectionToggle.classList.add('hidden');
        cardAddName.blur();
    })
    options.forEach((option) => {
        option.addEventListener("click", () => {
            divs.forEach((div) => {
                div.classList.remove('priority-item-selected');
            });
            let selectedDiv = option.querySelector('.priority-item');
            selectedDiv.classList.add('priority-item-selected');
        })
    });
}


let createNewCardSection = () => {

    let div_1 = document.createElement('DIV');
    div_1.setAttribute('class', 'add-card');

    let div_2 = document.createElement('DIV');
    div_2.setAttribute('class', 'card-input');
    div_1.appendChild(div_2);

    let div_3 = document.createElement('INPUT');
    div_3.setAttribute('type', 'text');
    div_3.setAttribute('placeholder', 'New Card');
    div_3.setAttribute('class', 'card-name-input');
    div_3.setAttribute('maxlength', '15');
    div_2.appendChild(div_3);

    let div_4 = document.createElement('DIV');
    div_4.setAttribute('class', 'card-add-button');
    div_2.appendChild(div_4);

    let div_5 = document.createElement('I');
    div_5.setAttribute('class', 'fa-solid fa-plus');
    div_4.appendChild(div_5);

    let div_6 = document.createElement('DIV');
    div_6.setAttribute('class', 'priority-input hidden');
    div_1.appendChild(div_6);

    let div_7 = document.createElement('DIV');
    div_7.setAttribute('class', 'priority-options');
    div_6.appendChild(div_7);

    let div_8 = document.createElement('LABEL');
    div_7.appendChild(div_8);

    let div_9 = document.createElement('DIV');
    div_9.setAttribute('class', 'priority-item priority-item-selected');
    div_8.appendChild(div_9);

    let div_10 = document.createTextNode((new String("Default")));
    div_9.appendChild(div_10);

    let checkbox_id = "priority_" + String(radios++);
    let div_11 = document.createElement('INPUT');
    div_11.setAttribute('type', 'radio');
    div_11.setAttribute('name', checkbox_id);
    div_11.setAttribute('value', 'default');
    div_11.setAttribute('class', 'priority-radio');
    div_11.setAttribute('checked', 'checked');
    div_8.appendChild(div_11);

    let div_12 = document.createElement('LABEL');
    div_7.appendChild(div_12);

    let div_13 = document.createElement('DIV');
    div_13.setAttribute('class', 'priority-item');
    div_12.appendChild(div_13);

    let div_14 = document.createTextNode((new String("High")));
    div_13.appendChild(div_14);

    let div_15 = document.createElement('INPUT');
    div_15.setAttribute('type', 'radio');
    div_15.setAttribute('name', checkbox_id);
    div_15.setAttribute('value', 'high');
    div_15.setAttribute('class', 'priority-radio');
    div_12.appendChild(div_15);

    let div_16 = document.createElement('LABEL');
    div_7.appendChild(div_16);

    let div_17 = document.createElement('DIV');
    div_17.setAttribute('class', 'priority-item');
    div_16.appendChild(div_17);

    let div_18 = document.createTextNode((new String("Medium")));
    div_17.appendChild(div_18);

    let div_19 = document.createElement('INPUT');
    div_19.setAttribute('type', 'radio');
    div_19.setAttribute('name', checkbox_id);
    div_19.setAttribute('value', 'medium');
    div_19.setAttribute('class', 'priority-radio');
    div_16.appendChild(div_19);

    let div_20 = document.createElement('LABEL');
    div_7.appendChild(div_20);

    let div_21 = document.createElement('DIV');
    div_21.setAttribute('class', 'priority-item');
    div_20.appendChild(div_21);

    let div_22 = document.createTextNode((new String("Low")));
    div_21.appendChild(div_22);

    let div_23 = document.createElement('INPUT');
    div_23.setAttribute('type', 'radio');
    div_23.setAttribute('name', checkbox_id);
    div_23.setAttribute('value', 'low');
    div_23.setAttribute('class', 'priority-radio');
    div_20.appendChild(div_23);
    return div_1;
}

lists.forEach((l) => {
    let addCardElement = createNewCardSection();
    addCardHandler(addCardElement);
    l.appendChild(addCardElement);
});