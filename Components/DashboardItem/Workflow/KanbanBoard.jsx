"use client";
import React, { useState, useEffect } from 'react';
import BoardColumn from './KanbanComp/BoardColumn/BoardColumn';
import './KanbanBoard.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import { Add } from '@mui/icons-material';

const KanbanBoard = () => {
  const LOCAL_STORAGE_KEY = 'kanbanBoardStages';

  const saveToLocalStorage = (stages) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stages));
    }
  };

  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const storedStages = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedStages ? JSON.parse(storedStages) : null;
    }
    return null;
  };

  const [stages, setStages] = useState(() => {
    const savedStages = loadFromLocalStorage();
    return (
      savedStages || [
        { id: 1, title: 'UNASSIGNED', cards: [{ id: 1, content: 'Example Card' }] },
        { id: 2, title: 'TODO', cards: [] },
        { id: 3, title: 'IN PROGRESS', cards: [] },
        { id: 4, title: 'DONE', cards: [] },
      ]
    );
  });

  useEffect(() => {
    saveToLocalStorage(stages);
  }, [stages]);

  const editStageTitle = (stageId, newTitle) => {
    setStages((stages) =>
      stages.map((stage) =>
        stage.id === stageId ? { ...stage, title: newTitle } : stage
      )
    );
  };

  const addStage = () => {
    const newStageId = Math.max(0, ...stages.map((s) => s.id)) + 1;
    const newStage = { id: newStageId, title: `NEW STAGE ${newStageId}`, cards: [] };
    setStages((stages) => [...stages, newStage]);
  };

  const deleteStage = (stageId) => {
    setStages((stages) => stages.filter((stage) => stage.id !== stageId));
  };

  const addCardToStage = (stageId, cardContent) => {
    const newCardId = Math.max(0, ...stages.flatMap((s) => s.cards.map((c) => c.id))) + 1;
    const newCard = { id: newCardId, content: cardContent };
    setStages((stages) =>
      stages.map((stage) =>
        stage.id === stageId ? { ...stage, cards: [...stage.cards, newCard] } : stage
      )
    );
  };

  const editCard = (stageId, cardId, newContent) => {
    setStages((stages) =>
      stages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              cards: stage.cards.map((card) =>
                card.id === cardId ? { ...card, content: newContent } : card
              ),
            }
          : stage
      )
    );
  };

  const deleteCard = (stageId, cardId) => {
    setStages((stages) =>
      stages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              cards: stage.cards.filter((card) => card.id !== cardId),
            }
          : stage
      )
    );
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const startStageId = parseInt(source.droppableId, 10);
    const finishStageId = parseInt(destination.droppableId, 10);

    const startStage = stages.find((stage) => stage.id === startStageId);
    const finishStage = stages.find((stage) => stage.id === finishStageId);

    if (!startStage || !finishStage) {
      console.error('Stage not found:', { startStageId, finishStageId });
      return;
    }

    if (startStage === finishStage) {
      const newCards = Array.from(startStage.cards);
      const [reorderedCard] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, reorderedCard);

      const newStage = { ...startStage, cards: newCards };

      setStages((stages) =>
        stages.map((stage) =>
          stage.id === startStage.id ? newStage : stage
        )
      );
    } else {
      const startCards = Array.from(startStage.cards);
      const [movedCard] = startCards.splice(source.index, 1);
      const finishCards = Array.from(finishStage.cards);
      finishCards.splice(destination.index, 0, movedCard);

      const newStartStage = { ...startStage, cards: startCards };
      const newFinishStage = { ...finishStage, cards: finishCards };

      setStages((stages) =>
        stages.map((stage) =>
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
        <span className="add-stage-btn" onClick={addStage}>
          <Add />
          <p>New Stage</p>
        </span>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
