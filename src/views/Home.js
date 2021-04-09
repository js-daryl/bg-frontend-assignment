import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import "../styles/Home.css"
import BookModal from "../components/BookModal";
import UnitsService from "../services/units.service";
import UnitConstants from "../constants/unit.constants";
import Unit from "../components/Unit";

const Home = () => {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [page, setPage] = useState(1);

  useEffect( () => {
    UnitsService.listUnits().then(
      (data) => {
        setUnits(data);
      }
    )
  }, [])
  
  const clickUnit = id => {
    setSelectedUnit(id);
  }
  const handleBook = id => {
    
  }
  const handleCloseModal = () => {
    setSelectedUnit("");
  }
  return (
    <>
      <div className="row">
          {units.map( (unit, i) =>
            <div className="col-lg-3 col-md-6" key= {unit.id ? unit.id : i}>
              <Unit 
                data={unit}
                clickUnit={clickUnit}
                mode={UnitConstants.LIST_UNIT}
              />
            </div>
          )}
      </div>
      <BookModal
        id={selectedUnit}
        handleCloseModal={handleCloseModal}
        handleBook={handleBook}
      />
    </>
  );
};

export default Home;
