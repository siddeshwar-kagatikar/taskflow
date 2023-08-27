import { useState, useContext } from "react";
import slotContext from '../context/slots/slotContext'

export default function Priority(props) {
    const context = useContext(slotContext)
    const {updatepriority} = context
    const [name, setName] = useState(props.status)
    const handleClick1 = (e) => {
        setName(props.a)
        updatepriority(props.id, props.a)
    }
    const handleClick2 = (e) => {
        setName(props.b)
        updatepriority(props.id,props.b)
    }

    const handleClick3 = (e) => {
        setName(props.c)
        updatepriority(props.id, props.c)
    }
    return (
        <div>
            <div className="dropdown"> 
                <button className={`btn btn-secondary dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {name}
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" type="button" onClick={handleClick1}>{props.a}</button></li>
                    <li><button className="dropdown-item" type="button" onClick={handleClick2}>{props.b}</button></li>
                    <li><button className="dropdown-item" type="button" onClick={handleClick3}>{props.c}</button></li>
                </ul>
                Priority
            </div>
        </div>
    )
}
