const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const priceInput = document.getElementById("price-input")
const itemsContainer = document.getElementById("items-container");


const getItemId = (id) => `${id}`;

const itemTemplate = ({ id, author, description, price }) => `
<li id="${getItemId(id)}" class="card">
    <img src="https://www.rei.com/media/fe9b9558-e856-4e38-a7ab-580903043c7a?size=784x588" class="item-image" alt="book">
    <div">
        <h3 class="card-header">${author}</h3>
        <p class="card-body">${description}</p>
        <p class="card-footer">${price}</p>
    </div>
    <div class="li-buttons">
        <button id="delete_${id}" type="button" class="btn delete">Delete </button>
        <button id="edit_${id}" type="button" class="btn edit">Edit </button>
    </div>
</li>`;


export const checkAllInputs = () => {
    if (authorInput.value == "" || pagesInput.value == "" || priceInput.value == "") {
        return false
    } else {
        return true
    }
}

export const addItemToPage = ({ id, author, description, price }, editbook, removebook) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, author, description, price })
    );

    const deleteButton = document.getElementById("delete_" + `${id}`);
    const editButton = document.getElementById("edit_" + `${id}`);
    editButton.addEventListener("click", editbook);
    deleteButton.addEventListener("click", removebook);
};

export const renderItemsList = (items, editbook, removebook) => {
    itemsContainer.innerHTML = "";
    for (const item of items) {
        addItemToPage(item, editbook, removebook);
    }
    countTotalPrice(items);
};

export const getInputs = () => {
    return {
        author: authorInput.value,
        description: pagesInput.value,
        price: priceInput.value
    };
};

export const countTotalPrice = (items) => {
    let totalPrice = Number(0);
    for (const item of items) {
        totalPrice += Number(item.price);
    }
    document.getElementById("total-price").innerText = totalPrice + '$';
}

export const clearInputs = () => {
    authorInput.value = "";
    priceInput.value = "";
    pagesInput.value = "";
};