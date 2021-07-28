// auch hier mongoose!
const mongoose = require('mongoose')

// Schema Classe importieren
const Schema = mongoose.Schema


// neues Schema erstellen / definieren
// die Datenstruktur
// properties & types

const galleryItemSchema = new Schema({
    // Hier drin alles was wir in unserem Dokument haben wollen
    // https://mongoosejs.com/docs/validation.html

    // wenn wir nur den typen definieren wollen und keine weiteren Optionen haben
    // url: String
    url: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    }

    // Nach den Dokumentfeldern können wir zusätzliche Optionen übergeben
    // zB timestamps: wann wurde das Dokument erstellt bzw geupdated
}, { timestamps: true })

// Haben wir die Struktur unseres Dokuments angelegt
// jetzt mit einem Model umgeben, damit wir die Methoden nutzen können
// beginnt überlichweise mit Großbuchstaben
// der Name ist wichtig! Mongoose hängt ein s daran (verwandelt es in den Plural) und sucht dann in der DB danach
// zweite Parameter das Schema, dass er verwenden soll
const GalleryItem = mongoose.model('gallerydata', galleryItemSchema)

// Unser Model mit dem Schema exportieren / zur Verfügung stellen
module.exports = GalleryItem