import {ADD_VISIT, DELETE_VISIT, SET_VISIT_DATA} from './actionTypes';

const addVisit = (visitInfo) => ({
  type: ADD_VISIT,
  payload: {visitInfo},
});

const setVisitData = (visitData) => ({
  type: SET_VISIT_DATA,
  payload: {visitData},
});

const deleteVisit = (visitId) => ({
  type: DELETE_VISIT,
  payload: {visitId},
});

export {addVisit, setVisitData, deleteVisit};
