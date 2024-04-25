const express = require('express');
const app = express();

app.use(express.json());

const items = [
	{ id: 1, nombre: 'Taza de Harry Potter', precio: 300 },
	{ id: 2, nombre: 'FIFA 23 PS5', precio: 1000 },
	{ id: 3, nombre: 'Figura Goku Super Saiyan', precio: 100 },
	{ id: 4, nombre: 'Zelda Breath of the Wild', precio: 200 },
	{ id: 5, nombre: 'Skin Valorant', precio: 120 },
	{ id: 6, nombre: 'Taza de Star Wars', precio: 220 },
];

app.get('/products', (req, res) => {
	res.send({ description: 'Productos', items });
});

app.post('/products', (req, res) => {
	const newItem = {
		id: items.length + 1,
		nombre: req.body.nombre,
		precio: req.body.precio,
	};

	items.push(newItem);

	res.status(201).send({ description: 'Productos actualizados', items });
});

app.delete('/products/:id', (req, res) => {
	const found = items.some((item) => item.id == req.params.id);
	if (found) {
		const filteredItems = items.filter((item) => item.id != req.params.id);
		res.send({ description: 'Producto eliminado', filteredItems });
	} else {
		res.status(404).send(`Product with id ${req.params.id} not found`);
	}
});

app.get('/products/search', (req, res) => {
	const search = req.query.price;
	const [min, max] = search.split('-');
	const filteredItems = [];
	items.forEach((item) => {
		if (item.precio >= min && item.precio <= max) {
			filteredItems.push(item);
		}
	});
	res.send({ description: `Filtered products between ${min} and ${max}`, filteredItems });
});

app.get('/products/price/:price', (req, res) => {
	const priceSearch = req.params.price;
	const filteredItems = [];
	items.forEach((item) => {
		if (item.precio == priceSearch) {
			filteredItems.push(item);
		}
	});
	res.send({ description: `Filtered product by price`, filteredItems});
});

app.get('/products/id/:id', (req, res) => {
	const found = items.some((item) => item.id == req.params.id);
	if (found) {
		const idProduct = req.params.id;
		const filteredProduct = [];
        items.forEach((product) => {
			if (product.id == idProduct) {
				filteredProduct.push(product);
				res.send({ description: `The product by id = ${idProduct} is: `, filteredProduct });
			}
		});
	} else {
		res.send('Product not found by id');
	}
});

app.get('/products/product/:name', (req, res) => {
    const reqNameProduct = req.params.name;
    const nameProduct = reqNameProduct.split('-').join(' ');
	const found = items.some((item) => item.nombre == nameProduct);
	if (found) {
		const filteredProduct = [];
        items.forEach((product) => {
			if (product.nombre == nameProduct) {
				filteredProduct.push(product);
				res.send({ description: `The product ${nameProduct}: `, filteredProduct });
			}
		});
	} else {
		res.send('Product not found by name.');
	}
});

app.listen(3000, () => {
	console.log('Servidor levantado');
});
