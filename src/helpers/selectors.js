// function select appointments for day given a state and the day
export function getAppointmentsForDay(state, day) {
  let days = state.days;
  let appointments = state.appointments;
  let appArray;
  let finalArray = [];
  for (const item of days) {
    if (item.name === day) {
      appArray = item.appointments;
    }
  }
  if (appArray) {
    for (const key of appArray) {
      finalArray.push(appointments[key]);
    }
  }
  return finalArray;
}

// function gets a specific interview data given the state and the interview
export function getInterview(state, interview) {
  let answer = {};
  if (interview) {
    let inter = interview.interviewer;
    answer.student = interview.student;
    answer.interviewer = state.interviewers[inter];
  } else {
    return null;
  }
  return answer;
}

export function getInterviewersForDay(state, day) {
  // function gets the interviewers that are working on a given day
  let days = state.days;
  let interviewers = state.interviewers;
  let appArray;
  let finalArray = [];
  for (const item of days) {
    if (item.name === day) {
      appArray = item.interviewers;
    }
  }
  if (appArray) {
    for (const key of appArray) {
      finalArray.push(interviewers[key]);
    }
  }
  return finalArray;
}
