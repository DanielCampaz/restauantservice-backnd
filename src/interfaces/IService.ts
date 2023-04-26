export interface IService<Type> {
  Create: (item: Type) => Promise<Type>
  Update: (filter: object, update: object) => Promise<Type>
  Delete: (id: string) => Promise<any>
  Find: (id: string) => Promise<Type | null>
}
