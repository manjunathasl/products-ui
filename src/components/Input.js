export default function Input(props) {
  return (
    <div>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.state[props.name]}
        onChange={props.changeHandler}
        className={props.errors?.confirmPassword ? "error" : ""}
        disabled={props.disabled}
      />
      {props.errors[props.name] && (
        <span className="error-text">{props.errors[props.name]}</span>
      )}
    </div>
  );
}
