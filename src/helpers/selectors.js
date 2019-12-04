// import { statSync } from "fs";

// const state = {
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   },
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }
// };

export function getAppointmentsForDay(state, day) {
  let days = state.days;
  let appointments = state.appointments;
  let appArray;
  let finalArray = []
  for(const item of days) {
    if(item.name === day) {
      appArray = item.appointments
    }
  }
  if(appArray) {
    for(const key of appArray) {
      finalArray.push(appointments[key])
    }
  }
 return finalArray;
}


export function getInterview(state, interview) {
  let answer = {}
  if(interview) {
  let inter = interview.interviewer
  answer.student = interview.student
  answer.interviewer = state.interviewers[inter]
  } else {
    return null
  }
  return answer
}


export function getInterviewersForDay(state, day) {
  let days = state.days;
  let interviewers = state.interviewers;
  let appArray;
  let finalArray = []
  for(const item of days) {
    if(item.name === day) {
      appArray = item.interviewers
    }
  }
  if(appArray) {
    for(const key of appArray) {
      finalArray.push(interviewers[key])
    }
  }
 return finalArray;
}

