import { promises as fs } from 'fs'

const path = './productos.json'

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

const producto1 = { id: 1, nombre: "Graphics Card" }
const producto2 = { id: 2, nombre: "Processor" }
const producto3 = { id: 3, nombre: "Memory RAM" }


// TEST //

// getProducts()
// getProductById(1)
// getProductById(3)
// addProduct(producto1)
// addProduct(producto2)
// addProduct(producto3)
// updateProduct(1, { nombre: "X" })
// deleteProduct(1)
