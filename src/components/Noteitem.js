import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const { note, update } = props;
  const { deletenode } = useContext(noteContext); // Destructure the object from context
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="col-md-4 my-2">
      <div className="card align-items-center">
        <img
          src="https://img.freepik.com/premium-vector/notebook_641063-126.jpg?w=360"
          className="card-img-top"
          alt="..."
          style={{ height: 100, width: 150 }}
        />
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-regular fa-trash-can mx-2"
              onClick={() => {
                deletenode(note._id);
              }}
            ></i>
            <i
              className="fa-sharp fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                update(note);
              }}
            ></i>
          </div>
          {expanded ? (
            <p className="card-text">{note.description}</p>
          ) : (
            <p className="card-text">{note.description.substring(0, 100)}...</p>
          )}
          <p className="card-text">{note.tag}.</p>

          {note.description.length > 100 && (
            <button type="button" className="btn btn-info btn-sm" onClick={toggleDescription}>
              {expanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
