var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Book = require('../models/books');

router.get('/', (req, res, next) => {
    Book.find()
        .populate('author')
        .then(books => {
            res.status(200).json({
                    message: 'Books fetched successfully!',
                    books: books
            });
        })
        // .then(async books => {
        //     const message = await books.populate('author');
        //     res.status(200).json({
        //             message: 'Books fetched successfully!',
        //             books: books
        //     });
        // })
        .catch(error => {
            res.status(500).json({
                    message: 'An error occurred',
                    error: error
                });
        });
});

router.get('/:id', (req, res, next) => {
    Book.findOne({
        "id": req.params.id
    })
    .populate('author')
    .then(book => {
        res.status(200).json({
            message: 'Book fetched successfully',
            book: book
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
    const maxBookId = sequenceGenerator.nextId('book');
    bkRequired = "";

    if(req.body.required === "" ? bkRequired = false : bkRequired = req.body.required);

    const book = new Book({
        id: maxBookId,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        required: bkRequired
    });

    console.log("Inside post " + book);
    console.log("Inside post | req" + req);

    book.save()
        // .then(createBook => {
        //     res.status(201).json({
        //         message: 'Book added successfully',
        //         book: createBook
        //     });
        // })
        .then(async createdBook => {
            const message = await createdBook.populate('author');
            res.status(201).json({
                message: 'Book added successfully',
                book: createdBook
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
    Book.findOne({ id: req.params.id })
        .then(book => {
            book.title = req.body.title;
            book.author = req.body.author
            book.description = req.body.description
            book.imageUrl = req.body.imageUrl;
            book.required = req.body.required;

            Book.updateOne({ id: req.params.id }, book)
                .then(result => {
                    res.status(204).json({
                        message: 'Book updated successfully',
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
                message: 'Book not found.',
                error: { book: 'Book not found'}
            });
        });
});

router.delete('/:id', (req, res, next) => {
    Book.findOne({ id: req.params.id })
        .then(book => {
            Book.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: 'Book deleted successfully'
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
                message: 'Book not found.',
                error: { book: 'Book not found' }
            });
        });
});
  
module.exports = router;