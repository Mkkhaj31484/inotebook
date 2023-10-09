import React from 'react';
const Alert = (props)=>{
  const {alert} = props;
  let word = alert.type;
  if(word === "danger"){
    word = "Error"
  }

  const capitalize =()=>{
   let lower = word.toLowerCase();
   return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
    return(
        <div className={`alert alert-${props.alert.type}`} role="alert">
        {capitalize(alert.type)}:{alert.message}
        <i className="fa-sharp fa-solid fa-circle-exclamation mx-2"></i>
      </div>
    )
}
export default Alert;