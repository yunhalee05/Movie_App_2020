import React ,{useEffect, useState} from 'react'
import Axios from 'axios'
import {Button} from 'antd';

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        movieId:movieId,
        movieTitle: movieTitle,
        moviePost:  moviePost,
        movieRunTime:movieRunTime

    }
 
    useEffect(() => {
        //얼마나 많은 사람들이 favorite버튼을 눌렀는지 mongodb에서 가져와야 한다.(fetch써도 된다)
        //받을 내용

        //요청
        Axios.post('/api/favorite/favoriteNumber', variables) 
            .then(response =>{
                setFavoriteNumber(response.data.favoriteNumber)
                if(response.data.success){
                    

                }
                else{
                    alert('숫자 정보를 가져오는데 실패했습니다.')
                }
            })
        Axios.post('/api/favorite/favorited', variables) 
            .then(response =>{
                if(response.data.success){
                    setFavorited(response.data.favorited)
                }
                else{
                    alert('정보를 가져오는데 실패했습니다.')
                }
            })

    }, [])


    const onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber-1)
                    setFavorited(!Favorited)
                }else{
                    alert('Favorite list에서 지우는 것을 실패했습니다.')
                }
            })            
        } else{
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber +1)
                    setFavorited(!Favorited)
                }else{
                    alert('Favorite list에서 추가하는 것을 실패했습니다.')
                }
            })       
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{ Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
 