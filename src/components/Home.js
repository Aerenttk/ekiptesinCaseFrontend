import React, { Fragment } from "react"
import {Button, Table} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react"

function Home(){

    //Getters and Setters For Project
    const [data, setData] = useState([])
    const [id, setId] = useState(null)
    const [name, setName] = useState(null)
    const [lastname, setlastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [status, setStatus] = useState(null)

    function getId(val){
        setId(val.target.value)
    }

    function getName(val){
        setName(val.target.value)
    }

    function getlastName(val){
        setlastName(val.target.value)
    }

    function getEmail(val){
        setEmail(val.target.value)
    }

    function getStatus(val){
        setStatus(val.target.value)
    }

    //get api implement
    useEffect(() =>{
        fetch("http://localhost:10001/candidates/get_all")
        .then(response => response.json()).then(json => {
                console.log("aa",json)
                setData(json)
            }).catch(e => {
          console.log("e",e)
        })
    }, [])

    //Get One Candidate and Alert it
    const getOneEvent = () => {
        fetch("http://localhost:10001/candidates/get_one/" + id, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        } )
        .then(response => response.json()).then(json => {
                console.log("aa",json)
                setData(json)
                alert(id + "id li Adayın\n\nAdı: " + json.name + "\nSoyadı: " + json.lastName + "\nE-Postası: " + json.email + "\nBaşvuru Durumu: " + json.candidateStatus)
            }).catch(e => {
                alert(id + " id li Aday Bulunamadı")
        })
    }

    //update list with get api implement
    const updateListEvent = () => {
        fetch("http://localhost:10001/candidates/get_all")
        .then(response => response.json()).then(json => {
                console.log("aa",json)
                setData(json)
            }).catch(e => {
          console.log("e",e)
        })
    }

    //deleting with spesifical id by using delete api implementation
    const deleteByIdEvent = () => {
        fetch("http://localhost:10001/candidates/delete/" + id, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })
        .then(response => response.json()).then(json => {
                console.log("aa",json)
                setData(json)
            }).catch(e => {
          console.log("e",e)
        }).then(updateListEvent)
    }

    //update By Id
    const updateByIdEvent = () => {
        const data = {
            name: name,
            lastName: lastname,
            email: email,
            candidateStatus: status
        }
        fetch("http://localhost:10001/candidates/update/" + id, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log("response", response)
            if(response.status == 200){
                alert("Güncelleme Başarılı")
            }
        }).catch(e => {
          console.log("e",e)
        }).then(updateListEvent)
    }

    //post and put api implement
    const postPutEvent = () => {
        const data = {
            name: name,
            lastName: lastname,
            email: email,
            candidateStatus: status
        }
        fetch("http://localhost:10001/candidates/insert", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log("response", response)
            if(response.state == 200){
                alert("İnsertion Success")
            }
        }).catch(e => {
          console.log("e",e)
        }).then(updateListEvent)
    }

    return(
        <Fragment>
            <br></br>
            <br></br>
            <Button>EKİPTESİN CASE STUDY</Button>
            <div style = {{margin: "10rem"}}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                id
                            </th>
                            <th>
                                name
                            </th>
                            <th>
                                lastname
                            </th>
                            <th>
                                email
                            </th>
                            <th>
                                status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {data.map(item => {
                                    return(
                                        <div>{item.id}</div>
                                    )
                                })}                               
                            </td>
                            <td>
                                {data.map(item => {
                                    return(
                                        <div>{item.name}</div>
                                    )
                                })}                               
                            </td>
                            <td>
                                {data.map(item => {
                                    return(
                                        <div>{item.lastName}</div>
                                    )
                                })}                         
                            </td>
                            <td>
                                {data.map(item => {
                                    return(
                                        <div>{item.email}</div>
                                    )
                                })}                                      
                            </td>
                            <td>
                                {data.map(item => {
                                    return(
                                        <div>{item.candidateStatus}</div>
                                    )
                                })}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <form>            
                <label style = {{marginRight: "10rem"}}>
                    Name
                </label>
                <label  style = {{marginRight: "10rem"}}>
                    LastName
                </label>
                <label  style = {{marginRight: "10rem"}}>
                    E-Mail
                </label>
                <label>
                    Status
                </label>
            </form>
            <form>            
                <label>
                    <input type="text" name="name" onChange={getName}/>
                </label>
                <label>
                    <input type="text" name="lastName" onChange={getlastName} />
                </label>
                <label>
                    <input type="text" name="email" onChange={getEmail}/>
                </label>
                <label>
                    <input type="text" name="status" onChange={getStatus}/>
                </label>
            </form>
            <label>
                Delete/Update Id:
            </label>
            <label>
                <input type="text" name="id" onChange={getId}/>
            </label>
            <div style = {{margin: "10rem"}}>
                <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>
                                    <Button onClick={postPutEvent}>Create</Button>
                                </th>
                                <th>
                                    <Button onClick={updateByIdEvent}>UpdateById</Button>
                                </th>
                                <th>
                                    <Button onClick={deleteByIdEvent}>DeleteById</Button>
                                </th>
                                <th>
                                    <Button onClick={getOneEvent}>Get One</Button> 
                                </th>
                            </tr>
                        </thead>
                </Table>
            </div>
        </Fragment>
        
    )
}

export default Home;