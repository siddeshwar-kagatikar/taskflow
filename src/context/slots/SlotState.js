// import { useState } from 'react';
import { useState } from 'react';
import SlotContext from './slotContext';

const SlotState = (props) => {
  const host = `http://localhost:5000`
  const slotsInitial = [
]
  const [slots, setSlots] = useState(slotsInitial)

  // fetchallnotes
  const fetchalldata = async () => {
    const response = await fetch(`${host}/api/slots/fetchalldata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      }
    });
    // console.log('down')
    const json = await response.json();
    setSlots(json);
  }

//   // addnote
  const createslot = async (title,dewdate,priority,status,description) => {
    const response = await fetch(`${host}/api/slots/createslot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      },
      body: JSON.stringify({title,dewdate, priority,status,description})
    });


   const slot = await response.json();
    setSlots(slots.concat(slot));
  }

  // updatedescription
  const updatedescription = async (id,description) => {
    // API call
    const response = await fetch(`${host}/api/slots/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      },
      body: JSON.stringify({ description })
    });
    // eslint-disable-next-line
    const json = await response.json();
    let newSlot = JSON.parse(JSON.stringify(slots))
    // Function
    for (let i = 0; i < slots.length; i++) {
      let element = newSlot[i]
      if (element._id === id) {
        if(description){newSlot[i].description = description;}
        break;
      }
    }
    // console.log(newSlot)
    setSlots(newSlot);
  }

  //updatestatus
  const updatestatus = async (id,status) => {
    // API call
    const response = await fetch(`${host}/api/slots/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      },
      body: JSON.stringify({ status })
    });
    // eslint-disable-next-line
    const json = await response.json();
    let newSlot = JSON.parse(JSON.stringify(slots))
    // Function
    for (let i = 0; i < slots.length; i++) {
      let element = newSlot[i]
      if (element._id === id) {
        if(status){newSlot[i].status = status;}
        break;
      }
    }
    // console.log(newSlot)
    setSlots(newSlot);
  }

  // delete
  const delslot = async(id) => {
    // API call
    const response = await fetch(`${host}/api/slots/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      },
      // body: JSON.stringify()
    });
    // eslint-disable-next-line
    const json = await response.json();
    // function
    // console.log(id)
    const newSlots = slots.filter((note)=>{return note._id!==id});
    // console.log(newSlots)
    setSlots(newSlots)
  }

  // delete all
  const delall = async() => {
    // API call
    const response = await fetch(`${host}/api/slots/delall`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      },
      // body: JSON.stringify()
    });
    // eslint-disable-next-line
    const json = await response.json();
    // function
    setSlots([])
  }

  // add all
  const addall = async (data) => {
    const response = await fetch(`${host}/api/slots/postall`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });
    setSlots(data);
  }

  // update priority
  const updatepriority = async (id,priority) => {
    // API call
    const response = await fetch(`${host}/api/slots/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      },
      body: JSON.stringify({ priority })
    });
    // eslint-disable-next-line
    const json = await response.json();
    // console.log(json)
    let newSlot = JSON.parse(JSON.stringify(slots))
    // Function
    for (let i = 0; i < slots.length; i++) {
      let element = newSlot[i]
      if (element._id === id) {
        if(priority){newSlot[i].priority = priority;}
        break;
      }
    }
    // console.log(newSlot)
    setSlots(newSlot);
  }

  // update title
  const updatetitle = async (id,title) => {
    // API call
    const response = await fetch(`${host}/api/slots/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      },
      body: JSON.stringify({ title })
    });
    // eslint-disable-next-line
    const json = await response.json();
    // console.log(json)
    let newSlot = JSON.parse(JSON.stringify(slots))
    // Function
    for (let i = 0; i < slots.length; i++) {
      let element = newSlot[i]
      if (element._id === id) {
        if(title){newSlot[i].title = title;}
        break;
      }
    }
    // console.log(newSlot)
    setSlots(newSlot);
  }

  //update date
  const updatedate = async (id,dewdate) => {
    // API call
    const response = await fetch(`${host}/api/slots/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      },
      body: JSON.stringify({ dewdate })
    });
    // eslint-disable-next-line
    const json = await response.json();
    // console.log(json)
    let newSlot = JSON.parse(JSON.stringify(slots))
    // Function
    for (let i = 0; i < slots.length; i++) {
      let element = newSlot[i]
      if (element._id === id) {
        if(dewdate){newSlot[i].dewdate = dewdate;}
        break;
      }
    }
    // console.log(newSlot)
    setSlots(newSlot);
  }

  // sort
  const sort = async (data) => {
    // API call
    const response = await fetch(`${host}/api/slots/sort`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "autoken": localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });
    // eslint-disable-next-line
    const json = await response.json();
    // console.log(json)
    let newSlot = json
    console.log(newSlot)
    setSlots(newSlot);
  }

  return (
    // eslint-disable-next-line 
    <SlotContext.Provider value={{ slots,fetchalldata,createslot, delslot,updatedescription,updatestatus,updatepriority,delall,addall,updatetitle,sort,updatedate }}>
      {props.children}
    </SlotContext.Provider>
  )
}

export default SlotState;