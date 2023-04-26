import { Request, Response } from 'express'
import { Controller } from '../../abstract/Controller'
import { Logger } from '../../utils/Logger'
import { EnumColorLogger, HTTP_RESPONSE } from '../../types.enum'
import { ILoggerChild } from '../../interfaces/ILoggerChild'
import HttpMethods from '../../decorators/HttpMethods'
import { InputHttpMethodsArgument, InputHttpMethodsArgumentFile, ReturnMethod } from '../../types'
import ProductService from '../../services/Product/ProductService'
import ProductTypeCheck from '../typecheck/ProductTypeCheck'
import { ErrorResponse } from '../../interfaces/IErrorResponse'
import { IProduct } from '../../interfaces/IProduct'
import { host } from '../../utils/settings'
import { HttpMethodsFile } from '../../decorators/HttpMethodsFiles'

const loggerProduct: Logger = new Logger(EnumColorLogger.FgCyan, 'Product')

const productService: ProductService = new ProductService()

export class Product extends Controller {
  public readonly path: string = '/product'

  // Routes
  public readonly pathGetProducts: string = '/'
  public readonly pathGetProduct: string = '/:id'
  public readonly pathGetProductByName: string = '/byname/:name'
  public readonly pathPostProduct: string = '/'
  public readonly pathPostProductImage: string = '/image/:id'
  public readonly pathPutProductIngredients: string = '/ingredients/:id'
  public readonly pathPutProductImages: string = '/images/:id'
  public readonly pathPutProductComments: string = '/comments/:id'
  public readonly pathDeleteProduct: string = '/:id'

  constructor () {
    super()

    this.addInterceptor()
    loggerProduct.Log('Products Routes:')
    loggerProduct.Log(`GET Products: ${host}${this.path}${this.pathGetProducts}`)
    loggerProduct.Log(`GET Product: ${host}${this.path}${this.pathGetProduct}`)
    loggerProduct.Log(`GET Product By Name: ${host}${this.path}${this.pathGetProductByName}`)
    loggerProduct.Log(`POST Product: ${host}${this.path}${this.pathPostProduct}`)
    loggerProduct.Log(`POST Product Image: ${host}${this.path}${this.pathPostProductImage}`)
    loggerProduct.Log(`PUT Product only update Ingredients ingredient_id and action: ${host}${this.path}${this.pathPutProductIngredients}`)
    loggerProduct.Log(`PUT Product only update Images image_id and action: ${host}${this.path}${this.pathPutProductImages}`)
    loggerProduct.Log(`PUT Product only update Comments comment_id and action: ${host}${this.path}${this.pathPutProductComments}`)
    loggerProduct.Log(`DELETE Product: ${host}${this.path}${this.pathDeleteProduct}`)
  }

  @HttpMethods(true)
  async GetProducts (_input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const products = await productService.FindAll()
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: products
    }
  }

  @HttpMethods(true)
  async GetProduct (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = input.params
    const product = await productService.Find(id)
    if (product === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Product whit this id'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: product
      }
    }
  }

  @HttpMethods(true)
  async GetProductByName (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { name } = input.params
    const product = await productService.FindByName(name)
    if (product === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Product whit this name'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: product
      }
    }
  }

  @HttpMethods(true)
  async PostProduct (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const productVericate = ProductTypeCheck.check(input.body)
    if (Object.hasOwn(productVericate, 'error')) {
      const errorFin = productVericate as ErrorResponse
      return {
        status: errorFin.status,
        response: errorFin.error
      }
    } else {
      const newProduct = await productService.Create(productVericate as IProduct)
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: newProduct
      }
    }
  }

  @HttpMethodsFile(true)
  async PostProductImage (input: InputHttpMethodsArgumentFile): Promise<ReturnMethod> {
    const id = input.params.id
    const image = input.file

    const product = await productService.Find(id)

    if (product === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: 'Not exist a product whit this Id'
      }
    }

    let antImages: string[] = []

    if (product.images !== undefined) {
      antImages = product.images
    }

    antImages.push(image.filename)

    const productUpdate = productService.Update({ _id: id }, { images: antImages })

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: productUpdate
    }
  }

  @HttpMethods(true)
  async PutProductIngredients (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idIngredient, action } = input.body
    const id = input.params.id
    if (idIngredient === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Id Ingredient Required'
      }
    }
    if (action === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Action Required'
      }
    }

    if (action !== 'push') {
      if (action !== 'remove') {
        return {
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
          response: 'Only in Action Push, Remove'
        }
      }
    }

    const product = await productService.Find(id)
    let antIngredients: string[] = []

    if (product !== null) {
      if (action === 'remove') {
        antIngredients = product.idIngredients.filter((e: string) => e !== idIngredient)
      } else {
        antIngredients = product.idIngredients
      }
    }

    if (action === 'push') {
      antIngredients.push(idIngredient)
    }

    const productUpdate = await productService.Update({ _id: id }, { idIngredient: antIngredients })
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: productUpdate
    }
  }

  @HttpMethods(true)
  async PutProductProductComments (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idComment, action } = input.body
    const id = input.params.id
    if (idComment === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Id Comment Required'
      }
    }
    if (action === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Action Required'
      }
    }

    if (action !== 'push') {
      if (action !== 'remove') {
        return {
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
          response: 'Only in Action Push, Remove'
        }
      }
    }
    const product = await productService.Find(id)
    let antComments: string[] = []

    if (product !== null) {
      if (product.idComments !== undefined) {
        if (action === 'remove') {
          antComments = product.idComments.filter((e: string) => e !== idComment)
        } else {
          antComments = product.idComments
        }
      }
    }

    if (action === 'push') {
      antComments.push(idComment)
    }

    const productUpdate = await productService.Update({ _id: id }, { idComments: antComments })
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: productUpdate
    }
  }

  @HttpMethods(true)
  async PutProductImages (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { image, action } = input.body
    const id = input.params.id
    if (image === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Image Required'
      }
    }
    if (action === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Action Required'
      }
    }

    if (action !== 'push') {
      if (action !== 'remove') {
        return {
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
          response: 'Only in Action Push, Remove'
        }
      }
    }

    const product = await productService.Find(id)
    let antImages: string[] = []

    if (product !== null) {
      if (product.images !== undefined) {
        if (action === 'remove') {
          antImages = product.images.filter((e: string) => e !== image)
        } else {
          antImages = product.images
        }
      }
    }

    if (action === 'push') {
      antImages.push(image)
    }

    const productUpdate = await productService.Update({ _id: id }, { images: antImages })
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: productUpdate
    }
  }

  @HttpMethods(true)
  async DeleteProduct (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const id = input.params.id
    const productDelete = await productService.Delete(id)
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: productDelete
    }
  }

  // Interceptor
  Interceptor (_req: Request, _res: Response, next: Function, loggerInterceptor: ILoggerChild): void {
    loggerInterceptor.LogChild('Product', 'Product is Execute')
    next()
  }
}

export const product: Product = new Product()
