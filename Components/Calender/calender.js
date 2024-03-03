import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import CustomToolbar from './toolbar';
import Popup from 'react-popup';
import Input from './input';
import moment from 'moment';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../../actions';
import 'react-popup/style.css'; // The path may vary based on the actual structure of the package
import './calender.css'

const localizer = momentLocalizer(moment); // Setup the localizer by providing the moment Object to the correct localizer.

class Calendar extends Component {
    
    componentDidMount() {
        this.props.fetchEvents();
    }

    renderEventContent = (slotInfo) => {
        const date = moment(slotInfo.start).format('MMMM D, YYYY');
        return (
            <div>
                <p>Start Date: <strong>{date}</strong></p>
                <p>End Date: {slotInfo.endDate}</p>

                <p>Location: {slotInfo.location}</p>
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
        if(!slotInfo.hasOwnProperty('id')) {
            slotInfo.id = moment().format('x');
            slotInfo.title = null;
            slotInfo.location = null;
            slotInfo.startDate = moment(slotInfo.start).format('YYYY-MM-DD');
            slotInfo.endDate = moment(slotInfo.start).format('YYYY-MM-DD');
            popupTitle = "Create Event";
            newEvent = true;
        }

        let titleChange = function (value) {
            slotInfo.title = value;
        };
        let locationChange = function (value) {
            slotInfo.location = value;
        };
        let startDateChange = function (value) {
            slotInfo.startDate = value;
        };
        let endDateChange = function (value) {
            slotInfo.endDate = value;
        };
        
        Popup.create({
            title: popupTitle,
            content: <div>
                        <Input onChange={titleChange} placeholder="Event Title" defaultValue={slotInfo.title} />
                        <Input onChange={locationChange} placeholder="Event Location" defaultValue={slotInfo.location} />
                        <Input onChange={startDateChange} placeholder="Start Date" defaultValue={slotInfo.startDate} type="date" />
                        <Input onChange={endDateChange} placeholder="End Date"defaultValue={slotInfo.endDate} type="date"/>
                    </div>,
            buttons: {
                left: ['cancel'],
                right: [{
                    text: 'Save',
                    className: 'success',
                    action: function () {
                        if(newEvent) {
                            this.props.createEvent(slotInfo);
                        } else {
                            this.props.updateEvent(slotInfo);
                        }
                        Popup.close();
                    }.bind(this)
                }]
            }
        });
    }

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
                events={this.props.events.map(event => ({
                    ...event,
                    start: new Date(event.startDate),
                    end: new Date(moment(event.endDate).add(1, 'days')) // Adjust end date
                }))}
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
