import { Request, Response } from 'express'
import { Controller } from '../../abstract/Controller'
import { ILoggerChild } from '../../interfaces/ILoggerChild'
import { Logger } from '../../utils/Logger'
import { EnumColorLogger, HTTP_RESPONSE } from '../../types.enum'
import HttpMethods from '../../decorators/HttpMethods'
import { InputHttpMethodsArgument, InputHttpMethodsArgumentFile, ReturnMethod } from '../../types'
import IngredientService from '../../services/Ingredient/IngredientServices'
import IngredientTypeCheck from '../typecheck/IngredientTypeCheck'
import { ErrorResponse } from '../../interfaces/IErrorResponse'
import { IIngredient } from '../../interfaces/IIngredients'
import { host } from '../../utils/settings'
import { HttpMethodsFile } from '../../decorators/HttpMethodsFiles'

const loggerIngredient: Logger = new Logger(EnumColorLogger.FgCyan, 'Ingredient')

const ingredientServices: IngredientService = new IngredientService()

export class Ingredient extends Controller {
  public readonly path: string = '/ingredient'

  // Routes
  public readonly pathGetIngredients: string = '/'
  public readonly pathGetIngredient: string = '/:id'
  public readonly pathGetIngredientByName: string = '/byname/:name'
  public readonly pathPostIngredient: string = '/'
  public readonly pathPostIngredientImage: string = '/image/:id'
  public readonly pathPutIngredientStock: string = '/:id'
  public readonly pathDeleteIngredient: string = '/:id'

  constructor () {
    super()

    this.addInterceptor()
    loggerIngredient.Log('Ingredients Routes:')
    loggerIngredient.Log(`GET Ingredients: ${host}${this.path}${this.pathGetIngredients}`)
    loggerIngredient.Log(`GET Ingredient: ${host}${this.path}${this.pathGetIngredient}`)
    loggerIngredient.Log(`GET Ingredient By Name: ${host}${this.path}${this.pathGetIngredientByName}`)
    loggerIngredient.Log(`POST Ingredient: ${host}${this.path}${this.pathPostIngredient}`)
    loggerIngredient.Log(`POST Ingredient Image: ${host}${this.path}${this.pathPostIngredientImage}`)
    loggerIngredient.Log(`PUT Ingredient only update Stock: ${host}${this.path}${this.pathPutIngredientStock}`)
    loggerIngredient.Log(`DELETE Ingredient: ${host}${this.path}${this.pathDeleteIngredient}`)
  }

  @HttpMethods(true)
  async GetIngredients (_input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const ingredients = await ingredientServices.FindAll()
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: ingredients
    }
  }

  @HttpMethods(true)
  async GetIngredient (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = input.params
    const ingredient = await ingredientServices.Find(id)
    if (ingredient === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Ingredient whit this id'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: ingredient
      }
    }
  }

  @HttpMethods(true)
  async GetIngredientByName (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { name } = input.params
    const ingredient = await ingredientServices.FindByName(name)
    if (ingredient === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: 'Not Ingredient whit this name'
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: ingredient
      }
    }
  }

  @HttpMethods(true)
  async PostIngredient (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const ingredientVericate = IngredientTypeCheck.check(input.body)
    if (Object.hasOwn(ingredientVericate, 'error')) {
      const errorFin = ingredientVericate as ErrorResponse
      return {
        status: errorFin.status,
        response: errorFin.error
      }
    } else {
      const newIngredient = await ingredientServices.Create(ingredientVericate as IIngredient)
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: newIngredient
      }
    }
  }

  @HttpMethodsFile(true)
  async PostIngredientImage (input: InputHttpMethodsArgumentFile): Promise<ReturnMethod> {
    const id = input.params.id
    const image = input.file

    const ingredient = await ingredientServices.Find(id)

    if (ingredient === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: 'Not exist a Ingredient with this id'
      }
    }

    const ingredientupdate = ingredientServices.Update({ _id: id }, { image: image.filename })

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: ingredientupdate
    }
  }

  @HttpMethods(true)
  async PutIngredientStock (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { stock } = input.body
    const id = input.params.id
    if (stock === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Stock Required'
      }
    }
    if (typeof stock !== 'number') {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: 'Stock not type Number'
      }
    }
    const ingredientUpdate = await ingredientServices.Update({ _id: id }, { stock })
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: ingredientUpdate
    }
  }

  @HttpMethods(true)
  async DeleteIngredient (input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const id = input.params.id
    const ingredientDelete = await ingredientServices.Delete(id)
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: ingredientDelete
    }
  }

  Interceptor (_req: Request, _res: Response, next: Function, interceptorLogger: ILoggerChild): void {
    interceptorLogger.LogChild('Ingredient', 'Ingredient is Execute')
    next()
  }
}

export const ingredient: Ingredient = new Ingredient()
