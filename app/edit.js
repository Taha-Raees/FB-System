import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Card.scss';

const Card = ({ card, deleteCard, editCard, stageId, index }) => {
  // Existing state and handlers

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* Existing card content */}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
