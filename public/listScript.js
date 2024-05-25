function updateListItem(item, brand, price, action) {
    fetch('/update-list-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item, brand, price, action })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error(data.error);
        } else {
            fetchListItems(); // Refresh the list items display
        }
    })
    .catch(error => {
        console.error('Error updating list item:', error);
    });
}



function fetchListItems() {
    fetch('/list-items')
        .then(response => response.json())
        .then(data => {
            const listItemsDiv = document.getElementById('listItems');
            listItemsDiv.innerHTML = '';

            if(data.length === 0) {
                listItemsDiv.innerHTML = '<p>Your list is empty.</p>';
            } else {
                data.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.style.paddingBottom = "20px"


                    const itemName = document.createElement('p');
                    itemName.innerText = `${item.item}`;


                    const itemBrand = document.createElement('p')
                    itemBrand.innerText = `${item.brand}`;


                    const itemPrice = document.createElement('p')
                    itemPrice.innerText = `$ ${item.price}`;

                    
                    const itemQuantity = document.createElement('p')
                    itemQuantity.innerText = `Quantity: ${item.quantity}`


                    const quantityDiv = document.createElement('div');


                    const lessList = document.createElement('button');
                    lessList.innerText = '-';
                    lessList.addEventListener('click', () => updateListItem(item.item, item.brand, item.price, 'decrease'));
                    lessList.style.fontFamily = 'Teko';
                    lessList.style.fontSize = '20px'


                    const moreList = document.createElement('button');
                    moreList.innerText = '+';
                    moreList.addEventListener('click', () => updateListItem(item.item, item.brand, item.price, 'increase'));
                    moreList.style.fontFamily = 'Teko';
                    moreList.style.fontSize = '20px'


                    const itemImage = document.createElement('img');
                    itemImage.src = item.imageUrl;
                    itemImage.style.width = '10%'

                    
                    quantityDiv.appendChild(lessList);
                    quantityDiv.appendChild(moreList);

                    itemDiv.appendChild(itemName);
                    itemDiv.appendChild(itemImage);
                    itemDiv.appendChild(itemBrand);
                    itemDiv.appendChild(itemPrice);
                    itemDiv.appendChild(itemQuantity);
                    itemDiv.appendChild(quantityDiv);

                    listItemsDiv.appendChild(itemDiv);

                })
            }
        })



        .catch(error => {
            console.error('Error fetching list items: ', error);
        })

}

fetchListItems();