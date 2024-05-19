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