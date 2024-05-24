const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


function groupItemsWithQuantity(items) {
    const groupedItems = items.reduce((acc, item) => {
        const key = `${item.item}-${item.brand}-${item.price}`;
        if (!acc[key]) {
            acc[key] = { ...item, quantity: 0 };
        }
        acc[key].quantity += 1;
        return acc;
    }, {});
    return Object.values(groupedItems);
}



const readCart = () => JSON.parse(fs.readFileSync('cart.json', 'utf8'));
const writeCart = (cart) => fs.writeFileSync('cart.json', JSON.stringify(cart, null, 2));


app.post('/update-cart-item', (req, res) => {
    const { item, brand, price, action } = req.body;

    let cart = readCart();

    // Find the item in the cart
    const itemIndex = cart.findIndex(cartItem =>
        cartItem.item === item &&
        cartItem.brand === brand &&
        cartItem.price === price
    );

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found in cart' });
    }

    // Update the quantity
    if (action === 'increase') {
        cart[itemIndex].quantity += 1;
    } else if (action === 'decrease') {
        cart[itemIndex].quantity -= 1;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }

    writeCart(cart);
    res.json({ message: 'Cart updated successfully' });
});

// API endpoint to fetch cart items
app.get('/cart-items', (req, res) => {
    let cart = readCart();
    res.json(cart);
});




const readList = () => JSON.parse(fs.readFileSync('list.json', 'utf8'));
const writeList = (list) => fs.writeFileSync('list.json', JSON.stringify(list, null, 2));


app.post('/update-list-item', (req, res) => {
    const { item, brand, price, action } = req.body;

    let list = readList();

    // Find the item in the cart
    const itemIndex = list.findIndex(listItem =>
        listItem.item === item &&
        listItem.brand === brand &&
        listItem.price === price
    );

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found in list' });
    }

    // Update the quantity
    if (action === 'increase') {
        list[itemIndex].quantity += 1;
    } else if (action === 'decrease') {
        list[itemIndex].quantity -= 1;
        if (list[itemIndex].quantity <= 0) {
            list.splice(itemIndex, 1);
        }
    }

    writeList(list);
    res.json({ message: 'List updated successfully' });
});

// API endpoint to fetch cart items
app.get('/list-items', (req, res) => {
    let list = readList();
    res.json(list);
});









app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

// API endpoint to get cart items
app.get('/cart-items', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading cart file' });
        }
        let cart = JSON.parse(data);
        cart = groupItemsWithQuantity(cart);
        res.json(cart);
    });
});



app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'list.html'));
});

app.get('/list-items', (req, res) => {
    fs.readFile('list.json', 'utf8', (err,data) => {
        if(err) {
            return res.status(500).json({error: "Error reading list file"});
        }
        let list = JSON.parse(data);
        list = groupItemsWithQuantity(list);
        res.json(list);
    })
})



app.post('/add-to-cart', (req, res) => {
    const newItem = req.body;

    let cart = readCart();

    // Check if item already exists
    const existingItem = cart.find(cartItem =>
        cartItem.item === newItem.item &&
        cartItem.brand === newItem.brand &&
        cartItem.price === newItem.price
    );

    if (existingItem) {
        existingItem.quantity += 1; // Only update the quantity
    } else {
        newItem.quantity = 1;
        cart.push(newItem);
    }

    writeCart(cart);
    res.json({ message: 'Item added to cart successfully' });
});




app.post('/add-to-list', (req, res) => {
    const newItem = req.body;

    let list = readList();

    // Check if item already exists
    const existingItem = list.find(listItem =>
        listItem.item === newItem.item &&
        listItem.brand === newItem.brand &&
        listItem.price === newItem.price
    );

    if (existingItem) {
        existingItem.quantity += 1; // Only update the quantity
    } else {
        newItem.quantity = 1;
        list.push(newItem);
    }

    writeList(list);
    res.json({ message: 'Item added to list successfully' });
});




// app.post('/add-to-list', (req, res) => {
//     const newItem = req.body;

//     fs.readFile('list.json', 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error reading list file' });
//         }

//         let list = JSON.parse(data);
//         list.push(newItem);

//         fs.writeFile('list.json', JSON.stringify(list, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Error writing to list file' });
//             }

//             res.json({ message: 'Item added to list successfully' });
//         });
//     });
// });



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});