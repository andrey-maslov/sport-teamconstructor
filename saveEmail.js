const fs = require('fs')

module.exports = (req, res, next) => {
    if (req.method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const { email } = JSON.parse(parsedBody)
            const date = new Date()
            const time = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            const msg = `${email},${time},${date.getUTCHours()}:${date.getMinutes()}\n`

            fs.appendFile('preorder.csv', msg, function(error) {
                if (error) throw new Error()
            })
        })
        res.end()
    }
}
