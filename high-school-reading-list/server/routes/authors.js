var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Author = require('../models/authors');

router.get('/', (req, res, next) => {
    Author.find()
        .populate('books')
        .then(authors => {
            res.status(200).json({
                    message: 'Authors fetched successfully!',
                    authors: authors
            });
        })
        .catch(error => {
            res.status(500).json({
                    message: 'An error occurred',
                    error: error
                });
        });
});

router.get('/:id', (req, res, next) => {
    Author.findOne({
        "id": req.params.id
    })
    .populate('books')
    .then(author => {
        res.status(200).json({
            message: 'Author fetched successfully',
            author: author
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    });
});

router.post('/', (req, res, next) => {
    const maxAuthorId = sequenceGenerator.nextId('author');
    console.log("Max Author Id: " + maxAuthorId);

    const author = new Author({
        id: maxAuthorId,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        // books: req.body.books
    });

    author.save()
        .then(createAuthor => {
            res.status(201).json({
                message: 'Author added successfully',
                author: createAuthor
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Author.findOne({ id: req.params.id })
        .then(author => {
            author.name = req.body.name;
            author.imageUrl = req.body.imageUrl;
            // author.books = req.body.books;
            console.log("Inside Put - " + author.name);

            Author.updateOne({ id: req.params.id }, author)
                .then(result => {
                    res.status(204).json({
                        message: 'Author updated successfully',
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Author not found.',
                error: { author: 'Author not found'}
            });
        });
});

router.delete('/:id', (req, res, next) => {
    Author.findOne({ id: req.params.id })
        .then(author => {
            Author.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: 'Author deleted successfully'
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "An error occurred",
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Author not found.',
                error: { author: 'Author not found' }
            });
        });
});
  
module.exports = router;