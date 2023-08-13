import { promises as fs } from 'fs'

class ProductManager {

    constructor (productsFilePath) {
        this.path = productsFilePath;
        this.products = null;
    }
    

async addProduct(product) {
    const prods = JSON.parse(await fs.readFile(productsFilePath, 'utf-8'))
    const producto = prods.find(prod => prod.id === product.id)

    if (producto) {
        console.log("Producto ya existente")
    } else {
        prods.push(product)
        await fs.writeFile(path, JSON.stringify(prods))
    }
}

async getProducts() {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    console.log(prods)
}


async getProductById(id) {
    const prods = JSON.parse(await fs.readFile(productsFilePath, 'utf-8'))
    const producto = prods.find(prod => prod.id === id)

    if (producto)
        console.log(producto)
    else
        console.log("Producto inexistente")
}

async addProduct(product) {
    const prods = JSON.parse(await fs.readFile(productsFilePath, 'utf-8'))
    const producto = prods.find(prod => prod.id === product.id)

    if (producto) {
        console.log("Producto ya existente")
    } else {
        prods.push(product)
        await fs.writeFile(path, JSON.stringify(prods))
    }
}

async updateProduct(id, product) {
    const prods = JSON.parse(await fs.readFile(productsFilePath, 'utf-8'))
    const indice = prods.findIndex(prod => prod.id === id)
    if (indice != -1) {
        prods[indice].nombre = product.nombre
        await fs.writeFile(productsFilePath, JSON.stringify(prods))
    } else {
        console.log("Producto inexistente")
    }
}

async deleteProduct(id) {
    const prods = JSON.parse(await fs.readFile(productsFilePath, 'utf-8'))
    const producto = prods.find(prod => prod.id === id)

    if (producto) {
        await fs.writeFile(productsFilePath, JSON.stringify(prods.filter(prod => prod.id != id)))
    } else {
        console.log("Producto inexistente")
    }
}}

export default ProductManager;