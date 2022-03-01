import './App.css';
import { Button, Collapse, Image, ListGroup } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import ResForm from './RestaurantForm'
import { AiOutlineDelete, AiFillEdit,AiOutlineClose } from "react-icons/ai";
import axios from 'axios'


function App() {

  const [openAddForm, setOpenAddForm] = useState(false);
  const [openSurpriseBtn, setOpenSurpriseBtn] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [randomRes, setRandomRes] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState();
  const [deleteRes, setDeleteRes] =useState(true);
  const [restList, setRestList] = useState([{}]);
  
  const url = "https://localhost:7246/api/RestaurantListContoller"

  useEffect(() => {
    axios.get("https://localhost:7246/api/RestaurantListContoller")
      .then((response) => {
        setRestList(response.data)
      });
    setDeleteRes(false)
  }, [openAddForm, deleteRes, editMode]);

  function addRestaurant() {
    console.log("clicked")
  }

  function deleteRestaurant(id) {
    axios.delete(`${url}/${id}`)
      .then(response => {
        console.log("restaurant deleted")
      })
      .catch(error => {
        console.log(error);
      })
      setDeleteRes(true)
  }

  function randomRestaurant() {
    setRandomRes(restList[Math.floor(Math.random() * restList.length)])
  }
  
  function closeSurpriseme(){
    setOpenSurpriseBtn(false)
  }

  return (
    <div className="App">
      <Image src="https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/1608506169128-S6KYNEV61LEP5MS1UIH4/traditional-food-around-the-world-Travlinmad.jpg"
        className="headerImage"
        alt=" " />

      <h1 className="header1">
        FoodTracker
      </h1>

      <div className="buttonContainer">
        <div>
          <Button
            onClick={() => { setOpenSurpriseBtn(!openSurpriseBtn); randomRestaurant() }}
            aria-controls="randomRest"
            aria-expanded={openSurpriseBtn}
            className='btn btn-secondary'
            style={{ marginRight: 10 }}
          >
            Surprise me!
          </Button>
          <div>
            <Collapse in={openSurpriseBtn}>
              <div id="randomRest" style={{ paddingTop: 10, borderRadius: 15 }}>
                <ListGroup.Item style={{ height: 70, backgroundColor: "#bcbcbc" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ paddingLeft: 10, borderRadius: 15 }}>
                      <h1 style={{ fontSize: 20, fontWeight: "bold" }}>
                        {randomRes.name}
                      </h1>
                      <h1 style={{ fontSize: 15 }}>
                        {randomRes.type}, {randomRes.county}/{randomRes.province}. {randomRes.dateEstablishment}.
                      </h1>
                    </div>

                    <div>
                      <Button 
                        className='btn btn-secondary'
                        style={{ borderRadius: 20, padding: 2, marginRight: 4 }}
                        onClick={closeSurpriseme}
                      >
                        <AiOutlineClose size="20"/>
                      </Button>
                    </div>
                  </div>
                  
                </ListGroup.Item>
              </div>
            </Collapse>
          </div>
        </div>

        <div style={{ paddingLeft: 20 }}>
          <Button
            onClick={() => { setOpenAddForm(!openAddForm); addRestaurant() }}
            aria-controls="resform"
            aria-expanded={openAddForm}
            className='btn btn-secondary'
          >
            Add Restaurant!
          </Button>

          <div>
            <Collapse in={openAddForm}>
              <div id="resform">
                <ResForm
                  setOpenAddForm={setOpenAddForm}
                  restList = {restList}
                />
              </div>
            </Collapse>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>

        <div className="resList" style={{ width: "100%", margin: 5, borderRadius: 15 }}>
          {
            restList.map(rest => {
              return (
                <ListGroup.Item key={rest.id} style={{ height: 70, backgroundColor: "#bcbcbc" }}>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ paddingLeft: 10 }}>
                      <h1 style={{ fontSize: 20, fontWeight: "bold" }}>
                        {rest.name}
                      </h1>
                      <h1 style={{ fontSize: 15 }}>
                        {rest.type}, {rest.county}/{rest.province}. {rest.dateEstablishment}.
                      </h1>
                    </div>

                    <div>
                      <Button
                        className='btn btn-secondary'
                        style={{ borderRadius: 20, padding: 2, marginRight: 4 }}
                        onClick={(e) => deleteRestaurant(rest.id)}
                      >
                        <AiOutlineDelete size="25" />
                      </Button>
                      <Button
                        onClick={() => {setOpenEdit(!openEdit);  setEditId(rest.id); setEditMode(true)}}
                        aria-controls="editArea"
                        aria-expanded={openEdit}
                        className='btn btn-secondary' style={{ borderRadius: 30, padding: 2 }}>
                        <AiFillEdit size="25" />
                      </Button>
                    </div>
                  </div>

                </ListGroup.Item>
              )
            })
          }
        </div>

        <div style={{ margin: 5 }}>
          <Collapse in={openEdit}>
            <div id="editArea">
              <ResForm 
                setOpenAddForm={setOpenAddForm}
                setOpenEdit={setOpenEdit}
                restList={restList}
                editMode={editMode}
                setEditMode={setEditMode}
                editId={editId}
              />
            </div>
          </Collapse>
        </div>
      </div>


    </div>
  );
}

/*const restList = [
  {
    resName: "AnadoluTat 1071",
    resType: "Ev Yemekleri",
    resProvince: "ANKARA",
    resCounty: "Çankaya",
    resDateEst: "1071"
  },
  {
    resName: "Just Burger",
    resType: "FastFood",
    resProvince: "ANKARA",
    resCounty: "Çankaya",
    resDateEst: "2021"
  },
  {
    resName: "City Wok",
    resType: "Uzakdoğu",
    resProvince: "ANKARA",
    resCounty: "Çankaya",
    resDateEst: "2018"
  }
]*/

export default App;
