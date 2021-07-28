require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT
const GalleryItem = require('./models/galleryItem')

app.set('view engine', 'ejs')
app.use(express.static('public'))

// console.log(process.env.DBURI)
// connect nimmt den String und ein Objekt mit Optionen
// async Function, deswegen .then und .catch
mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to my db')
        // Das app.listen erst in den Callback
        // Da wir den Server erst laufen haben wollen, nachdem wir mit der Datenbank verbunden sind
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    // catch fängt Fehler ab
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.end()
})

app.get('/add-new', (req, res) => {
    // wir erstellen ein neues Dokument und befüllen es
    const galleryItem = new GalleryItem({
        url: "https://images.unsplash.com/photo-1627444479551-ea349f763e96?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
        author: "Jerry Zhang",
        rating: 8
    })
    // senden wir es an die Datenbank
    galleryItem.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
})

app.get('/gallery', (req, res) => {
    // alle Dakumente in der Colection holen
    GalleryItem.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
})
app.get('/single', (req, res) => {
    // können einfach einen String übergeben
    GalleryItem.findById('610115b9cd34e94a3331f381')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
})