import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  // const parseData = JSON.stringify(notesInitial);
  const [mynote, setNote] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
  
    const json = await response.json();
    console.log(json);
    setNote(json);
  }

  // adding a note
  const addnote = async(title, description, tag) => {

  
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }) // Include the body property correctly
      });
    
      const json = await response.json();
      console.log(json);
      const note = json; // Use the response from the server instead of a hardcoded note
      setNote(mynote.concat(note));
    };
  

  // deleting a note
  const deletenode = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    // const json = await response.json();
    console.log(response);
    const newnote = mynote.filter((note) => note._id !== id);
    setNote(newnote);
  };

  //updating a note
  const updatenode = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
  
    if (response.status === 200) {
      // Update the note in the mynote state array
      setNote((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    } else {
      // Handle error if update fails
      console.log('Failed to update the note');
    }
  };

 
  return (
    //[notesInitial.title,notesInitial.description, setNotes]
    <noteContext.Provider value={{ mynote, addnote, deletenode,getNotes,updatenode }}>
      {props.children}
    </noteContext.Provider>
  )

}


export default NoteState;