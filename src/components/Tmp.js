import { useEffect, useState } from "react";
import { useContext } from 'react'
import slotContext from '../context/slots/slotContext'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './list.css'
import Dropdown from "./Dropdown";
import Description from "./Description";
import Calendar from "./Calendar";
import Delete from "./Delete";
import CreateSlot from "./CreateSlot";
import Logout from "./Logout";
import Priority from "./Priority";
import Title from "./Title";
// import Table from "./Table";


const Slots = () => {
  const context = useContext(slotContext)
  const { delall, addall,slots } = context;
  const DATA = slots
  useEffect(() => {
    DATA.map((item) => {
      return (item["dropstatus"] = <Dropdown a="Not Started" b="Working on it" c="Completed" status={item.status} id={item._id} />,
        item["descrip"] = <Description id={item._id} data={item.description} />,
        item["calendar"] = <Calendar date={item.dewdate.$date} />,
        item["del"] = <Delete id={item._id} />,
        item["prior"] = <Priority id={item._id} a={1} b={2} c={3} status={item.priority}/>,
        item["titlefunc"] = <Title title={item.title} identity={item._id}/>)
    })
  },[])
  console.log(slots)
  const [stores, setStores] = useState(slots);
  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const reorderedStores = [...stores];

      console.log(reorderedStores)
      const storeSourceIndex = source.index;
      const storeDestinationIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinationIndex, 0, removedStore);
      delall()
      addall(reorderedStores)
      return setStores(reorderedStores);
    }
  }

  return (
    <div className="layout__wrappers my-2">
      {/* <Table/> */}
      <div className="cards mx-3 my-2">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className="d-flex justify-content-between">
            <h1> </h1>
            <div className="header my-2"><h1>TASKS</h1></div>
            <div align="right" className="mx-2 my-3"><Logout /></div>
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
                        <ul className="list-group list-group-horizontal">
                          <li className="list-group-item">{index}</li>
                          <li className="list-group-item">{store.title}</li>
                          <li className="list-group-item">{store.dropstatus}</li>
                          <li className="list-group-item">{store.prior}</li>
                          <li className="list-group-item">{store.descrip}</li>
                          <li className="list-group-item">{store.calendar}</li>
                          <li className="list-group-item">{store.del}</li>
                          <li className="list-group-item">{store.titlefunc}</li>
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
