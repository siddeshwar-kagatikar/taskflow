import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import slotContext from '../context/slots/slotContext'
import Offcanvas from "react-bootstrap/Offcanvas";

export default function Modal(props) {
    const context = useContext(slotContext)
    const { updatetitle, updatedescription } = context;

    const [note, setNote] = useState({ title: props.title, description: props.description })

    const handleClick = (e) => {
        // e.preventDefault();
        console.log(props.id)
        updatetitle(props.id, note.title)
        updatedescription(props.id, note.description)
    }
    const onChange = (e) => {
        console.log(props.id)
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <i className="fa-solid fa-pen-to-square mx-2" data-bs-target="#exampleModal" onClick={handleShow}></i>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Description</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label" style={{color:'hsl(215, 10%, 12%)'}}>Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label" style={{color:'hsl(215, 10%, 12%)'}}>Description</label>
                            <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )
}
