import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import CustomToolbar from './toolbar';
import Popup from 'react-popup';
import Input from './input';
import moment from 'moment';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../actions';
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
                <p>Date: <strong>{date}</strong></p>
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
            popupTitle = "Create Event";
            newEvent = true;
        }

        let titleChange = function (value) {
            slotInfo.title = value;
        };
        let locationChange = function (value) {
            slotInfo.location = value;
        };
        
        Popup.create({
            title: popupTitle,
            content: <div>
                        <Input onChange={titleChange} placeholder="Event Title" defaultValue={slotInfo.title} />
                        <Input onChange={locationChange} placeholder="Event Location" defaultValue={slotInfo.location} />
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
        let current_time = moment().format('YYYY MM DD');
        let event_time = moment(event.start).format('YYYY MM DD');
        let background = (current_time>event_time) ? '#DE6987' : '#8CBD4C';
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
                    views={['month']}
                    style={{ height: 600 }}
                    events={this.props.events}
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
