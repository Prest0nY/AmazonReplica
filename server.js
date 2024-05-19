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

    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading cart file' });
        }

        let cart = JSON.parse(data);
        cart.push(newItem);

        fs.writeFile('cart.json', JSON.stringify(cart, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing to cart file' });
            }

            res.json({ message: 'Item added to cart successfully' });
        });
    });
});



app.post('/add-to-list', (req, res) => {
    const newItem = req.body;

    fs.readFile('list.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading list file' });
        }

        let list = JSON.parse(data);
        list.push(newItem);

        fs.writeFile('list.json', JSON.stringify(list, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing to list file' });
            }

            res.json({ message: 'Item added to list successfully' });
        });
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});