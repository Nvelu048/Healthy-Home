import {ADD_VISIT, DELETE_VISIT, SET_VISIT_DATA} from '../actionTypes';

/*
  Initial State of Medical Records
 */
const initialState = {
  visitList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    /*
      Add Visit to the Store
     */
    case ADD_VISIT: {
      const {visitInfo} = action.payload;
      let resultantState = {
        ...state,
        visitList: [...state.visitList, visitInfo],
      };
      return resultantState;
    }
    /*
      Set the Visit Data
     */
    case SET_VISIT_DATA: {
      const {visitData} = action.payload;
      return {
        ...state,
        visitList: [...state.visitList, ...visitData],
      };
    }
    /*
      Delete the Visit by Id
     */
    case DELETE_VISIT: {
      const {visitId} = action.payload;
      const filteredVisits = state.visitList.filter(
        (visit, index, visits) => visit.id != visitId,
      );
      return {
        ...state,
        visitList: [...filteredVisits],
      };
    }
    default:
      return state;
  }
}

/*

{
      id:new Date().getTime(),
      hospitalName: 'Anand Hospital',
      doctorName: 'Anand',
      dateOfVisit: new Date().getTime(),
      medication: [
        {
          id: new Date().getTime(),
          name: 'Pendits',
          dosage: '1 Tablet at night',
        },
        {
          id: new Date().getTime(),
          name: 'Voveran',
          dosage: '1 Tablet at morning and 1 at night',
        },
      ],
      doctorStatement: 'Take Medication',
      reason: 'Back pain',
    },
 */
