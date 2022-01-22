const express = require('express')
const Next = require('next')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const saveDataToFile = require('./saveDataToFile')

const port = process.env.PORT || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()

const server = express()

app.prepare()
    .then(() => {
        server.use(cookieParser())
        server.use(cors())
        server.use('/save-data', saveDataToFile)
        // server.use(bodyParser.urlencoded({ extended: true }))
        // server.use(bodyParser.json())

        server.use(['/profile', '/estimation', '/signin', '/registration'], (req, res, next) => {
            res.redirect('/')
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.post('*', (req, res) => {
            return handle(req, res)
        })

        server.put('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, err => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })
