import React from "react";
import FormErrorsIndex from "./form_error_index";

const FormErrors = ({errors}) => {
  const errorClass = errors.length ? "form-errors" : "hidden";
  return (
    <section className={errorClass}>
      <h1>Sorry, there was a problem.</h1>
      <ul>
        {errors.map((error, idx) => {
          return <FormErrorsIndex key={idx} error={error} />;
        })}
      </ul>
    </section>
  );
};

export default FormErrors;
