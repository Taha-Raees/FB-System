import React, { useState } from 'react';
import BoardColumn from './KanbanComp/BoardColumn/BoardColumn'; // BoardColumn component is provided below
import './KanbanBoard.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Add } from '@mui/icons-material';

const KanbanBoard = () => {
  const [stages, setStages] = useState([
    { id: 1, title: 'UNASSIGNED', cards: [{ id: 1, content: 'Example Card' }] },
    { id: 2, title: 'TODO', cards: [] },
    { id: 3, title: 'IN PROGRESS', cards: [] },
    { id: 4, title: 'DONE', cards: [] },
  ]);
  const editStageTitle = (stageId, newTitle) => {
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageId ? { ...stage, title: newTitle } : stage
      )
    );
  };

  const addStage = () => {
    const newStageId = Math.max(0, ...stages.map(s => s.id)) + 1;
    const newStage = { id: newStageId, title: `NEW STAGE ${newStageId}`, cards: [] };
    setStages(stages => [...stages, newStage]);
  };

  const deleteStage = stageId => {
    setStages(stages => stages.filter(stage => stage.id !== stageId));
  };

  const addCardToStage = (stageId, cardContent) => {
    const newCardId = Math.max(0, ...stages.flatMap(s => s.cards.map(c => c.id))) + 1;
    const newCard = { id: newCardId, content: cardContent };
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageId ? { ...stage, cards: [...stage.cards, newCard] } : stage
      )
    );
  };

  const editCard = (stageId, cardId, newContent) => {
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageId
          ? {
              ...stage,
              cards: stage.cards.map(card =>
                card.id === cardId ? { ...card, content: newContent } : card
              ),
            }
          : stage
      )
    );
  };

  const deleteCard = (stageId, cardId) => {
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageId
          ? {
              ...stage,
              cards: stage.cards.filter(card => card.id !== cardId),
            }
          : stage
      )
    );
  };
  const onDragEnd = result => {
    const { destination, source } = result;
  
    if (!destination) {
      return;
    }
  
    const startStageId = parseInt(source.droppableId, 10);
    const finishStageId = parseInt(destination.droppableId, 10);
  
    const startStage = stages.find(stage => stage.id === startStageId);
    const finishStage = stages.find(stage => stage.id === finishStageId);
  
    if (!startStage || !finishStage) {
      console.error('Stage not found:', { startStageId, finishStageId });
      return; // Stop the function if stages are not found
    }

    if (startStage === finishStage) {
      // Moving within the same stage
      const newCards = Array.from(startStage.cards);
      const [reorderedCard] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, reorderedCard);

      const newStage = { ...startStage, cards: newCards };

      setStages(stages =>
        stages.map(stage =>
          stage.id === startStage.id ? newStage : stage
        )
      );
    } else {
      // Moving from one stage to another
      const startCards = Array.from(startStage.cards);
      const [movedCard] = startCards.splice(source.index, 1);
      const finishCards = Array.from(finishStage.cards);
      finishCards.splice(destination.index, 0, movedCard);

      const newStartStage = { ...startStage, cards: startCards };
      const newFinishStage = { ...finishStage, cards: finishCards };
      

      setStages(stages =>
        stages.map(stage =>
          stage.id === startStage.id ? newStartStage : stage.id === finishStage.id ? newFinishStage : stage
        )
        
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {stages.map((stage, index) => (
          <BoardColumn
            key={stage.id}
            stage={stage}
            index={index}
            addCardToStage={addCardToStage}
            deleteCard={deleteCard}
            editCard={editCard}
            deleteStage={deleteStage}
            editStageTitle={editStageTitle}
          />
        ))}
        <span className="add-stage-btn" onClick={addStage}><Add/><p>New Stage</p></span>
      </div>
      
    </DragDropContext>
  );
};

export default KanbanBoard;
