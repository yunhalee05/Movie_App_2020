const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favoriteSchema = mongoose.Schema({
   userFrom: {
       type: Schema.Types.ObjectId,
       ref: 'User' //User하나만 가져오면 모든 정보를 가져올 수 있다. (User.js)
   },
   movieId: {
       type: String
   },
   movieTitle:{
       type: String
   },
   moviePost: {
       type:String
   },
   movieRunTime:{
       type:String
   }
},{timestamps:true})//생성된 시간 자동처리



const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }