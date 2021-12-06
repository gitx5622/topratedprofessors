import React, {useEffect} from 'react';
import {Carousel, Grid, Row, Col, Panel, Rate, Avatar} from "rsuite";
import {useDispatch, useSelector} from "react-redux";
import {filterRatings} from "../dataStore/actions/reviewAction";

const Reviews = () => {
    const reviewSelector = useSelector(state => state.ratingState);
    const { ratings } = reviewSelector;
    const dispatch = useDispatch();
    console.log(ratings);

    useEffect(() => {
        filterRatings(dispatch);
    }, [dispatch])
    return (
        <div>
            <center>
            <h3>Customer Reviews</h3>
            <p style={{fontSize:"20px"}}>Avg rating for all reviews: 4.8/5.0</p>
            </center>
            <Grid fluid>
                <Carousel autoplay className="custom-slider" style={{height:"350px"}}>
                <Row>
                            {ratings.ratings && ratings.ratings.slice(0,3).map((rating) => (
                                <div key={rating.id} style={{marginLeft:"20px"}}>
                                <Col xs={8}>
                                    <center>
                                        <Panel style={{background:"whitesmoke", margin:"20px"}}>
                                            <div style={{display:"flex", justifyContent:"center", gap:"2em"}}>
                                                <span><Avatar circle>RS</Avatar></span>
                                                <span style={{fontSize:"20px"}}>Username: {rating.user && rating.user.username}</span>
                                            </div>
                                            <h4>Order: {rating.order_number}</h4>
                                                <br/>
                                            <Rate value={rating.value} />
                                        <div style={{padding:"20px"}}>
                                            <p style={{fontSize:"20px"}}>{rating.description}</p>
                                            <p style={{fontSize:"18px"}}>{rating.created_at}</p>
                                        </div>
                                        </Panel>
                                    </center>
                                </Col>
                                </div>
                            ))}
                </Row>
                    <Row>
                        {ratings.ratings && ratings.ratings.slice(0,3).map((rating) => (
                            <div key={rating.id} style={{marginLeft:"20px"}}>
                                <Col xs={8}>
                                    <center>
                                        <Panel style={{background:"whitesmoke", margin:"20px"}}>
                                            <div style={{display:"flex", justifyContent:"center", gap:"2em"}}>
                                                <span><Avatar circle>RS</Avatar></span>
                                                <span style={{fontSize:"20px"}}>Username: {rating.user && rating.user.username}</span>
                                            </div>
                                            <h4>Order: {rating.order_number}</h4>
                                            <br/>
                                            <Rate value={rating.value} />
                                            <div style={{padding:"20px"}}>
                                                <p style={{fontSize:"20px"}}>{rating.description}</p>
                                                <p style={{fontSize:"18px"}}>{rating.created_at}</p>
                                            </div>
                                        </Panel>
                                    </center>
                                </Col>
                            </div>
                        ))}
                    </Row>
                    <Row>
                        {ratings.ratings && ratings.ratings.slice(0,3).map((rating) => (
                            <div key={rating.id} style={{marginLeft:"20px"}}>
                                <Col xs={8}>
                                    <center>
                                        <Panel style={{background:"whitesmoke", margin:"20px"}}>
                                            <div style={{display:"flex", justifyContent:"center", gap:"2em"}}>
                                                <span><Avatar circle>RS</Avatar></span>
                                                <span style={{fontSize:"20px"}}>Username: {rating.user && rating.user.username}</span>
                                            </div>
                                            <h4>Order: {rating.order_number}</h4>
                                            <br/>
                                            <Rate value={rating.value} />
                                            <div style={{padding:"20px"}}>
                                                <p style={{fontSize:"20px"}}>{rating.description}</p>
                                                <p style={{fontSize:"18px"}}>{rating.created_at}</p>
                                            </div>
                                        </Panel>
                                    </center>
                                </Col>
                            </div>
                        ))}
                    </Row>
                </Carousel>
            </Grid>
        </div>
    );
};

export default Reviews;