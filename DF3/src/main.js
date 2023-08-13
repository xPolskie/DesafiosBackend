import express from 'express'
import ProductManager from '../src/ProductManager.js';
import fs from 'fs';
const PRODUCTS_FILE_PATH = "./products/products.json";
const productManager = new ProductManager(PRODUCTS_FILE_PATH);


let prods = [];

try {
    prods = JSON.parse(fs.readFileSync(PRODUCTS_FILE_PATH, 'utf8'));
} catch (error) {
    console.error("Error leyendo productos:", error);
}

const PORT = 4000
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Bienvenido.")
})

app.get('/products', async (req, res) => {
    console.log(req.query)
    const products = await productManager.getProducts()
    const { categoria } = req.query
    if (categoria) {
        const products = prods.filter(prod => prod.categoria === categoria)
        res.status(200).send(products)
    }

    res.status(200).send(prods)

})

app.get('/products/:id', (req, res) => {
    const prod = prods.find(prod => prod.id === parseInt(req.params.id))

    if (prod)
        res.status(200).send(prod)
    else
        res.status(404).send("Producto inexistente.")
})

app.post('/products', (req, res) => {
    console.log(req.body)

    const producto = prods.find(prod => prod.code === req.body.code)

    if (producto) {
        res.status(400).send("Producto ya existente.")
    } else {
        prods.push(req.body)
        res.status(200).send("Producto creado.")
    }

})

app.put('/products/:id', (req, res) => {
    const { id } = req.params
    console.log(req.body)
    const { nombre, categoria, code, precio } = req.body

    const productIndex = prods.findIndex(prod => prod.id === parseInt(id))

    if (productIndex != -1) {
        prods[productIndex].nombre = nombre
        prods[productIndex].categoria = categoria
        prods[productIndex].code = code
        prods[productIndex].precio = precio
        res.status(200).send(`El Producto ${nombre} ha sido actualizado.`)
    } else {
        res.status(404).send("Producto inexistente.")
    }

})

app.delete('/products/:id', (req, res) => {
    const { id } = req.params

    const productIndex = prods.findIndex(prod => prod.id === parseInt(id))

    if (productIndex != -1) {
        prods = prods.filter(prod => prod.id != parseInt(id))
        res.status(200).send(`El Producto ha sido eliminado.`)
    } else {
        res.status(404).send("Producto inexistente.")
    }

})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`)
})