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

const cardActionsHandler = (card) => {
    const optionsButtonSection = card.querySelector('.card-action-option');
    const operationsButtonSection = card.querySelector('.card-action-ops');
    const confirmEditButtonSection = card.querySelector('.card-action-edit-confirm');
    const confirmDeleteButtonSection = card.querySelector('.card-action-delete-confirm');
    const optionButton = card.querySelector('#card-action-option-button');
    const editButton = card.querySelector('#card-action-option-edit');
    const deleteButton = card.querySelector('#card-action-option-delete');
    const exitButton = card.querySelector('#card-action-option-exit');
    const confirmEditButton = card.querySelector('#card-action-option-edit-accept');
    const discardEditButton = card.querySelector('#card-action-option-edit-discard');
    const confirmDeleteButton = card.querySelector('#card-action-option-delete-accept');
    const discardDeleteButton = card.querySelector('#card-action-option-delete-discard');
    const inputSection = card.querySelector('.edit-card-section');
    const inputTextBox = card.querySelector('#edit-card-input');
    const dataSection = card.querySelector('.card-content');
    optionButton.addEventListener("click", () => {
        optionsButtonSection.classList.toggle('hidden');
        operationsButtonSection.classList.toggle('hidden');
    })
    editButton.addEventListener("click", () => {
        operationsButtonSection.classList.toggle('hidden');
        confirmEditButtonSection.classList.toggle('hidden');
        inputTextBox.value = dataSection.textContent;
        inputSection.classList.toggle('hidden');
        dataSection.classList.toggle('hidden');
    })
    confirmEditButton.addEventListener("click", () => {
        console.log("Input ", inputSection);
        console.log("Data ", dataSection);
        dataSection.textContent = inputTextBox.value;
        inputSection.classList.toggle('hidden');
        dataSection.classList.toggle('hidden');
        confirmEditButtonSection.classList.toggle('hidden');
        optionsButtonSection.classList.toggle('hidden');
    })
    discardEditButton.addEventListener("click", () => {
        confirmEditButtonSection.classList.toggle('hidden');
        optionsButtonSection.classList.toggle('hidden');
    })
    deleteButton.addEventListener("click", () => {
        operationsButtonSection.classList.toggle('hidden');
        confirmDeleteButtonSection.classList.toggle('hidden');
    })
    confirmDeleteButton.addEventListener("click", () => {
        let cardParent = card.parentElement;
        cardParent.removeChild(card);
    })
    discardDeleteButton.addEventListener("click", () => {
        confirmDeleteButtonSection.classList.toggle('hidden');
        optionsButtonSection.classList.toggle('hidden');
    })
    exitButton.addEventListener("click", () => {
        optionsButtonSection.classList.toggle('hidden');
        operationsButtonSection.classList.toggle('hidden');
    })
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
    console.log("Card", card);
    cardActionsHandler(card);
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

    let div_1 = document.createElement('div');
    div_1.setAttribute('class', 'add-card');

    let div_2 = document.createElement('div');
    div_2.setAttribute('class', 'card-input');
    div_1.appendChild(div_2);

    let div_3 = document.createElement('input');
    div_3.setAttribute('type', 'text');
    div_3.setAttribute('placeholder', 'New Card');
    div_3.setAttribute('class', 'card-name-input');
    div_3.setAttribute('maxlength', '15');
    div_2.appendChild(div_3);

    let div_4 = document.createElement('div');
    div_4.setAttribute('class', 'card-add-button');
    div_2.appendChild(div_4);

    let div_5 = document.createElement('i');
    div_5.setAttribute('class', 'fa-solid fa-plus');
    div_4.appendChild(div_5);

    let div_6 = document.createElement('div');
    div_6.setAttribute('class', 'priority-input hidden');
    div_1.appendChild(div_6);

    let div_7 = document.createElement('div');
    div_7.setAttribute('class', 'priority-options');
    div_6.appendChild(div_7);

    let div_8 = document.createElement('label');
    div_7.appendChild(div_8);

    let div_9 = document.createElement('div');
    div_9.setAttribute('class', 'priority-item priority-item-selected');
    div_8.appendChild(div_9);

    let div_10 = document.createTextNode((new String("Default")));
    div_9.appendChild(div_10);

    let checkbox_id = "priority_" + String(radios++);
    let div_11 = document.createElement('input');
    div_11.setAttribute('type', 'radio');
    div_11.setAttribute('name', checkbox_id);
    div_11.setAttribute('value', 'default');
    div_11.setAttribute('class', 'priority-radio');
    div_11.setAttribute('checked', 'checked');
    div_8.appendChild(div_11);

    let div_12 = document.createElement('label');
    div_7.appendChild(div_12);

    let div_13 = document.createElement('div');
    div_13.setAttribute('class', 'priority-item');
    div_12.appendChild(div_13);

    let div_14 = document.createTextNode((new String("High")));
    div_13.appendChild(div_14);

    let div_15 = document.createElement('input');
    div_15.setAttribute('type', 'radio');
    div_15.setAttribute('name', checkbox_id);
    div_15.setAttribute('value', 'high');
    div_15.setAttribute('class', 'priority-radio');
    div_12.appendChild(div_15);

    let div_16 = document.createElement('label');
    div_7.appendChild(div_16);

    let div_17 = document.createElement('div');
    div_17.setAttribute('class', 'priority-item');
    div_16.appendChild(div_17);

    let div_18 = document.createTextNode((new String("Medium")));
    div_17.appendChild(div_18);

    let div_19 = document.createElement('input');
    div_19.setAttribute('type', 'radio');
    div_19.setAttribute('name', checkbox_id);
    div_19.setAttribute('value', 'medium');
    div_19.setAttribute('class', 'priority-radio');
    div_16.appendChild(div_19);

    let div_20 = document.createElement('label');
    div_7.appendChild(div_20);

    let div_21 = document.createElement('div');
    div_21.setAttribute('class', 'priority-item');
    div_20.appendChild(div_21);

    let div_22 = document.createTextNode((new String("Low")));
    div_21.appendChild(div_22);

    let div_23 = document.createElement('input');
    div_23.setAttribute('type', 'radio');
    div_23.setAttribute('name', checkbox_id);
    div_23.setAttribute('value', 'low');
    div_23.setAttribute('class', 'priority-radio');
    div_20.appendChild(div_23);
    return div_1;
}

const createNewCard = (text = 'Card', priority = "default") => {
    var div_1 = document.createElement('DIV');
    div_1.setAttribute('class', 'card');
    div_1.setAttribute('draggable', 'true');

    var div_2 = document.createElement('DIV');
    div_2.setAttribute('class', 'card-content');
    div_1.appendChild(div_2);

    var div_3 = document.createTextNode((new String(text)));
    div_2.appendChild(div_3);

    var div_4 = document.createElement('DIV');
    div_4.setAttribute('class', 'edit-card-section hidden');
    div_1.appendChild(div_4);

    var div_5 = document.createElement('INPUT');
    div_5.setAttribute('type', 'text');
    div_5.setAttribute('class', 'edit-card-input');
    div_5.setAttribute('id', 'edit-card-input');
    div_4.appendChild(div_5);

    var div_6 = document.createElement('DIV');
    div_6.setAttribute('class', 'card-actions');
    div_1.appendChild(div_6);

    var div_7 = document.createElement('SPAN');
    div_7.setAttribute('class', 'card-action-option');
    div_6.appendChild(div_7);

    var div_8 = document.createElement('DIV');
    div_8.setAttribute('class', 'card-action');
    div_8.setAttribute('id', 'card-action-option-button');
    div_7.appendChild(div_8);

    var div_9 = document.createElement('I');
    div_9.setAttribute('class', 'fa-solid fa-ellipsis');
    div_8.appendChild(div_9);

    var div_10 = document.createElement('SPAN');
    div_10.setAttribute('class', 'card-action-ops hidden');
    div_6.appendChild(div_10);

    var div_11 = document.createElement('DIV');
    div_11.setAttribute('class', 'card-action action-key');
    div_11.setAttribute('id', 'card-action-option-edit');
    div_10.appendChild(div_11);

    var div_12 = document.createElement('I');
    div_12.setAttribute('class', 'fa-solid fa-pen');
    div_11.appendChild(div_12);

    var div_13 = document.createElement('DIV');
    div_13.setAttribute('class', 'card-action action-key');
    div_13.setAttribute('id', 'card-action-option-delete');
    div_10.appendChild(div_13);

    var div_14 = document.createElement('I');
    div_14.setAttribute('class', 'fa-solid fa-trash');
    div_13.appendChild(div_14);

    var div_15 = document.createElement('DIV');
    div_15.setAttribute('class', 'card-action');
    div_10.appendChild(div_15);

    var div_16 = document.createElement('I');
    div_16.setAttribute('class', 'fa-solid fa-xmark');
    div_16.setAttribute('id', 'card-action-option-exit');
    div_15.appendChild(div_16);

    var div_17 = document.createElement('SPAN');
    div_17.setAttribute('class', 'card-action-edit-confirm hidden');
    div_6.appendChild(div_17);

    var div_18 = document.createElement('DIV');
    div_18.setAttribute('class', 'card-action');
    div_17.appendChild(div_18);

    var div_19 = document.createElement('I');
    div_19.setAttribute('class', 'fa-solid fa-check');
    div_19.setAttribute('id', 'card-action-option-edit-accept');
    div_18.appendChild(div_19);

    var div_20 = document.createElement('DIV');
    div_20.setAttribute('class', 'card-action');
    div_17.appendChild(div_20);

    var div_21 = document.createElement('I');
    div_21.setAttribute('class', 'fa-solid fa-xmark');
    div_21.setAttribute('id', 'card-action-option-edit-discard');
    div_20.appendChild(div_21);

    var div_22 = document.createElement('SPAN');
    div_22.setAttribute('class', 'card-action-delete-confirm hidden');
    div_6.appendChild(div_22);

    var div_23 = document.createElement('DIV');
    div_23.setAttribute('class', 'card-action');
    div_22.appendChild(div_23);

    var div_24 = document.createElement('I');
    div_24.setAttribute('class', 'fa-solid fa-check');
    div_24.setAttribute('id', 'card-action-option-delete-accept');
    div_23.appendChild(div_24);

    var div_25 = document.createElement('DIV');
    div_25.setAttribute('class', 'card-action');
    div_22.appendChild(div_25);

    var div_26 = document.createElement('I');
    div_26.setAttribute('class', 'fa-solid fa-xmark');
    div_26.setAttribute('id', 'card-action-option-delete-discard');
    div_25.appendChild(div_26);


    if (priority !== 'default') {
        if (priority == 'high') {
            div_1.classList.add('card-p1');
        }
        else if (priority == 'medium') {
            div_1.classList.add('card-p2');
        }
        else if (priority == 'low') {
            div_1.classList.add('card-p3');
        }
    }
    cardHandler(div_1);
    return div_1;
}

lists.forEach((l) => {
    let addCardElement = createNewCardSection();
    addCardHandler(addCardElement);
    l.appendChild(addCardElement);
});