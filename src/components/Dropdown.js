import { useState, useContext } from "react";
import slotContext from '../context/slots/slotContext'

export default function Dropdown(props) {
    const context = useContext(slotContext)
    const { updatestatus } = context;
    const [name, setName] = useState(props.status)
    const setcolor = (name) => {
        if (name === "Completed") {
            return "success"
        } else if (name === "Working on it") {
            return "warning"
        } else if (name === "Not Started") {
            return "danger"
        } else {
            return "secondary"
        }
    }

    const handleClick1 = (e) => {
        setName(props.a)
        updatestatus(props.id,props.a )
        console.log(name)
    }
    const handleClick2 = (e) => {
        setName(props.b)
        updatestatus(props.id, props.b)
        console.log(name)
    }

    const handleClick3 = (e) => {
        setName(props.c)
        updatestatus(props.id,props.c)
        console.log(name)
    }


    return (
        <div>
            <div className="dropdown">
                <button className={`btn btn-${setcolor(name)} dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {name}
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" type="button" onClick={handleClick1}>{props.a}</button></li>
                    <li><button className="dropdown-item" type="button" onClick={handleClick2}>{props.b}</button></li>
                    <li><button className="dropdown-item" type="button" onClick={handleClick3}>{props.c}</button></li>
                </ul>
            </div>
        </div>
    )
}
