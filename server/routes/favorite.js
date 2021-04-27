const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

//index.js 에 써놓으면 앞부분은 지울 수 있다(/api/favorite/favoriteNumber')
//몇명이 좋아하는지 숫자 가져오기
router.post('/favoriteNumber',  (req, res) =>{
    //index.js에 bodyparser가 있기 때문에 프론트에서 보낸 movieId를 받을 수 있다. 


    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId":req.body.movieId})
    //에러가 나면 err표시하고 아니면 info 에 넣는다. 
    .exec(( err, info)=>{ 
        if(err) return res.status(400).send(err)
        //그 다음에 프론트에 다시 숫자정보를 보내주기
        res.status(200).json({success:true, favoriteNumber:info.length})
    })

})

//내가 좋아했던것 정보 가져오기 
router.post('/favorited',  (req, res) =>{
    //index.js에 bodyparser가 있기 때문에 프론트에서 보낸 movieId를 받을 수 있다. 

    //내가 이 영화를 favorite 리스트에 넣었는지 정보를 db에서 가져오기 
    Favorite.find({"movieId":req.body.movieId, "userFrom":req.body.userFrom})
    //에러가 나면 err표시하고 아니면 info 에 넣는다. 
    .exec(( err, info)=>{ 
        if(err) return res.status(400).send(err)

        //그 다음에 프론트에 다시 숫자정보를 보내주기
        let result = false; //정보가 있다면 true로 바꿔서 결과 보내주자.
        if(info.length !== 0){
            result = true
        }
        res.status(200).json({success:true, favorited:result})
    })

})


//리스트에서 지우기 
router.post('/removeFromFavorite',  (req, res) =>{

    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})//이조건에 맞는 것을 지워달라
        .exec((err,doc)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, doc})//보내준 정보 doc는 프론트에 보내준다.
        })
})


//좋아하는 리스트에 추가
router.post('/addToFavorite',  (req, res) =>{
    
    //객체를 담고 저장(모델 favorite를 이용해서 다큐먼트 인스턴스 생성)(클라이언트에서 가져온 정보 담는다)
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) =>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true})
    })
})


//좋아하는 영화정보 가져오기 
router.post('/getFavoritedMovie',  (req, res) =>{
    

    Favorite.find({'userFrom':req.body.userFrom})
        .exec((err, favorites)=>{
            if(err)return res.status(400).send(err)
            return res.status(200).json({success:true, favorites})//좋아하는 영화들의 형식이 배열 형태로 있을 것이다. 
        })

    
})


//favorite list에서 제거한다. 
router.post('/removeFromFavorite',  (req, res) =>{
    

    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, result)=>{
        if(err)return res.status(400).send(err)
        return res.status(200).json({success:true})

    })
    
})




module.exports = router;
