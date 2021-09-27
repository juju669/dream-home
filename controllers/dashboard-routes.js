const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Prop } = require('../models');
const withAuth = require('../utils/auth');


router.get('/lawyer', withAuth, (req, res) => {
 //  res.json({test: "message"});
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'office_address',
      'office_name',
      'contact_number',
      'created_at',
     ],
    include: [
       {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('lawyer', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'office_address',
      'office_name',
      'contact_number',
      'created_at',
     ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'office_address',
      'office_name',
      'contact_number',
      'created_at',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render('edit-lawyer', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
///////////////////for banks///////////////////////////////////////////////
router.get('/bank', withAuth, (req, res) => {
  //  res.json({test: "message"});
   console.log(req.session);
   console.log('======================');
   Prop.findAll({
     where: {
       user_id: req.session.user_id
     },
     attributes: [
       'id',
       'branch_address',
       'branch_name',
       'contact_number',
       'created_at',
      ],
     include: [
        {
         model: User,
         attributes: ['username']
       }
     ]
   })
     .then(dbPropData => {
       const props = dbPropData.map(prop => prop.get({ plain: true }));
       res.render('bank', { props, loggedIn: true });
     })
     .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
 }); 
 // get all props for dashboard bank
 router.get('/', withAuth, (req, res) => {
   console.log(req.session);
   console.log('======================');
   Prop.findAll({
     where: {
       user_id: req.session.user_id
     },
     attributes: [
       'id',
       'branch_address',
       'branch_name',
       'branch_number',
       'created_at',
      ],
     include: [
       {
         model: User,
         attributes: ['username']
       }
     ]
   })
     .then(dbPropData => {
       const props = dbPropData.map(prop => prop.get({ plain: true }));
       res.render('dashboard', { props, loggedIn: true });
     })
     .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
 });
 
 
 router.get('/edit/:id', withAuth, (req, res) => {
   Prop.findByPk(req.params.id, {
     attributes: [
       'id',
       'branch_address',
       'branch_name',
       'contact_number',
       'created_at',
     ],
     include: [
       {
         model: User,
         attributes: ['username']
       }
     ]
   })
     .then(dbPropData => {
       if (dbPropData) {
         const prop = dbPropData.get({ plain: true });
         
         res.render('edit-bank', {
           prop,
           loggedIn: true
         });
       } else {
         res.status(404).end();
       }
     })
     .catch(err => {
       res.status(500).json(err);
     });
 });

 module.exports = router;
 module.exports = router;
