enum MONGODB_CONNECT_CONST {
  USERNAME = 'danielcampaz',
  PASSWORD = 'MUsgopyz7NkYRIMK',
  DB = 'restaurant'
}

export const URL_MONGO_CONNECTION = `mongodb+srv://${MONGODB_CONNECT_CONST.USERNAME}:${MONGODB_CONNECT_CONST.PASSWORD}@restaurant.qmywxq1.mongodb.net/${MONGODB_CONNECT_CONST.DB}`

export const FILTER_URL = (url: string): string[] => {
  const urlSplit = url.split('/')
  const array = []
  for (let index = 0; index < urlSplit.length; index++) {
    if (urlSplit[index] !== 'api-v1') {
      if (urlSplit[index] !== '') {
        if (urlSplit[index] !== ' ') {
          array.push(urlSplit[index])
        }
      }
    }
  }
  return array
}

export const ERROR = (message: string | number | object): Object => {
  return {
    error: message
  }
}
