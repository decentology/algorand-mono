function Field(props) {
  return (
    <div className="field has-addons">
      <div className="control">
        <button className="button is-static is-small">
          {props.title}
        </button>
      </div>
      <div className="control">
        <input
          className="input is-small"
          type="text"
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export {Field};