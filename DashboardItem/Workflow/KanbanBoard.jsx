import React, { useState } from 'react';
import BoardColumn from './KanbanComp/BoardColumn/BoardColumn'; // BoardColumn component is provided below
import './KanbanBoard.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startStage = stages.find(stage => stage.id === parseInt(source.droppableId));
    const finishStage = stages.find(stage => stage.id === parseInt(destination.droppableId));

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
      <Droppable droppableId="board" type="column" direction="horizontal">
        {(provided, snapshot) => (
          <div
            className="kanban-board"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {stages.map((stage, index) => (
              <BoardColumn
              key={stage.id}
              stage={stage}
              index={index}
              addCardToStage={addCardToStage}
              deleteCard={deleteCard}
              editCard={editCard}
              deleteStage={deleteStage}
              editStageTitle={editStageTitle} // Add this line
            />
            ))}
            {provided.placeholder}
            <button className="add-stage-btn" onClick={addStage}>Add Stage</button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default KanbanBoard;
