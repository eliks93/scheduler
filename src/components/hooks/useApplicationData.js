import React,{ useEffect, useState } from "react";
import axios from 'axios'

export default function useApplicationData() {
  const [state, setState] = useState(
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
      setState({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
    });
  }, []);
  
  return { 
    state,
    setDay: day => setState({ ...state, day }),
    deleteInterview: (id) => {
      return axios.delete('http://localhost:8001/api/appointments/'+id)
      .then(res => {
        if(res.status === 204) {
        setState({...state, interview: null})
        }
      })
      .catch(error => {
        return error
      })
    },
    bookInterview: (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      console.log(appointment)
      return axios.put('http://localhost:8001/api/appointments/'+id, appointment)
      .then(res => {
        if(res.status === 204) {
          setState({...state, appointments})
        }
      })
      .catch(error => {
        return error
      })
      
    }

    }
}