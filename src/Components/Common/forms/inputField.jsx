
import classnames from "classnames";
import { asField } from "informed";
import React, { Fragment } from "react";
import "./inputField.css";

export const TextInput = asField(
  ({ fieldState, fieldApi, faClass, ...props }) => {
    const { value } = fieldState;
    const { setValue, setTouched } = fieldApi;
    const {
      field,
      onChange,
      onBlur,
      initialValue,
      icon,
      forwardedRef,
      className,
      content,
      ...rest
    } = props;
    return (
      <Fragment>
        <div className = "inputFieldmasterStyle">
        <div className="form-group">
          {faClass && <i className={faClass}></i>}
          {props.label && (
            <label htmlFor={field} className="label">
              {props.label}
              {props.required && <i style={{ color: "red" }}>*</i>}
            </label>
          )}
          <div className="typeinput">
            <span className="icontext">{icon && icon}</span>
            <input
              {...rest}
              id={field}
              ref={forwardedRef}
              required={false}
              value={!value && value !== 0 ? "" : value}
             className="textinputstyle"
             
              className={classnames(`form-control ${className}`, {
                             "is-invalid": fieldState.error,
                           })}
              onChange={(e) => {
                setValue(e.target.value);
                if (onChange) {
                  onChange(e);
                }
              }}k
              onBlur={(e) => {
                setTouched(true);
                if (onBlur) {
                  onBlur(e);
                }
              }}
            />
          </div>

          {props.helper && (
            <small className="form-text text-muted">{content}</small>
          )}
          {fieldState.error ? (
            <div className="invalid-field">{fieldState.error}</div>
          ) : (
            <div className="valid-field"></div>
          )}
        </div>
        </div>
      </Fragment>
    );
  }
);

