import React,{useContext,useState} from 'react';
import noteContext from '../context/notes/noteContext';

 const AddNote = () => {
   const [note,setNote] =useState({title :"",description:"",tag:""});
   const {addnote} = useContext(noteContext);//destructure the object from context
    const onChange =(e)=>{
   setNote({...note,[e.target.name]:e.target.value});
    }

    const handleOnClick=(e)=>{
       e.preventDefault();
       addnote(note.title,note.description,note.tag);
       setNote({title:"",description:"",tag:""});
    }

   
  return (
    <>
    <div className='container' style ={{width:1100}}>
      <div className='text-center' style={{marginTop:20,marginBottom:10,color:"greenyellow"}}>
    <h1><strong id="yournotes2">Add Your Notes Here</strong></h1>
        </div>

    <form>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Title</label>
      <input type="text" className="form-control" placeholder='Enter Your Title' id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
      
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <textarea type="text" className="form-control" id="description" placeholder='Enter Your Description Here' name='description' rows={5} value ={note.description} onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="tag" className="form-label">Tag</label>
      <input type="text" className="form-control" id="tag" placeholder='Enter Your Tag' name='tag' value={note.tag} onChange={onChange}/>
    </div>
   
    <button disabled={note.title.length<5 || note.description.length<10} type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
  </form>
  </div>
  </>
  )
}
export default AddNote;
