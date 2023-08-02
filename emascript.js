class ProductManager {
    constructor() {
        this.products = []
    }
    
    addProduct(product) {
        const prod = this.products.find(prod => prod.code === product.code)

        if (prod) {
            console.log("Producto ya existente")
        } else {
            this.products.push(product)
        }
    }

    getProducts() {
        console.log(this.products)
    }

    getProductById(id) {
        const prod = this.products.find(prod => prod.id === id)

        if (prod) {
            console.log(prod)
        } else {
            console.log("Producto no existente")
        }
    }
}

class Product {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title
        this.description = description
        this.price = price
        this.code = code
        this.stock = stock
        this.thumbnail = thumbnail
        this.id = Product.elevarId()
    }

    static elevarId() {

        if (this.idElevado) {
            this.idElevado++
        } else {
            this.idElevado = 1
        }
        return this.idElevado
    }
}

const product1 = new Product("Graphics Card", "6600XT", 1999, "GC0001", 10, [])
const product2 = new Product("Processor", "Ryzen 5", 1299, "PR0001", 7, [])
const product3 = new Product("Memory RAM", "Corsair 3600Mhz", 990, "MR0001", 5, [])
const product4 = new Product("Memory RA", "Corsair 3600Mz", 99, "MR0001", 6, [])
const productManager = new ProductManager()


productManager.addProduct(product1) // Obtener producto n1
productManager.addProduct(product2) // Obtener producto n2
productManager.addProduct(product3) // Obtener producto n3
productManager.getProducts() // Obtener array de productos
productManager.getProductById(2) //Obtener producto con ID 2
productManager.getProductById(5) //Obtener producto con ID 5 como prueba para ID no existente
productManager.addProduct(product4) //Obtener producto n4 como prueba para ID ya existente