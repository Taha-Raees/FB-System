import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';

const TaskCard = ({ id, content, labels }) => {
  return (
    <Card variant="outlined" sx={{ margin: '8px 0', backgroundColor: '#FFFFFF' }}>
      <CardContent>
        {labels.map((label) => (
          <Chip key={label} label={label} size="small" sx={{ marginRight: '8px' }} />
        ))}
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

