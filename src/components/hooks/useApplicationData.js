import React,{ useEffect, useState, useReducer } from "react";
import axios from 'axios'
import { stat } from "fs";
import { getInterviewsForDay, getInterview } from "helpers/selectors";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../../reducers/application";

export default function useApplicationData() {
  
  const [state, dispatch] = useReducer(reducer, 
    { 
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')), 
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
      ]).then((all) => {
      dispatch({type: SET_APPLICATION_DATA, value:{
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data}
      })
    });
  }, []);
  
   
  return { 
    state,
    setDay: day => dispatch({type: SET_DAY, value:{ day }}),
    deleteInterview: (id) => {
    let days = [...state.days]
    let day = state.days.filter(day => day.appointments.includes(id))[0]
    day.spots++
    days[day.id-1] = day
    
   
    
      return axios.delete('http://localhost:8001/api/appointments/'+id)
      .then(res => {
        if(res.status === 204) {
        
        dispatch({type: SET_INTERVIEW, value: { days, interview: null}})
        }
      })
      .catch(error => {
        return error
      })
    },
     bookInterview(id, interview) {
      let days = [...state.days]
      let day = state.days.filter(day => day.appointments.includes(id))[0]
      
      console.log(state.appointments[id].interview)
      if(!state.appointments[id].interview) {
        day.spots--
      }
      
      days[day.id-1] = day
      
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios.put('http://localhost:8001/api/appointments/'+id, appointment)
      .then(res => {
        if(res.status === 204) {
          dispatch({type: SET_INTERVIEW, value: { days, appointments}})
        }
        // return true
      })
      .catch(error => {
        return error
      })
      
    }

    }
}