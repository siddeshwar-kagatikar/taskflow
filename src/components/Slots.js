import { useEffect, useState } from "react";
import { useContext } from 'react'
import slotContext from '../context/slots/slotContext'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './list.css'
import './login.css'
import Dropdown from "./Dropdown";
import Description from "./Description";
import Calendar from "./Calendar";
import Delete from "./Delete";
import CreateSlot from "./CreateSlot";
import Priority from "./Priority";
import Title from "./Title";
import Daysleft from "./Daysleft";
import Showtitle from "./Showtitle";


const Slots = () => {
  const [controllfetch,setcontrollfetch] = useState(true)
  const context = useContext(slotContext)
  const { delall, addall,slots,fetchalldata } = context;
  useEffect(() => {
   fetchalldata()
    // eslint-disable-next-line 
  },[controllfetch,<Dropdown/>,<Title/>,<Showtitle/>,<Description/>,<Calendar/>,<Delete/>])
 
  const [stores, setStores] = useState(slots);
  if(stores!==slots){setStores(slots)}
  // console.log("stores: ",stores)
  const handleDragAndDrop = (results) => {
    
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      setcontrollfetch(false)
      const reorderedStores = [...stores];

      // console.log(reorderedStores)
      const storeSourceIndex = source.index;
      const storeDestinationIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinationIndex, 0, removedStore);
      delall()
      addall(reorderedStores)
      setcontrollfetch(!controllfetch)
      return setStores(reorderedStores);
    }
  }

  return (
    <div className="layout__wrappers my-2">
      <div className="cards mx-3 my-2">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className="d-flex justify-content-between">
            <h1> </h1>
            <div className="header my-2"><h1>TASKS</h1></div>
            <div align="right" className="mx-2 my-3"></div>
          </div>
          <div className="add my-3 mx-2">
            <CreateSlot />
          </div>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {stores.map((store, index) => (
                  <Draggable
                    draggableId={store._id}
                    index={index}
                    key={store._id}
                  >
                    {(provided) => (
                      <div className="slot mt-1"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div className="label"><Daysleft date={store.dewdate}/></div>
                        <ul className="list-group list-group-horizontal">
                          <li className="list-group-item my-1" style={{width:'4%'}}>{index}</li>
                          <li className="list-group-item my-1" style={{width:'10%'}}><Showtitle title={store.title}/></li>
                          <li className="list-group-item my-1" style={{width:'13%'}}><Dropdown a="Not Started" b="Working on it" c="Completed" status={store.status} id={store._id} /></li>
                          <li className="list-group-item my-1" style={{width:'8%'}}><Priority id={store._id} a={1} b={2} c={3} status={store.priority}/></li>
                          <li className="list-group-item my-1" style={{width:'10%'}}><Description id={store._id} data={store.description} /></li>
                          <li className="list-group-item my-1" style={{width:'14%'}}><Calendar date={store.dewdate} id={store._id} /></li>
                          <li className="list-group-item my-1"><Delete id={store._id} /></li>
                          <li className="list-group-item my-1"><Title title={store.title} id={store._id} description={store.description}/></li>
                        </ul>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default Slots;
