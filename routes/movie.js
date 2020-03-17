const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

//Şemayı import ediyoruz

const Movie = require('../models/Movie')

router.get('/',(req,res)=>{
  const promise = Movie.aggregate([
    {
      $lookup:{
        from: 'direktors',
        localField: 'director_id',
        foreignField:'_id',
        as: 'direktors'
      }
    },
    {
      $unwind :{
        path: '$direktors',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id: '$_id',
          title:'$title',
          category : '$category',
          country: '$country',
          year: '$year',
          imdb_score:'$imdb_score',
          date:'$date'
        },
        direktors:{
          $push:'$direktors'
        }
      }
    },
    {
      $project:{
        _id: '$_id._id',
        title:'$_id.title',
        category : '$_id.category',
        country: '$_id.country',
        year: '$_id.year',
        imdb_score:'$_id.imdb_score',
        date:'$_id.date',
        direktors:'$direktors'

      }
    }

  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json({status:0})
  })
})
router.get('/top10',(req,res)=>{
  const promise = Movie.find({}).limit(10).sort({imdb_score:-1});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json({status:0})
  })
})

router.get('/:movie_id',(req,res)=>{
  const promise = Movie.aggregate([
    {
      $match:{
        '_id':mongoose.Types.ObjectId(req.params.movie_id)
      }
    },
    {
      $lookup:{
        from: 'direktors',
        localField: 'director_id',
        foreignField:'_id',
        as: 'direktors'
      }
    },
    {
      $unwind :{
        path: '$direktors',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id: '$_id',
          title:'$title',
          category : '$category',
          country: '$country',
          year: '$year',
          imdb_score:'$imdb_score',
          date:'$date'
        },
        direktors:{
          $push:'$direktors'
        }
      }
    },
    {
      $project:{
        _id: '$_id._id',
        title:'$_id.title',
        category : '$_id.category',
        country: '$_id.country',
        year: '$_id.year',
        imdb_score:'$_id.imdb_score',
        date:'$_id.date',
        direktors:'$direktors'

      }
    }

  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json({status:0})
  })
})

router.put('/:movie_id',(req,res)=>{
  const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json({err})
  })
})

router.delete('/:movie_id',(req,res)=>{
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json({err})
  })
})

router.post('/', function(req, res, next) {
  const {director_id,title,imdb_score,category,country,year} = req.body
  const movie = new Movie({
    director_id: director_id,
    title :title,
    category : category,
    country: country,
    year: year,
    imdb_score:imdb_score    
  });
  /*movie.save((err,data)=>{
    if(err)
      res.json(err);    
    res.json(data);

  })*/
  const promise = movie.save();
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json({err})
  })
  
});

router.get('/between/:start_year/:end_year',(req,res)=>{
  const promise = Movie.find({

    year:{
      '$gte':parseInt(req.params.start_year),'$lte':parseInt(req.params.end_year)
    }
  });
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json({status:0})
  })
})

module.exports = router;
