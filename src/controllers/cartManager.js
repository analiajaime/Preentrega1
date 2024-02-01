const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.ultId = 0;
        this.loadCarts();
    }

    async getAllCarts() {
        try {
            await this.loadCarts();
            return this.carts;
        } catch (error) {
            console.error("Error al obtener todos los carritos. Linea 50", error);
            throw error;  
        }
    }
    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
    
            if (data.length > 0) {
                this.carts = JSON.parse(data);
                CartManager.idCart = Math.max(...this.carts.map(cart => cart.id));
            } else {
                console.log("No hay carritos registrados.");
            }
        } catch (error) {
            console.error("Error al cargar el archivo.", error);
            await this.saveCarts();
        }
    }

    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async createNewCart() {
        const cart = {
            id: ++CartManager.idCart,
            products: []
        };

        this.carts.push(cart);

        await this.saveCarts();

        return cart; 
    }

    async searchCart(id) {
        try {
            await this.loadCarts();
            const cartFinded = this.carts.find(cart => cart.id == id);

            if (!cartFinded) {
                throw new Error(`Carrito ${id}, no registrado.`);
            }

            return cartFinded;
        } catch (error) {
            console.error("Error al buscar carrito: ", error);
        }
    }

    async addProductToCart(cId, pId, quantity = 1) {
        try {
            const cart = await this.searchCart(cId);
            const productFinded = cart.products.find(prod => prod.product == pId);

            if (productFinded) {
                productFinded.quantity += quantity;
            } else {
                cart.products.push({ product: pId, quantity });

            }

            await this.saveCarts();
            return cart;
        } catch (error) {
            console.error("Error al agregar el producto: ", error);
        }
    }
}

module.exports = CartManager;
