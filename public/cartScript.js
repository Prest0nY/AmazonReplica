function updateCartItem(item, brand, price, action) {
    fetch('/update-cart-item', {
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
            fetchCartItems(); // Refresh the cart items display
        }
    })
    .catch(error => {
        console.error('Error updating cart item:', error);
    });
}




function fetchCartItems () {
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


                    const quantityDiv = document.createElement('div');
                    

                    const lessCart = document.createElement('button');
                    lessCart.innerText = '-'
                    lessCart.addEventListener('click', () => updateCartItem(item.item, item.brand, item.price, 'decrease'));
                    lessCart.style.fontFamily = 'Teko';
                    lessCart.style.fontSize = '20px'



                    const moreCart = document.createElement('button');
                    moreCart.innerText = '+';
                    moreCart.addEventListener('click', () => updateCartItem(item.item, item.brand, item.price, 'increase'))
                    moreCart.style.fontFamily = 'Teko';
                    moreCart.style.fontSize = '20px'


                    const itemImage = document.createElement('img');
                    itemImage.src = item.imageUrl;
                    itemImage.style.width = '10%'


                    quantityDiv.appendChild(lessCart);
                    quantityDiv.appendChild(moreCart);


                    itemDiv.appendChild(itemName);
                    itemDiv.appendChild(itemImage);
                    itemDiv.appendChild(itemBrand);
                    itemDiv.appendChild(itemPrice);
                    itemDiv.appendChild(itemQuantity);
                    itemDiv.appendChild(quantityDiv);

                    cartItemsDiv.appendChild(itemDiv);
                });
            }
        })
    



        .catch(error => {
            console.error('Error fetching cart items:', error);
        });

}


fetchCartItems();