import { ProductInfrastructure } from '../infrastructure/product.infrastructure'
import { IProduct } from '../models/product.model'

export class ProductService {
    productInfrastructure: ProductInfrastructure

    constructor() {
        this.productInfrastructure = new ProductInfrastructure()
    }

    async create(product: Omit<IProduct, 'id'>): Promise<IProduct> {
        if (!product?.nombre) throw new Error('Campo nombre es requerido para crear un producto')
        if (!product?.precio) throw new Error('Campo precio es requerido para crear un producto')
        if (Number.isNaN(Number(product?.precio))) throw new Error('El campo precio debe ser numérico')

        return this.productInfrastructure.create({ ...product, precio: Number(product?.precio) })
    }

    async getAll(): Promise<IProduct[]> {
        return this.productInfrastructure.getAll()
    }

    async update(id: string, product: Partial<IProduct>): Promise<IProduct | null> {
        if (Number.isNaN(Number(id))) throw new Error('ID debe ser un número')

        if (product?.precio) {
            if (Number.isNaN(Number(product?.precio))) throw new Error('El campo precio debe ser numérico')
            product.precio = Number(product?.precio)
        }

        return this.productInfrastructure.update(Number(id), { ...product, precio: Number(product?.precio) })
    }

    async delete(id: string): Promise<boolean> {
        if (Number.isNaN(Number(id))) throw new Error('ID debe ser un número')
        return this.productInfrastructure.delete(Number(id))
    }
}
