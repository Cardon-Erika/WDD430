var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Log = require('../models/logs');

router.get('/', (req, res, next) => {
   Log.find()
        .populate('book')
        .populate('user')
        .then(logs => {
            res.status(200).json({
                message: 'Logs fetched successfully',
                logs: logs
            });
        })
        // .then(async logs => {
        //     const message = await logs.populate('user').populate('book');
        //     res.status(200).json({
        //         message: 'Logs fetched successfully',
        //         logs: logs
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
    Log.findOne({
        "id": req.params.id
    })
    .populate('user')
    .populate('book')
    .then(log => {
        res.status(200).json({
            message: 'Log fetched successfully',
            log: log
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
    const maxLogId = sequenceGenerator.nextId('log');
    console.log("Max Log Id: " + maxLogId);

    console.log("Req: " + JSON.stringify(req.body));
    const log = new Log({
        id: maxLogId,
        user: req.body.user,
        book: req.body.book,
        thoughts: req.body.thoughts,
        // required: bkRequired
    });

    log.save()
        // .then(createdLog => {
        //     res.status(201).json({
        //         message: 'Log added successfully',
        //         log: createdLog
        //     });
        // })
        .then(async createdLog => {
            const message = await createdLog.populate('user').populate('book');
            res.status(201).json({
                message: 'Log added successfully',
                log: createdLog
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
    Log.findOne({ id: req.params.id })
    .then(log => {
        log.user = req.body.user;
        log.book = req.body.book;
        log.thoughts = req.body.thoughts;
        // book.required = req.body.required;

        Log.updateOne({ id: req.params.id }, log)
            .then(result => {
                res.status(204).json({
                    message: 'Log updated successfully',
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
            message: 'Log not found.',
            error: { log: 'Log not found'}
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Log.findOne({ id: req.params.id })
    .then(log => {
        Log.deleteOne({ id: req.params.id })
            .then(result => {
                res.status(204).json({
                    message: 'Log deleted successfully'
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
            message: 'Log not found.',
            error: { log: 'Log not found' }
        });
    });
});
  
module.exports = router;