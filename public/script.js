const volleyball = {
    item: "Molten FIVB Volleyball",
    brand: "Molten",
    price: 70,
    imageUrl: "images/moltenvball.jpg"
}

const legoCar = {
    item: "Lego Technic Batmobile",
    brand: "LEGO",
    price: 120,
    imageUrl: "images/batmobilelego.jpg"
}

const gpu = {
    item: "NVIDIA RTX 4090",
    brand: "NVIDIA",
    price: 1300,
    imageUrl: "images/nvidia4090.jpg"
}


document.getElementById('addVolleyballCart').addEventListener('click', ()=>{
    addItemtoCart(volleyball)
});

document.getElementById('addVolleyballList').addEventListener('click', () => {
    addItemtoList(volleyball)
})

document.getElementById('addLEGOCart').addEventListener('click', () => {
    addItemtoCart(legoCar)
})

document.getElementById('addLEGOList').addEventListener('click', () => {
    addItemtoList(legoCar)
})


document.getElementById('addGPUCart').addEventListener('click', () => {
    addItemtoCart(gpu)
})

document.getElementById('addGPUList').addEventListener('click', () => {
    addItemtoList(gpu)
})

function addItemtoCart(item) {
    fetch('/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })

    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function addItemtoList(item) {
    fetch('/add-to-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}




