import React from 'react'
import {Col} from 'antd';

function GridCards(props) {

    if(props.landingPage){//이부분은 prop이 랜딩페이지일때 실행
        return (
        //넓이에 따라서 사진 갯수를 정한다.총 넓이를 24로 보고, 넓을 때는 한개당 6차지(4개), 중간은 8차지(3개), 제일 작을때는 하나만 보이도록 설정
        <Col lg={6} md={8} xs={24}>
            <div style={{position:'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{width:'100%', height:'320px'}} src= {props.image} alt={props.movieName}/>
                </a>
            </div>
        </Col>
    )
    }
    else{//이 부분은 prop이 액터나 다른 부분일 때 실행
        return (
        <Col lg={6} md={8} xs={24}>
        <div style={{position:'relative'}}>
                <img style={{width:'100%', height:'320px'}} src= {props.image} alt={props.characterName}/>
        </div>
    </Col>
    )}
}

export default GridCards
