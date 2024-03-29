import express from "express";
import mysql from 'mysql';
import cors from 'cors';

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "zhanglu1998@",
    database: 'test',
    authPlugin: 'mysql_native_password'
})

// allow the clent to send data to the express server
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM test.books"

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)

        return res.json('Books has been created successfully!')
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)

        return res.json('Books has been deleted successfully!')
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)

        return res.json('Books has been created successfully!')
    })
})

app.listen(8800, () => {
    console.log('backenddd dd')
})