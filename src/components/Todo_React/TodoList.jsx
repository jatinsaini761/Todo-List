import React, { useState, useEffect } from 'react';
import './style.css';

const getLocalStorage = () => {
  const list = localStorage.getItem("MyList")
  if (list)
    return JSON.parse(list); // parse matlab javascript object ma convert karna parse javascript function ha 
  else
    return [];
} 

function TodoList() {
  const [inputdata, setinputdata] = useState("");
  const [items, setitems] = useState(getLocalStorage());
  const [edititem, setedititem] = useState("");
  const [changeButton, setchangeButton] = useState(false);

  // To add the items
  const showitems = () => {
    if (!inputdata) {
      alert("Please Fill The Data");
    }
    else if (changeButton && inputdata) {
      setitems(items.map((curElement) => {
        if (curElement.id === edititem)
          return { ...curElement, name: inputdata };
        return curElement;
      }));
      setinputdata("");
      setedititem("");
      setchangeButton(false);
    }
    else {
      const Newinputdata = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setitems([...items, Newinputdata]);
      setinputdata("");
    }
  }

  //To edit the items
  const edit_Item = (index) => {
    const item = items.find((curElement) => {
      return curElement.id === index;
    })
    setinputdata(item.name);
    setedititem(index);
    setchangeButton(true);
  }

  // to Delete the items
  const delete_item = (index) => {
    const updated_item = items.filter((curElement) => {
      return curElement.id !== index;
    })
    setitems(updated_item);
  }

  // To Delete All items
  const deleteAll_item = () => {
    setitems([]);
  }

  //Adding to the local Storage
  useEffect(() => {
    localStorage.setItem("MyList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="div_class">
        <div className="div_child_class">
          <figure>
            <img src="./images/Todo_logo.png" alt="todoLogo" className="img_class" />
            <figcaption>Add Your List Here 👌</figcaption>
          </figure>
        </div>
        <div className="Add_items">
          <input type="text" placeholder="  📝 Add Item.." value={inputdata} onChange={(event) => setinputdata(event.target.value)} />
          {
            changeButton ? (<i className="fa fa-edit add-btn" onClick={showitems}></i>) : (<i className="fa fa-plus add-btn"  onClick={showitems}></i>)
          }
        </div>

        {/* map method sa har item par ja rha ha */}
        <div className="showItem">
          {
            items.map((curElement) => {
              return (
                <div className="eachItem" key={curElement.id}>
                  <h3>{curElement.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => { edit_Item(curElement.id) }}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => { delete_item(curElement.id) }}></i>
                  </div>
                </div>
              );
            })
          }
        </div>


        {/* Remove the items */}
        <div className="button_item">
          <button className="button_item_child" onClick={deleteAll_item}><span>CHECK LIST</span></button>
        </div>
      </div>
    </>
  );
}

export default TodoList;

