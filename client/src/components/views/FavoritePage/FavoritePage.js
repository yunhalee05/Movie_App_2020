import Axios from 'axios';
import React,{useEffect, useState} from 'react'
import './favorite.css';
import {Popover} from 'antd';
import {IMAGE_BASE_URL} from '../../Config'

function FavoritePage() {
    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoritedMovie()

    }, [])

    const fetchFavoritedMovie = ()=>{
        Axios.post('api/favorite/getFavoritedMovie',{userFrom:localStorage.getItem('userId')})//내가 누구인지를 백엔드에 같이 보내줘서 정보 가져오도록 한다. 
        .then(response =>{
            if(response.data.success){
                setFavorites(response.data.favorites)
            }else{
                alert('영화 정보를 가져오는데 실패했습니다. ')
            }
        })

    }

    const onClickDelete = (movieId, userFrom) =>{

        const variables = {
            movieId, 
            userFrom
        }

        Axios.post('/api/favorite/removeFroemFavorite', variables)
        .then(response=>{
            if(response.data.success){
                fetchFavoritedMovie()
            } else{
                alert('리스트에서 지우는데 실패했습니다.')
            }
        })

    }

    const renderCards = Favorites.map((favorite,index)=>{
        
        //이미지가 있을 때는 마우스 가져다 대면 사진이 뜨도록 해보자. 
         const content = (
            <div>
                
                {favorite.moviePost ?
                <img src = {`${IMAGE_BASE_URL}w500${favorite.movie.Post}`}/> : "no image"}
                
            </div>
         )
        return <tr key = {index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
            <td>{favorite.movieTitle}</td>
            <td>{favorite.movieRunTime}</td>
            <td><button onClick={()=>onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
            </Popover>

        </tr>


    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr> 
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
                    
                    
                    
                    
                    
        </div>
    )
}

export default FavoritePage
