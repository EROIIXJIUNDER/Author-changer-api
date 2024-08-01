const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// Path to the file where the author name is stored
const authorFilePath = path.join(__dirname, 'author.json');

// Get the current author name
app.get('/author', (req, res) => {
    fs.readFile(authorFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading author data.');
        }
        res.json({ author: JSON.parse(data).author });
    });
});

// Update the author name
app.post('/author', (req, res) => {
    const newAuthor = req.body.author;
    if (!newAuthor) {
        return res.status(400).send('Author name is required.');
    }

    fs.writeFile(authorFilePath, JSON.stringify({ author: newAuthor }), 'utf8', (err) => {
        if (err) {
            return res.status(500).send('Error updating author data.');
        }
        res.send(`Author updated to: ${newAuthor}`);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
