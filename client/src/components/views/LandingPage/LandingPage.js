import { json } from 'body-parser';
import React , {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, IMAGE_BASE_URL} from "../../Config"; 
import { API_KEY} from "../../Config";
import MainImage from './Section/MainImage';
import MainMovieImage from './Section/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';


function LandingPage() {

    //useState를 이용해서 현재 필요한 정보들 가져온다. (괄호안은 기본값)
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [currentPage, setcurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetchMovies(endpoint)

    }, [])

    const fetchMovies =(endpoint)=>{
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...Movies, ...response.results]) //LoadMore버트 누르면 원래 있던 목록에 추가하기 위해서 ...Movies(기존목록), ...response.results(새로운목록)를 더해준다.
            setMainMovieImage(response.results[0])
            setcurrentPage(response.page)
        })

    }

    //다음페이지 만드는 함수 (load more)
    const loadMoreItems=() =>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`;
        fetchMovies(endpoint)

    }
    return (
        <div style={{ width:'100%', margin:'0'}}>

            {/* {Main Image} */}
        {MainMovieImage && //메인무비 이미지 가져온 다음에 실행하라는 의미(backdrop_path알기 위해서)
        <MainImage 
            images={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}
        
          />
        }
            <div style ={{ width: '85%', margin: '1rem auto'}}>
              <h2> Movies by latest </h2>
              <hr />
              {/* {Movie Grid Cards} */}
                 <Row gutter={[16, 16]}>  
                     
                {Movies && Movies.map((movie, index)=> (
                    <React.Fragment key={index}>
                        <GridCards  
                            image={movie.poster_path ? //posterpath가 있는 경우와 없는 경우를 나눠서 처리
                                `${IMAGE_BASE_URL}w500${movie.poster_path}`: null}
                                movieId={movie.id}//고유의 영화정보 입력을 위해 아이디 필요
                                movieName={movie.original_title}
                        
                        />

                    </React.Fragment>

                ))}
                    
                </Row>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
                <button onClick={loadMoreItems}> Load More </button>
          </div>
        </div>
    )
}

export default LandingPage
