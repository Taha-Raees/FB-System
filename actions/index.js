import _ from 'lodash';
import moment from 'moment';
import {
    fetchEvents as apiFetchEvents,
    addEvent as apiAddEvent,
    updateEvent as apiUpdateEvent,
    deleteEvent as apiDeleteEvent
  } from '@/app/apiService/apiEvent'; // Adjust the path as needed
  export const FETCH_EVENTS = 'fetch_events';
  export const CREATE_EVENT = 'create_event';
  export const UPDATE_EVENT = 'update_event';
  export const DELETE_EVENT = 'delete_event';
  export const PAST_EVENTS = 'past_events';
  export const UPCOMING_EVENTS = 'upcoming_events';
  export const ONGOING_EVENTS = 'ongoing_events';
  export const ACTION_FAILED = 'ACTION_FAILED';
  
  export const fetchEventsFromAPI = () => async (dispatch) => {
    try {
      const events = await apiFetchEvents();
      dispatch({ type: FETCH_EVENTS, payload: events });
    } catch (error) {
      dispatch({ type: ACTION_FAILED, payload: error.toString() });
    }
  };
  
  export const createEventInAPI = (eventData) => async (dispatch) => {
    try {
      const newEvent = await apiAddEvent(eventData);
      dispatch({ type: CREATE_EVENT, payload: newEvent });
      dispatch(fetchEventsFromAPI());
    } catch (error) {
      dispatch({ type: ACTION_FAILED, payload: error.toString() });
    }
  };
  
  export const updateEventInAPI = (id, eventData) => async (dispatch) => {
    try {
      const updatedEvent = await apiUpdateEvent(id, eventData);
      dispatch({ type: UPDATE_EVENT, payload: updatedEvent });
      dispatch(fetchEventsFromAPI());
    } catch (error) {
      dispatch({ type: ACTION_FAILED, payload: error.toString() });
    }
  };
  
  export const deleteEventInAPI = (id) => async (dispatch) => {
    try {
      await apiDeleteEvent(id);
      dispatch({ type: DELETE_EVENT, payload: id });
      dispatch(fetchEventsFromAPI());
    } catch (error) {
      dispatch({ type: ACTION_FAILED, payload: error.toString() });
    }
  };
  
  export const fetchPastEvents = () => async (dispatch) => {
    try {
      const events = await apiFetchEvents();
      // Considering 'now' as the beginning of today for comparison
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      
      const pastEvents = events.filter(event => new Date(event.endDate) < now);
      dispatch({ type: PAST_EVENTS, payload: pastEvents });
    } catch (error) {
      dispatch({ type: ACTION_FAILED, payload: error.toString() });
    }
  };
  
  export const fetchUpcomingEvents = () => async (dispatch) => {
    try {
      const events = await apiFetchEvents();
      // Considering 'now' as the end of today for comparison
      const now = new Date();
      now.setHours(23, 59, 59, 999);
  
      const upcomingEvents = events.filter(event => new Date(event.startDate) > now);
      dispatch({ type: UPCOMING_EVENTS, payload: upcomingEvents });
    } catch (error) {
      dispatch({ type: ACTION_FAILED, payload: error.toString() });
    }
  };
  
  export const fetchOngoingEvents = () => async (dispatch) => {
    try {
      const events = await apiFetchEvents();
      const now = new Date();
      
      const ongoingEvents = events.filter(event => new Date(event.startDate) <= now && new Date(event.endDate) >= now);
      dispatch({ type: ONGOING_EVENTS, payload: ongoingEvents });
    } catch (error) {
      dispatch({ type: ACTION_FAILED, payload: error.toString() });
    }
  };
  