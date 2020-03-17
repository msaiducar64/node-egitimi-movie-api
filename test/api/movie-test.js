const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should()

const server = require('../../app');

chai.use(chaiHttp);
let token,movie_id;

describe('/api/movies test',()=>{
    before((done)=>{        
        chai.request(server)
        .post('/authenticate')
        .send({username:'msaiducar64',password:'1907'})
        .end((err,res)=>{
            token = res.body.token;
            
            done()
        })

    })
    describe('/GET movies',()=>{
        it('it should GET all the movies',(done)=>{
            chai.request(server)
            .get('/api/movies')
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array')
                done()
            })
        })
    })
    describe('/POST movie',()=>{
        it('it should POST a movie',(done)=>{
            const movie ={
                title : 'Udemy',
                director_id : '5e6ca2a63c7a24032a6e4eba',
                country : 'Turkey',
                category: 'Comedy',
                year:1950,
                imdb_score : 8

            }
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('country');
                res.body.should.have.property('category');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                movie_id= res.body._id
                done();
            })

        })
    })
    describe('/GET movie_id',()=>{
        it('it should GET a movie',(done)=>{            
            chai.request(server)
            .get('/api/movies/'+movie_id)            
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.be.a('array');
                res.body[0].should.have.property('title');
                //res.body[0].should.have.property('director_id');
                res.body[0].should.have.property('country');
                res.body[0].should.have.property('category');
                res.body[0].should.have.property('year');
                res.body[0].should.have.property('imdb_score');
                done();
            })

        })
    })
})

