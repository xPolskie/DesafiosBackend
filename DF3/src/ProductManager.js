import { promises as fs } from 'fs'

const path = './products/productos.json'

async function getProducts() {
    const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
    console.log(prods)
}

const getProductById = async (id) => {
    const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
    const producto = prods.find(prod => prod.id === id)

    if (producto)
        console.log(producto)
    else
        console.log("Producto inexistente")
}

const addProduct = async (product) => {
    const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
    const producto = prods.find(prod => prod.id === product.id)

    if (producto) {
        console.log("Producto ya existente")
    } else {
        prods.push(product)
        await fs.writeFile(path, JSON.stringify(prods))
    }
}

const updateProduct = async (id, product) => {
    const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
    const indice = prods.findIndex(prod => prod.id === id)
    if (indice != -1) {
        prods[indice].nombre = product.nombre
        await fs.writeFile(path, JSON.stringify(prods))
    } else {
        console.log("Producto inexistente")
    }
}

const deleteProduct = async (id) => {
    const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
    const producto = prods.find(prod => prod.id === id)

    if (producto) {
        await fs.writeFile(path, JSON.stringify(prods.filter(prod => prod.id != id)))
    } else {
        console.log("Producto inexistente")
    }
}
