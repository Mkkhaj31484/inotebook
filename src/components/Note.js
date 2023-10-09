import React, { useContext, useEffect,useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {Navigate, useNavigate } from 'react-router-dom';
const Note = () => {
  const {mynote,getNotes, updatenode} = useContext(noteContext); // Destructure the values from the context
 const [note,setNote] = useState({id:"", etitle:"",edescription:"",etag:""});
 const navigate = useNavigate();
  const onChange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
     }

     const handleOnClick=(e)=>{
      e.preventDefault();
      updatenode(note.id,note.etitle,note.edescription,note.etag);
      closeRef.current.click();
      
     }
   // fetching notes

  useEffect(()=>{
   if(localStorage.getItem('token')){
    getNotes();
   }else{
   navigate("/login");
   }
  
  },[])
const ref = useRef(null);
const closeRef = useRef(null);

  const update = (correntNote)=>{
     ref.current.click('toggle');
    setNote({id:correntNote._id,etitle:correntNote.title,edescription:correntNote.description,etag:correntNote.tag});
  }

  return (
    <>
    <AddNote/>
  
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">title</label>
      <input type="text" className="form-control" id="title"value ={note.etitle} name='etitle' aria-describedby="emailHelp" onChange={onChange}/>
      
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <input type="text" className="form-control" id="description" value={note.edescription} name='edescription' onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="tag" className="form-label">Tag</label>
      <input type="text" className="form-control" id="tag" value = {note.etag} name='etag' onChange={onChange}/>
    </div>
   
  </form>
      </div>
      <div className="modal-footer">
        <button  ref = {closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<10} type="button" className="btn btn-primary" onClick={handleOnClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>

{/*notes container */}
<div className='container' style ={{width:1100}}>
      <div className=' text-center'  style={{marginBottom:30,marginTop:50,color:"greenyellow"}}>
        <h1 >
          <strong id='yournotes'>Your Notes</strong></h1>
      </div>
      <div className='row' >
        {mynote.map((note) => {
          return <Noteitem key={note._id}  update={update} note={note} />;
        })}
      </div>
      </div>
      </>
  );
};

export default Note;