import { Application, Request, Response, Router } from 'express'
import { ProductService } from '../service/product.service'
import { IProduct } from '../models/product.model'
import { IServerRes } from '../models/response.model'

export class ProductController {
    private readonly productService: ProductService
    private readonly controllerUrl: string = '/products/'

    constructor(router: Router, app: Application) {
        this.productService = new ProductService()
        this.initializeRoutes(router, app)
    }

    private initializeRoutes(router: Router, app: Application): void {
        router.post('/', (req, res) => this.create(req, res))
        router.get('/', (req, res) => this.get(req, res))
        router.put('/:id', (req, res) => this.update(req, res))
        router.delete('/:id', (req, res) => this.delete(req, res))
        app.use(this.controllerUrl, router)
    }

    private async create(req: Request, res: Response<IServerRes<IProduct>>): Promise<void> {
        try {
            const newProduct: IProduct = await this.productService.create(req.body)
            res.status(201).json({ message: 'Producto creado', data: newProduct })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    private async get(req: Request, res: Response<IServerRes<IProduct[]>>): Promise<void> {
        try {
            const products: IProduct[] = await this.productService.getAll()
            res.status(200).json({ message: 'Productos encontrados', data: products })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    private async update(req: Request, res: Response<IServerRes<IProduct | null>>): Promise<void> {
        try {
            const updatedProduct: IProduct | null = await this.productService.update(req.params.id, req.body)
            updatedProduct
                ? res.status(200).json({ message: 'Producto actualizado', data: updatedProduct })
                : res.status(404).json({ message: 'Producto no encontrado', data: null })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    private async delete(req: Request, res: Response<IServerRes>): Promise<void> {
        try {
            const result: boolean = await this.productService.delete(req.params.id)
            result
                ? res.status(200).json({ message: 'Producto borrado' })
                : res.status(404).json({ message: 'Producto no encontrado' })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}
