import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '@/DashboardItem/Workflow/KanbanComp/Card/Card'; // Card component is provided below
import './BoardColumn.scss';

const BoardColumn = ({ stage, addCardToStage, deleteCard, editCard, deleteStage, index }) => {
  const [newCardContent, setNewCardContent] = useState('');

  const handleAddCard = () => {
    addCardToStage(stage.id, newCardContent);
    setNewCardContent('');
  };

  return (
    <Draggable draggableId={String(stage.id)} index={index}>
      {(provided) => (
        <div
          className="board-column"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="column-header" {...provided.dragHandleProps}>
            <h2>{stage.title}</h2>
            <button onClick={() => deleteStage(stage.id)}>Delete Stage</button>
          </div>
          <Droppable droppableId={String(stage.id)} type="card">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="cards-container"
              >
                {stage.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    deleteCard={deleteCard}
                    editCard={editCard}
                    stageId={stage.id}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <input
            type="text"
            placeholder="New card content"
            value={newCardContent}
            onChange={e => setNewCardContent(e.target.value)}
          />
          <button onClick={handleAddCard}>Add Card</button>
        </div>
      )}
    </Draggable>
  );
};

export default BoardColumn;



