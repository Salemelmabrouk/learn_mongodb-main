import express from 'express'
import { dbConnection } from './database/dbConnections.js'
import userRouter from './src/modules/users/user.routes.js'
import notesRouter from './src/modules/notes/note.routes.js'


const app = express()
const port = 3000
app.use(express.json())

app.use(userRouter)
app.use('/notes',  notesRouter)



app.get('/', (req, res) => res.send('Hello World!'))
dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

