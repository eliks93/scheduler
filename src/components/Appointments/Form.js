import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [error, setError] = useState("");
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  function validate() {
    // handles the validation of leaving a student name blank
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.save(name, interviewer && interviewer.id);
  }
  const reset = () => {
    // resets form when called
    setName("");
    setInterviewer(null);
  };
  const cancel = () => {
    // cancel function, happens when cancel button is clicked when editing an interview form
    reset();
    props.onCancel();
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            onChange={event => setName(event.target.value)}
            value={name}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => {
              validate();
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
