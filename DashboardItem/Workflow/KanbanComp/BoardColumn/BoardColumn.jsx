import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from '@/DashboardItem/Workflow/KanbanComp/Card/Card'; // Assuming Card component exists
import './BoardColumn.scss';
import { Add, Delete } from '@mui/icons-material';
import AddCardButton from '@/Buttons/AddCardButton/AddCardButton';

const BoardColumn = ({ stage, addCardToStage, deleteCard, editCard, deleteStage, index ,editStageTitle}) => {
  const [newCardContent, setNewCardContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(stage.title);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  // Call this when the input loses focus or when the user presses Enter
  const handleBlurOrEnter = () => {
    editStageTitle(stage.id, editedTitle); // Update the stage title in the parent component's state
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="board-column">
      <div className="column-header">
        <div className="title-count">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              onBlur={handleBlurOrEnter} // Save the title when the input loses focus
              onKeyPress={(e) => e.key === 'Enter' && handleBlurOrEnter()} // Save the title when Enter is pressed
              autoFocus
            />
          ) : (
            <h2 onClick={() => setIsEditing(true)}>{stage.title}</h2> // Click to edit
          )}
          <span className="card-count">{stage.cards.length}</span>
        </div>
        <div className="buttons">
          <AddCardButton onAddCardToStage={(content) => addCardToStage(stage.id, content)} />
          <Delete className='del-stage-btn' onClick={() => deleteStage(stage.id)} />
        </div>
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
  );
};

export default BoardColumn;
