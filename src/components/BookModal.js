import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import "../styles/BookModal.css";
import UnitsService from "../services/units.service";
import UnitConstants from "../constants/unit.constants";

import Unit from "./Unit";

const BookModal = ({id, handleCloseModal, handleBook}) => {
    const [data, setData] = useState(null);
    const [year, setYear] = useState(null);

    useEffect( () => {
        setData(null);
        if(id) {
            UnitsService.getUnit(id).then(
            (data) => {
                setData(data);
            }
            )
        }
    }, [id])

    return (
        <>
            <Modal show={!!id} onHide={handleCloseModal} animation={true}>
                <Modal.Body>
                {data && <Unit 
                        data={data}
                        mode={UnitConstants.BOOK_UNIT}
                        setYear={setYear}
                        year={year}
                    />
                }
                </Modal.Body>
                <Modal.Footer>
                {data ? <Button variant="primary" onClick={handleBook}>
                        Book
                    </Button>
                      : <span className="spinner-border spinner-border-lg"></span>
                }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BookModal;