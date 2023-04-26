import { App } from './App'
import { comment } from './routes/Comment/Comment'
import CommentRouter from './routes/Comment/CommentRoute'
import { ingredient } from './routes/Ingredient/Ingredient'
import IngredientRouter from './routes/Ingredient/IngredientRoute'
import { order } from './routes/Order/Order'
import OrderRouter from './routes/Order/OrderRoute'
import { product } from './routes/Product/Product'
import ProductRouter from './routes/Product/ProductRoute'
import { user } from './routes/User/User'
import UserRouter from './routes/User/UserRoute'
import { URL_MONGO_CONNECTION } from './utils/const'
import { VersionApplication, PortServer, DescriptionApplication } from './utils/settings'

const PORT = PortServer
const VERSION = VersionApplication
const NAME_API = `/api-v${VERSION}`

const app: App = new App(URL_MONGO_CONNECTION, PORT, NAME_API)

app.description(DescriptionApplication)

app.import(comment, CommentRouter)
app.import(ingredient, IngredientRouter)
app.import(order, OrderRouter)
app.import(product, ProductRouter)
app.import(user, UserRouter)

app.init()

// app.use('/pruebac', a)

// app.get('/ping', (req, res) => {
//   const comment: Comment = new Comment(req, res)
//   comment.save()
// })
