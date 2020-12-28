import {
    renderItemsList,
    checkAllInputs,
    getInputs,
    clearInputs
} from "./utils.js";

import { getAllbooks, updatebook, deletebook } from "./api.js";

const findButton = document.getElementById("find-button");
const clearFindButton = document.getElementById("clear-find-button");
const findInput = document.getElementById("find-input");
const sortByPriceAscButton = document.getElementById("sort-button");
const submitButton = document.getElementById("submit-button");
const hideWindowButton = document.getElementById("window_button");

let books = [];

let currentItemId;

const removebook = (element) => {
    const itemId = element.target.id.replace('delete_', "");
    deletebook(itemId).then(renderbooks(editbook, removebook));

}

const editbook = (element) => {
    const itemId = element.target.id.replace('edit_', "");
    currentItemId = itemId;
    document.getElementById("operations_container").style.display = 'block';

}

const renderbooks = async(editbook, removebook) => {
    const allbooks = await getAllbooks();
    books = allbooks;
    renderItemsList(books, editbook, removebook);
}


findButton.addEventListener("click", () => {
    const foundbooks = books.filter(book => book.author.search(findInput.value) !== -1);

    renderItemsList(foundbooks, editbook, removebook);
});

sortByPriceAscButton.addEventListener("click", () => {
    const sortedbooks = books.sort((book_1, book_2) => (book_1.price > book_2.price) ? 1 : -1);

    renderItemsList(sortedbooks, editbook, removebook);
});

clearFindButton.addEventListener("click", () => {
    findInput.value = "";

    renderItemsList(books, editbook, removebook);
});


submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    let { author, description, price } = getInputs();

    if (checkAllInputs()) {
        price = Number(price);

        updatebook(currentItemId, { author, description, price });

        document.getElementById("window_content").style.display = "block";
        document.getElementById("window_content").style.border = "none";
        document.getElementById("window_content").style.backgroundColor = "rgb(79, 174, 236);";
        document.getElementById("window_text_content").innerText = "Item was edited!";

    } else {
        document.getElementById("window_content").style.display = "block";
        document.getElementById("window_content").style.backgroundColor = "red";
        document.getElementById("window_text_content").innerText = "Input all the values to edit this item!";
    }

});

hideWindowButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("window_content").style.display = 'none';
    if (checkAllInputs()) {
        document.getElementById("operations_container").style.display = 'none';
        clearInputs();
        renderbooks(editbook, removebook);
    }
});

renderbooks(editbook, removebook);