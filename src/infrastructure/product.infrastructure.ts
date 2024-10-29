import { IProduct } from '../models/product.model'

export class ProductInfrastructure {
    private products: IProduct[] = []
    private idCounter: number = 1

    async create(product: Omit<IProduct, 'id'>): Promise<IProduct> {
        const newProduct = { ...product, id: this.idCounter, stock: product.stock ?? 0 }
        this.idCounter++
        this.products.push(newProduct)
        return newProduct
    }

    async getAll(): Promise<IProduct[]> {
        return this.products
    }

    async update(id: number, product: Partial<IProduct>): Promise<IProduct | null> {
        const productIndex = this.products.findIndex((elem) => elem.id === id)
        if (productIndex < 0) return null

        this.products[productIndex] = { ...this.products[productIndex], ...product, id: id }
        return this.products[productIndex]
    }

    async delete(id: number): Promise<boolean> {
        const productIndex = this.products.findIndex((elem) => elem.id === id)
        if (productIndex < 0) return false

        this.products.splice(productIndex, 1)
        return true
    }
}
