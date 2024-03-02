import React, { useState } from 'react';
import './Card.scss';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ card, deleteCard, editCard, stageId, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(card.content);

  const handleEdit = () => {
    editCard(stageId, card.id, editedContent);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedContent}
            onChange={e => setEditedContent(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>{card.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteCard(stageId, card.id)}>Delete</button>
        </>
      )}
    </div>
    )}
    </Draggable>
  );
};

export default Card;
