var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const User = require('../models/users');

router.get('/', (req, res, next) => {
   User.find()
        // .populate('books')
        .then(users => {
            res.status(200).json({
                message: 'Users fetch successfully',
                users: users
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
    User.findOne({
        "id": req.params.id
    })
    // .populate('author')
    .then(user => {
        res.status(200).json({
            message: 'User fetched successfully',
            user: user
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
    const maxUserId = sequenceGenerator.nextId('user');
    console.log("Max User Id: " + maxUserId);

    const user = new User({
        id: maxUserId,
        name: req.body.name,
        // imageUrl: req.body.imageUrl,
        // required: bkRequired
    });

    user.save()
        .then(createdUser => {
            res.status(201).json({
                message: 'User added successfully',
                user: createdUser
            });
        })
        // .then(async createdBook => {
        //     const message = await createdBook.populate('author');
        //     res.status(201).json({
        //         message: 'Book added successfully',
        //         book: createdBook
        //     });
        // })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    User.findOne({ id: req.params.id })
    .then(user => {
        user.name = req.body.name;
        // user.imageUrl = req.body.imageUrl;
        // book.required = req.body.required;

        User.updateOne({ id: req.params.id }, user)
            .then(result => {
                res.status(204).json({
                    message: 'User updated successfully',
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
            message: 'User not found.',
            error: { user: 'User not found'}
        });
    });
});

router.delete('/:id', (req, res, next) => {
    User.findOne({ id: req.params.id })
    .then(user => {
        User.deleteOne({ id: req.params.id })
            .then(result => {
                res.status(204).json({
                    message: 'User deleted successfully'
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
            message: 'User not found.',
            error: { user: 'User not found' }
        });
    });
});
  
module.exports = router;