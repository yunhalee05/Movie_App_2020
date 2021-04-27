import React from 'react';
import {useEffect, useState} from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL} from "../../Config";
import MainImage from "../LandingPage/Section/MainImage"
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import {Row} from 'antd';
import Favorite from "./Sections/Favorite";

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])//이름은 Movie로 하고 array에 넣어준다.
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response) //response를 Movie에 넣어준다.
            })
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('responseForCrew',response)
                setCasts(response.cast)//배우 정보만 가져오자.
            })
    }, [])

    const toggleActorView = () =>{
        setActorToggle(!ActorToggle)// 토글 버튼 활성화 시키기 
    }


    return (
        <div>
            {/* Header */}
        <MainImage     //랜딩페이지에서의 메인이미지 특징과 동일하게 준다. (State이름만 Movie로 바꿔준다.)
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />




            {/* Body */}
            <div style={{width:'85%', margin:'1rem auto'}}>



                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite   movieInfo= {Movie} movieId = {movieId} userFrom={localStorage.getItem('userId')}/>
                </div>




                {/* Movie Info */}

        <MovieInfo 
            movie = {Movie}

        />
                <br/>

                {/* Actors Grid */}

                <div style = {{ display:'flex', justifyContent:'center', margie:'2rem'}}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                    
                </div>

            {ActorToggle &&   //actorToggle이 true 일때만 이 부분을 보여주자. 

                <Row gutter={[16, 16]}>  
                        
                {Casts && Casts.map((cast, index)=> (
                    <React.Fragment key={index}>
                        <GridCards  
                            image={cast.profile_path ?  //posterpath가 있는 경우와 없는 경우를 나눠서 처리
                                `${IMAGE_BASE_URL}w500${cast.profile_path}`: null}
                            characterName ={cast.name}
                        
                        />

                    </React.Fragment>

                ))}
                    
                </Row>
            
            }

                


            </div>
        </div>
    )
}

export default MovieDetail
