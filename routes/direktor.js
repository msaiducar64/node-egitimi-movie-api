const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
// Model import

const Direktor = require('../models/Director')

/* GET home page. */
router.post('/', function(req, res, next) {
  const direktor = new Direktor(req.body);
  const promise =  direktor.save();
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
  
});

router.get('/', function(req, res, next) {
  
  const promise =  Direktor.aggregate([
    {
      $lookup :{
        from: 'movies',
        localField: '_id',
        foreignField:'director_id',
        as: 'movies'
      }
    },
    {
      $unwind :{
        path: '$movies',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id: '$_id',
          name: '$name',
          surname:'$surname',
          bio:'$bio'
        },
        movies:{
          $push:'$movies'
        }
      }
    },
    {
      $project:{
        _id:'$_id._id',
        name: '$_id.name',
        surname:'$_id.surname',
        bio:'$_id.bio',
        movies:'$movies'

      }
    }

  ]);
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
  
});
router.get('/:direktor_id', function(req, res, next) {
  
  const promise =  Direktor.aggregate([
    {
      $match:{
        '_id':mongoose.Types.ObjectId(req.params.direktor_id)
      }
    },
    {
      $lookup :{
        from: 'movies',
        localField: '_id',
        foreignField:'director_id',
        as: 'movies'
      }
    },
    {
      $unwind :{
        path: '$movies',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id: '$_id',
          name: '$name',
          surname:'$surname',
          bio:'$bio'
        },
        movies:{
          $push:'$movies'
        }
      }
    },
    {
      $project:{
        _id:'$_id._id',
        name: '$_id.name',
        surname:'$_id.surname',
        bio:'$_id.bio',
        movies:'$movies'

      }
    }

  ]);
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
  
});
router.put('/:direktor_id', function(req, res, next) {
  
  const promise =  Direktor.findByIdAndUpdate(req.params.direktor_id,req.body);
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
  
});
router.delete('/:direktor_id', function(req, res, next) {  
  const promise =  Direktor.findByIdAndRemove(req.params.direktor_id);
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
  
});

module.exports = router;
