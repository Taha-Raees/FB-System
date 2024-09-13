import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';

const SelectEventAndPosPopup = ({ events, onSelection, onClose }) => {
    const [selectedEventId, setSelectedEventId] = useState('');
    const [selectedPosId, setSelectedPosId] = useState('');

    // Filter ongoing events
    const currentDate = moment().format('YYYY-MM-DD');
    const ongoingEvents = events.filter(event =>
        moment(event.startDate).isSameOrBefore(currentDate) && moment(event.endDate).isSameOrAfter(currentDate)
    );

    // Render POS options based on the selected event
    const posOptions = [...Array(ongoingEvents.find(e => e.id === Number(selectedEventId))?.numOfPos || 0).keys()].map(n => n + 1);

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Select Event and POS</DialogTitle>
            <DialogContent>
                <Select
                    value={selectedEventId}
                    onChange={e => setSelectedEventId(e.target.value)}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value="" disabled>
                        Select Event
                    </MenuItem>
                    {ongoingEvents.map(event => (
                        <MenuItem key={event.id} value={event.id}>
                            {event.title}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={selectedPosId}
                    onChange={e => setSelectedPosId(e.target.value)}
                    displayEmpty
                    fullWidth
                    disabled={!selectedEventId}
                >
                    <MenuItem value="" disabled>
                        Select POS
                    </MenuItem>
                    {posOptions.map(posId => (
                        <MenuItem key={posId} value={posId}>
                            POS #{posId}
                        </MenuItem>
                    ))}
                </Select>
                <Button
                    onClick={() => onSelection(Number(selectedEventId), selectedPosId)}
                    disabled={!selectedEventId || !selectedPosId}
                >
                    Confirm
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default SelectEventAndPosPopup;
