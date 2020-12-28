import {
    getInputs,
    checkAllInputs,
    clearInputs
} from "./utils.js";

import { addbook } from "./api.js"


const submitButton = document.getElementById("submit-button");
const hideWindowButton = document.getElementById("window_button");


submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    let { author, description, price } = getInputs();

    if (checkAllInputs()) {
        price = Number(price);
        console.log({ author, description, price });
        addbook({ author, description, price });

        document.getElementById("window_content").style.display = "block";
        document.getElementById("window_content").style.backgroundColor = " rgb(182, 233, 199)";
        document.getElementById("window_text_content").innerText = "Item added!";
    } else {
        document.getElementById("window_content").style.display = "block";
        document.getElementById("window_content").style.backgroundColor = "red";
        document.getElementById("window_text_content").innerText = "Input all the values to add item!";
    }
    clearInputs();
});

hideWindowButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("window_content").style.display = 'none';
});