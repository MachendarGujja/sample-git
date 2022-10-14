import { Button,Form,Card } from 'react-bootstrap'
import React from 'react';
import { useState } from 'react';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {MdModeEditOutline} from 'react-icons/md';
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css'

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

const App = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [editId, seteditId] = useState(0);
  // let [loading, setLoading] = useState(true);
  // let [color, setColor] = useState("#ffffff");

  const submitFunction = (e) =>{
    e.preventDefault();
    // console.log(editId)
    if(editId){
      const newUpdatedData = list.find((each)=>each.id === editId)
      const data = list.map((each)=>each.id === editId?(each={id:each.id,name:text}):{id:each.id,name:each.name});
      console.log(newUpdatedData);
      setList(data);
      setText("");
      seteditId(0);
      return;
    }
    if(text !== ""){
      setList([...list,{id:`${text}-${Date.now()}`,name:text}])
      setText("")
    }
  }
  const deleteFunction = (id) =>{
    const newUpdatedData = list.filter((each)=>each.id !== id)
    setList(newUpdatedData);
  }
  const editFunction = (id) =>{
    seteditId(id);
    const newUpdatedData = list.find((each)=>each.id === id)
    // console.log(newUpdatedData)
    setText(newUpdatedData.name);
  }

  return (
    <div className='App'>
      <div className='form'>
      <Form className='form-css' onSubmit={submitFunction}>
        <Form.Group >
          <Form.Control value={text} onChange={(e)=>setText(e.target.value)} style={{width:450}} type='text' placeholder='Type something...'/>
          </Form.Group>
          <Button variant="primary" type="submit" style={{width:100,height:38,backgroundColor:'green',border:'none'}}>{editId?'Edit':'Go'}</Button>
      </Form>
      <div className='data-css'>

      {list.length>0?
      (list.map((each)=>
      <Card className='card' style={{marginBottom:5}} key={each.id}>
          <Card.Body style={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
            <div>
            <Card.Text>{each.name}</Card.Text>
            </div>
            <div className='btn-css'>
            <Button onClick={()=>editFunction(each.id)} style={{marginRight:5,backgroundColor:'white',color:'black',border:'none'}}><MdModeEditOutline/></Button>
            <Button onClick={()=>deleteFunction(each.id)} style={{backgroundColor:'white',color:'black',border:'none'}}><RiDeleteBin6Line/></Button>
            </div>
          </Card.Body>
      </Card>
        )): <ClipLoader
        color={'red'}
        loading={true}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        />}
        </div>
              </div>
            </div>
          )
}

export default App