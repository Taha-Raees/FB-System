import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './CreateEvent.scss';


const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const locations = ['Location 1', 'Location 2', 'Location 3']; // Example locations

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission logic here
        console.log({ eventName, description, date, location });
        // You might want to send this data to a backend server or manage state
    };

    return (
        <Card className="create-event-card">
            <CardContent>
                <Typography variant="h5">Create New Event</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Event Name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Location</InputLabel>
                        <Select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            label="Location"
                        >
                            {locations.map((loc, index) => (
                                <MenuItem key={index} value={loc}>{loc}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" color="primary" variant="contained">
                        Create Event
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateEvent;
