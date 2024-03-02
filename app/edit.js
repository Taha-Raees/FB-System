import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '@/DashboardItem/Workflow/KanbanComp/Card/Card'; // Card component is provided below
import './BoardColumn.scss';
import { Add, Delete } from '@mui/icons-material';
import AddCardButton from '@/Buttons/AddCardButton/AddCardButton';

const BoardColumn = ({ stage, addCardToStage, deleteCard, editCard, deleteStage, index }) => {
  const [newCardContent, setNewCardContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(stage.title);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      editStageTitle(stage.id, editedTitle);
    }
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
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
          <div className="title-count">{isEditing ? (
          <input type="text" value={editedTitle} onChange={handleTitleChange} onBlur={toggleEdit} autoFocus />
        ) : (
          <h2 onClick={toggleEdit}>{stage.title}</h2>
        )}
        <span className="card-count">{stage.cards.length}</span></div>
        <div className="buttons"><AddCardButton onAddCardToStage={(content) => addCardToStage(stage.id, content)} />
        <Delete className='del-stage-btn' onClick={() => deleteStage(stage.id)}/></div>
      </div>
      <hr />
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
        </div>
      )}
    </Draggable>
  );
};

export default BoardColumn;