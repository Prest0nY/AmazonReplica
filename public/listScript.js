fetch('/list-items')
    .then(response => response.json())
    .then(data => {
        const listItemsDiv = document.getElementById('listItems');
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


                itemDiv.appendChild(itemName);
                itemDiv.appendChild(itemBrand);
                itemDiv.appendChild(itemPrice);
                itemDiv.appendChild(itemQuantity);

                listItemsDiv.appendChild(itemDiv);

            })
        }
    })



    .catch(error => {
        console.error('Error fetching list items: ', error);
    })