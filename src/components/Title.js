import React from 'react'
import Modal from './Modal';


export default function Title(props) {
  return (
    <div className='my-3'>
     <Modal id={props.id} title={props.title} description={props.description}/>
    </div>
  )
}
