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
  

  return (
    <div className="units-container">
      <CardDeck> 
        {units.map( (unit, i) => 
          <Unit 
            key= {unit.id ? unit.id : i}
            data={unit} 
          />
        )}
      </CardDeck>
    </div>
  );
};

export default Home;
