import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../../reducers/application";

// Drives most of the actual functionality of the app

export default function useApplicationData() {
  // brings in our reducer and initial our state
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers"))
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, []);

  return {
    state,
    // sets the current day state to whatever day is seleceted (Initally monday)
    setDay: day => dispatch({ type: SET_DAY, value: { day } }),
    // Delete Interview function. Takes the id of the interview to be deleted and makes request based on that id.
    deleteInterview: id => {
      return axios
        .delete("http://localhost:8001/api/appointments/" + id)
        .then(res => {
          if (res.status === 204) {
            // handles the number of spots displayed for the day, when deleted spots goes up by one, only fires if a 204 is recieved
            let days = [...state.days];
            let day = state.days.filter(day =>
              day.appointments.includes(id)
            )[0];
            day.spots++;
            days[day.id - 1] = day;
            let value = { ...state.appointments };
            value[id].interview = null;
            dispatch({
              type: SET_INTERVIEW,
              value: { days, appointments: value }
            });
          }
        })
        .catch(error => {
          return error;
        });
    },
    bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios
        .put("http://localhost:8001/api/appointments/" + id, appointment)
        .then(res => {
          // handels updating of spots as above, only difference is an if statement to check if the interview exists already, if it does it does not change spots
          if (res.status === 204) {
            let days = [...state.days];
            let day = state.days.filter(day =>
              day.appointments.includes(id)
            )[0];
            if (!state.appointments[id].interview) {
              day.spots--;
            }
            days[day.id - 1] = day;
            dispatch({ type: SET_INTERVIEW, value: { days, appointments } });
          }
        })
        .catch(error => {
          return error;
        });
    }
  };
}
