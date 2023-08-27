import React,{useState} from 'react'
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button"

export default function Canvas(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

  return (
    <div>
     <Button variant="primary" onClick={handleShow}>
        Description
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Description</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {props.data}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

