import React from "react";
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

import "../styles/Unit.css";

import PropertyW200 from "../assets/property5-w200.jpg";
import PropertyW400 from "../assets/property5-w400.jpg";
import PropertyW800 from "../assets/property5-w800.jpg";

const Unit = ({data, clickUnit}) => {
    const pictures= [PropertyW200, PropertyW400, PropertyW800];
    return (
        <Card onClick={() => clickUnit(data.id)}>
            <Carousel>
                {pictures.map(picture => 
                    <Carousel.Item key={picture} >
                        <Card.Img variant="top" src={picture} />
                    </Carousel.Item>
                )}
            </Carousel>
            <Card.Body>
                <Card.Title className="bold-text">{`${data.name} - ${data.region}`}</Card.Title>
                <Card.Text className="truncate-description">{data.description}</Card.Text>
                <Card.Text>{data.cancellation}</Card.Text>
                <Card.Text className="bold-text">{`${data.price} BTC`}</Card.Text>
                {[1,2,3,4,5].map(n =>
                    <span
                        className={`fa fa-star ${n > data.rating ? "": "checked"}`}
                        key={`rating-${n}`}
                    />
                )}
            </Card.Body>
        </Card>
    )
}

Unit.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        region: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        cancellation: PropTypes.string,
        rating: PropTypes.number.isRequired,
        pictures: PropTypes.array
    }),
    clickUnit: PropTypes.func.isRequired
}

export default Unit;