import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import CustomToolbar from './toolbar';
import Popup from 'react-popup';
import Input from './input';
import moment from 'moment';
import { fetchEventsFromAPI as fetchEvents,
    createEventInAPI as createEvent,
    updateEventInAPI as updateEvent,
    deleteEventInAPI as deleteEvent } from '../../actions';
import 'react-popup/style.css'; // The path may vary based on the actual structure of the package
import './calender.css'

const localizer = momentLocalizer(moment); // Setup the localizer by providing the moment Object to the correct localizer.

class Calendar extends Component {
    
    componentDidMount() {
        this.props.fetchEvents();
    }

    renderEventContent = (slotInfo) => {
        const date = moment(slotInfo.start).format('MMMM D, YYYY');
        const endDate = moment(slotInfo.endDate).format('MMMM D, YYYY');
        return (
            <div>
                <p>Start Date: <strong>{date}</strong></p>
                <p>End Date: <strong>{endDate}</strong></p>
                <p>Location: <strong>{slotInfo.location}</strong></p>
            </div>
        );
    }
    
    onSelectEventHandler = (slotInfo) => {
        Popup.create({
            title: slotInfo.title,
            content: this.renderEventContent(slotInfo),
            buttons: {
                right: [{
                    text: 'Edit',
                    className: 'info',
                    action: function () {
                        Popup.close();
                        this.openPopupForm(slotInfo);
                    }.bind(this)
                }, {
                    text: 'Delete',
                    className: 'danger',
                    action: function () {
                        this.props.deleteEvent(slotInfo.id);
                        Popup.close();
                    }.bind(this)
                }]
            }
        });
    }

    onSelectEventSlotHandler = (slotInfo) => {
        this.openPopupForm(slotInfo);
    }

    openPopupForm = (slotInfo) => {
        let newEvent = false;
        let popupTitle = "Update Event";
        if (!slotInfo.hasOwnProperty('id')) {
            // For new events, set default values
            newEvent = true;
            popupTitle = "Create Event";
            slotInfo = {
                ...slotInfo,
                id: Date.now().toString(), // Temporary ID; backend should assign a real ID
                title: "",
                location: "",
                // Use moment to format JavaScript Date objects to ISO 8601 strings
                startDate: moment(slotInfo.start).toISOString(),
                endDate: moment(slotInfo.end).toISOString(),
            };
        } else {
            // For existing events, format dates from JavaScript Date objects to ISO 8601 strings
            slotInfo = {
                ...slotInfo,
                startDate: moment(slotInfo.start).toISOString(),
                endDate: moment(slotInfo.end).toISOString(),
            };
        }
    
        let handleChange = (key, value) => {
            slotInfo[key] = value;
        };
    
        Popup.create({
            title: popupTitle,
            content: <div>
                        <Input onChange={(value) => handleChange('title', value)} placeholder="Event Title" defaultValue={slotInfo.title} />
                        <Input onChange={(value) => handleChange('location', value)} placeholder="Event Location" defaultValue={slotInfo.location} />
                        <Input onChange={(value) => handleChange('startDate', value)} placeholder="Start Date" defaultValue={moment(slotInfo.startDate).format('YYYY-MM-DD')} type="date" />
                        <Input onChange={(value) => handleChange('endDate', value)} placeholder="End Date" defaultValue={moment(slotInfo.endDate).format('YYYY-MM-DD')} type="date"/>
                    </div>,
            buttons: {
                left: ['cancel'],
                right: [{
                    text: 'Save',
                    className: 'success',
                    action: function () {
                        let eventData = {
                            ...slotInfo,
                            // Ensure dates are formatted as ISO 8601 strings for Prisma/Backend
                            startDate: moment(slotInfo.startDate).toISOString(),
                            endDate: moment(slotInfo.endDate).toISOString(),
                        };
                        if (newEvent) {
                            this.props.createEvent(eventData);
                        } else {
                            this.props.updateEvent(slotInfo.id, eventData);
                        }
                        Popup.close();
                    }.bind(this)
                }]
            }
        });
    };
    

    eventStyleGetter = (event, start, end, isSelected) => {
        let current_time = moment().format('YYYY-MM-DD');
        let event_start = moment(event.start).format('YYYY-MM-DD');
        let event_end = moment(event.end).format('YYYY-MM-DD');
    
        let background = '#8CBD4C'; // Default color for upcoming events
        if (current_time > event_end) {
            background = '#DE6987'; // Past events color
        } else if (current_time >= event_start && current_time <= event_end) {
            background = '#FED766'; // Ongoing events color
        }
    
        return {
            style: {
                backgroundColor: background
            }
        };
    }

    render() {
        return (
            <div className="calendar-container">
            <BigCalendar
                popup
                selectable
                localizer={localizer}
                defaultView='month'
                components={{ toolbar: CustomToolbar }}
                views={['month', 'week', 'day', 'agenda']} // Ensure all views are available
                style={{ backgroundColor: '#ffffffe4' , paddingTop: '10px', paddingRight: '10px', paddingLeft: '10px', paddingBottom: '10px',borderRadius: '5px'}}
                events={Array.isArray(this.props.events) ? this.props.events.map(event => ({
                    ...event,
                    start: new Date(event.startDate),
                    end: new Date(moment(event.endDate).add(1, 'days')) // Adjust end date
                  })) : []}
                eventPropGetter={this.eventStyleGetter}
                onSelectEvent={this.onSelectEventHandler}
                onSelectSlot={this.onSelectEventSlotHandler}
            />
            <Popup />
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.events
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchEvents, 
        createEvent, 
        updateEvent, 
        deleteEvent
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
