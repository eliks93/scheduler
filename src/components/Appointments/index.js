import "components/Appointments/styles.scss"
import React from "react";
import Header from 'components/Appointments/Header'
import Show from 'components/Appointments/Show'
import Empty from 'components/Appointments/Empty'
import useVisualMode from '../hooks/useVisualMode'
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "components/Appointments/Error"


export default function Apointment(props) {
  function del() {
    transition(DELETING, true)
    props.deleteInterview(props.id)
    .then((error) => {
      if(!error) {
      transition(EMPTY)
      } else {
        transition(ERROR_DELETE, true)
      }
    })
  }
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
      
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    
    .then((error) => { 
      if(!error) {
      transition(SHOW)
      } else {
        transition(ERROR_SAVE, true)
      }
    })
    
  
  }
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const EDIT = "EDIT"
  const CONFIRM = "CONFIRM"
  const DELETING = "DELETING"
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
 
  return (<article data-testid="appointment" className="appointment">
    <Header time={props.time}/>
    {mode === ERROR_SAVE && <Error message="Could Not Save Appointmnent" onClose={()=> back()}/>}
    {mode === ERROR_DELETE && <Error message ="Could Not Delete Appointment" onClose={()=> back()}/>}
    {mode === EDIT && <Form onCancel={()=> back()} save={save} name={props.interview.student} interviewer={props.interview.interviewer} interviewers={props.interviewers} />}
    {mode === CONFIRM && (<Confirm onCancel={()=> back()} onConfirm={()=> del()}/>)}
    {mode === DELETING && (<Status message="Deleting"/>)}
    {mode === SAVING && (<Status message="Saving" />)}
    {mode === CREATE && (<Form save={save} interviewers={props.interviewers} onCancel={()=> back()} />)} 
    {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
    {mode === SHOW && (
    <Show
      onEdit={()=> transition(EDIT)}
      onDelete={()=>transition(CONFIRM)}
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    />
)}
  </article>)
}