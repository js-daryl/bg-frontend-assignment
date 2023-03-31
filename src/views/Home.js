import React, { useState, useEffect } from "react";
import CardDeck from 'react-bootstrap/CardDeck'

import "../styles/Home.css"
import UnitsService from "../services/units.service";
import Unit from "../components/Unit";
const Home = () => {
  const [units, setUnits] = useState([]);
  const [page, setPage] = useState(1);

  useEffect( () => {
    UnitsService.listUnits().then(
      (data) => {
        setUnits(data);
      }
    )
  }, [])
  
  const clickUnit = id => {

  }

  return (
    <>
      <div className="row">
          {units.map( (unit, i) =>
            <div className="col-md-4 col-xs-6" key= {unit.id ? unit.id : i}>
              <Unit 
                data={unit}
                clickUnit={clickUnit}
              />
            </div>
          )}
      </div>
    </>
  );
};

export default Home;
