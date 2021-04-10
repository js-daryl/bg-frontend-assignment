import React, {useContext, useState} from "react";
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

import "../styles/Unit.css";
import UnitContext from "../contexts/unit.context.";
import UnitConstants from "../constants/unit.constants";

import PropertyW200 from "../assets/property5-w200.jpg";
import PropertyW400 from "../assets/property5-w400.jpg";
import PropertyW800 from "../assets/property5-w800.jpg";

const Title = () => {
    const {data, mode} = useContext(UnitContext);
    return (
        <>
            {mode === UnitConstants.LIST_UNIT &&  <Card.Text className={`bold-text title ${data.isBooked ? "booked" : ""}`}>
                {`${data.name} - ${data.region}`}
            </Card.Text>}

            {mode === UnitConstants.BOOK_UNIT && <Card.Text className="bold-text title">
                <span>{`${data.name} - ${data.region}`}</span>
                <span>{`${data.price} BTC`}</span>
            </Card.Text>}
        </>
    )
}
const Description = () => {
    const {data, mode} = useContext(UnitContext);
    return (
        <>
            {mode === UnitConstants.LIST_UNIT && <Card.Text className={"description truncated"}>
                {data.description}
            </Card.Text>}

            {mode === UnitConstants.BOOK_UNIT && <Card.Text className={"description"}
                dangerouslySetInnerHTML={ {__html: data.description} } 
            />}
        </>
    )
}
const Cancellation = () => {
    const {data, mode} = useContext(UnitContext);   
    return <Card.Text>{data.cancellation}</Card.Text>
}
const Price = () => {
    const {data, mode} = useContext(UnitContext);
    return <Card.Text className="bold-text">
        {`${data.price} BTC`}
    </Card.Text>
}
const Rating = () => {
    const {data, mode} = useContext(UnitContext);
    return <Card.Text>
        {[...Array(5)].map((n, i) =>
            <span
                className={`fa fa-star ${i + 1 > data.rating ? "": "checked"}`}
                key={`rating-${i}`}
            />
        )}
    </Card.Text>
}
const Amenities = () => {
    const {data, mode} = useContext(UnitContext);
    const amenitiesReducer = (accumulator, currentValue) => accumulator + ', ' + currentValue;
    return <Card.Text className="amenities">
        {data.amenities ? data.amenities.reduce(amenitiesReducer) : ""}
    </Card.Text>
}
const Availability = ({availability, setAvailability}) => {
    const baseYear = 2080;
    const {data, mode} = useContext(UnitContext);
    const arrayOfYears = data.availability ? data.availability : [];

    return <Card.Text className="availability">
        {[...Array(8)].map((n, i) =>
            <button
                disabled = {arrayOfYears.includes(baseYear + (i + 1))}
                key={`availability-${i}`}
                onClick={() => setAvailability(baseYear + (i + 1))}
                className={baseYear + (i + 1) === availability ? "selected" : ""}
            >
                {baseYear + (i + 1)}
            </button>
        )}
    </Card.Text>
}
const Unit = ({data, mode, clickUnit, availability, setAvailability}) => {
    const pictures= [PropertyW200, PropertyW400, PropertyW800];    
    const unitLayout = {
        [UnitConstants.BOOK_UNIT] : [
            {child: Title},
            {child: Rating},
            {child: Description},
            {child: Amenities},
            {child: Availability, childProps: {availability, setAvailability}},
        ],
        [UnitConstants.LIST_UNIT] : [
            {child: Title},
            {child: Description},
            {child: Cancellation},
            {child: Price},
            {child: Rating},
        ],
    }
    return (
        <UnitContext.Provider value={{data, mode}}>
            <Card onClick={() => clickUnit(data.id)} className={mode}>
                <Carousel>
                    {pictures.map(picture => 
                        <Carousel.Item key={picture} >
                            <Card.Img variant="top" src={picture} />
                        </Carousel.Item>
                    )}
                </Carousel>
                <Card.Body>
                    {unitLayout[mode].map(sub => {
                        const Sub = sub.child;
                        const childProps = sub.childProps ? {...sub.childProps} : null;
                        return <Sub key={sub.child} {...childProps} />
                    })}
                </Card.Body>
            </Card>
        </UnitContext.Provider>
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
        pictures: PropTypes.array,
        amenities: PropTypes.array,
        availability: PropTypes.array,
        isBooked: PropTypes.bool,
    }),
    clickUnit: PropTypes.func,
    mode: PropTypes.string.isRequired,

}
Unit.defaultProps = {
    clickUnit: () => void(0),
}

Availability.propTypes = {
    setAvailability: PropTypes.func.isRequired,
}
export default Unit;