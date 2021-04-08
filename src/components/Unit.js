import React from "react";
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'

import "../styles/Unit.css";

import PropertyW200 from "../assets/property5-w200.jpg";
import PropertyW400 from "../assets/property5-w200.jpg";
import PropertyW800 from "../assets/property5-w200.jpg";

const Unit = ({data}) => {
    return (
        <Card>
            <Card.Img variant="top" src={PropertyW200} />
            <Card.Body>
                <Card.Title>data.name</Card.Title>
                <Card.Text className="truncate-description">
                    {data.description}
                </Card.Text>
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
    })
}

export default Unit;