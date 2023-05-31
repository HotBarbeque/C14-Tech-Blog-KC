// Importing the required dependencies and modules
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET route for retrieving all posts with associated users and comments
router.get('/', (req, res) => {
    // Using the Post model to find all posts with specified attributes, order, and associated models
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// GET route for retrieving a single post by its ID with associated user and comments
router.get('/:id', (req, res) => {
    // Using the Post model to find a post with the specified ID, along with associated attributes and models
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

// POST route for creating a new post that requires authentication
router.post('/', withAuth, (req, res) => {
     // Using the Post model to create a new post with the provided data
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// PUT route for updating a post by its ID that requires authentication
router.put('/:id', withAuth, (req, res) => {
     // Using the Post model to update the post with the provided data, based on the specified ID
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// DELETE route for deleting a post by its ID that requires authentication
router.delete('/:id', withAuth, (req, res) => {
    // Using the Post model to delete the post that matches the provided ID
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                // If no post is found with the provided ID, return a 404 status code with an error message
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            // If the post is successfully deleted, return the deleted post data as a JSON response
            res.json(dbPostData);
        })
        .catch(err => {
            // If an error occurs during the deletion process, log the error and return a 500 status code with the error message
            console.log(err);
            res.status(500).json(err);
        });
    });

// Exporting the router module
module.exports = router;