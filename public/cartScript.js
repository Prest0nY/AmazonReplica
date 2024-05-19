fetch('/cart-items')
    .then(response => response.json())
    .then(data => {
        const cartItemsDiv = document.getElementById('cartItems');
        if (data.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.style.paddingBottom = "20px"



                const itemName = document.createElement('p');
                itemName.innerText = `Item: ${item.item}`;
                



                const itemBrand = document.createElement('p');
                itemBrand.innerText = `Brand: ${item.brand}`;
             



                const itemPrice = document.createElement('p');
                itemPrice.innerText = `Price: $ ${item.price}`;
                



                const itemQuantity = document.createElement('p');
                itemQuantity.innerText = `Quantity: ${item.quantity}`;


                itemDiv.appendChild(itemName);
                itemDiv.appendChild(itemBrand);
                itemDiv.appendChild(itemPrice);
                itemDiv.appendChild(itemQuantity);

                cartItemsDiv.appendChild(itemDiv);
            });
        }
    })




    .catch(error => {
        console.error('Error fetching cart items:', error);
    });