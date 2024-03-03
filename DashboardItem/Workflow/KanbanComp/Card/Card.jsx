import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Card.scss';
import { MoreHoriz, Edit, DeleteSweep, DeleteForever, MapsUgcRounded, ShortTextRounded, QueryBuilderRounded, GroupAddRounded } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';

const Card = ({ card, deleteCard, editCard, stageId, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(card.content);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleEdit = () => {
    editCard(stageId, card.id, editedContent);
    setIsEditing(false);
    handleCloseMenu();
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <div className="card-content">
                <p>{card.content}</p>
                <MoreHoriz  className='buttons' onClick={handleClickMenu}/>
               <Menu 
               style={{scale: 0.85,marginTop:-50,marginLeft:-25  }}
                  id="card-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => { setIsEditing(true); handleCloseMenu(); }}>
                    <Edit fontSize="small" style={{ marginRight: 8 }} />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => { deleteCard(stageId, card.id); handleCloseMenu(); }}>
                    <DeleteForever fontSize="small" style={{ marginRight: 8 }} />
                    Delete
                  </MenuItem>
                </Menu>
              </div>
              <div className="card-footer">
                <div className="card-details">
                <GroupAddRounded/>
                </div>
                <div className="comments">
                <MapsUgcRounded/><span>2</span>
                </div>
                <div className="date">
                <QueryBuilderRounded/><span>MAR 05</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
