import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => {
          return (
            <InterviewerListItem
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer === props.value}
              setInterviewer={event => props.onChange(interviewer)}
            />
          );
        })}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  setInterviewer: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
