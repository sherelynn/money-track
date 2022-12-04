const express = require('express')
const path = require('path')

const transactions = require('./routes/transactions')
const expenses = require('./routes/expenses')
const incomes = require('./routes/incomes')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/transactions', transactions)
server.use('/api/v1/expenses', expenses)
server.use('/api/v1/incomes', incomes)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
