import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap'

function RestaurantForm({ setOpenAddForm,setOpenEdit, restList, editMode, setEditMode, editId }) {

    const [formName, setformName] = useState("");
    const [formType, setformType] = useState("");
    const [formProvince, setformProvince] = useState("");
    const [formCounty, setformCounty] = useState("");
    const [formDateEst, setformDateEst] = useState("");
    let listFlag = false;
    let listFlagEdit = false;

    const url = "https://localhost:7246/api/RestaurantListContoller"

    const newData = {
        "name": formName,
        "type": formType,
        "province": formProvince,
        "county": formCounty,
        "dateEstablishment": formDateEst
    }

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS'
    }

    function submitBtn() {

        setOpenAddForm(false);

        if (editMode) {
            restList.map((rest) => {
                if (rest.name === newData.name) {
                    alert("This restaurant is already on the list!")
                    listFlagEdit= true;
                }
            })

            if(listFlagEdit===false)
            {
                axios.put(`${url}/${editId}`, {
                    "id": editId,
                    "name": formName,
                    "type": formType,
                    "province": formProvince,
                    "county": formCounty,
                    "dateEstablishment": formDateEst
                })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })    
            }
            setOpenEdit(false);
            
        }

        else {
            restList.map((rest) => {
                if (rest.name === newData.name) {
                    alert("This restaurant is already on the list!")
                    listFlag = true;
                }
            })

            if (listFlag === false) {
                axios.post("https://localhost:7246/api/RestaurantListContoller", newData, { headers: headers })
                    .then(response => {
                        console.log("restaurant added")
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

            listFlag = false;

        }

        setformName("");
        setformType("");
        setformProvince("");
        setformCounty("");
        setformDateEst("");
        setEditMode(false)
    }

    return (
        <div style={{ width: 400 }}>
            <Form>
                <Form.Group className="resname" controlId='formResName'>
                    <Form.Label style={{ fontSize: 15 }}>Restaurant Name</Form.Label>
                    <Form.Control
                        type="resName"
                        value={formName}
                        placeholder='Enter restaurant name'
                        onChange={(e) => setformName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="resType" controlId='formResType'>
                    <Form.Label style={{ fontSize: 15 }}>Restaurant Type</Form.Label>
                    <Form.Control
                        type="resType"
                        value={formType}
                        placeholder='Enter restaurant type'
                        onChange={(e) => setformType(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="resProvince" controlId='formResProvince'>
                    <Form.Label style={{ fontSize: 15 }}>Restaurant Province</Form.Label>
                    <Form.Control
                        type="resProvince"
                        value={formProvince}
                        placeholder='Enter restaurant province'
                        onChange={(e) => setformProvince(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="resCounty" controlId='formResCounty'>
                    <Form.Label style={{ fontSize: 15 }}>Restaurant County</Form.Label>
                    <Form.Control
                        type="resCounty"
                        value={formCounty}
                        placeholder='Enter restaurant county'
                        onChange={(e) => setformCounty(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="resDateofEstablishment" controlId='formResDateofEstablishment'>
                    <Form.Label style={{ fontSize: 15 }}>Restaurant Date of Establishment</Form.Label>
                    <Form.Control
                        value={formDateEst}
                        placeholder='Enter restaurant date of establishment'
                        onChange={(e) => setformDateEst(e.target.value)}
                    />
                </Form.Group>
                <Button className="btn btn-secondary" onClick={submitBtn}>
                    Submit!
                </Button>
            </Form>


        </div>
    )
}

export default RestaurantForm