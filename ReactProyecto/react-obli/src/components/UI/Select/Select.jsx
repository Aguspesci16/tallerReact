const Select = ({ options, disabled, ref, onChange }) => {
  const handleChange = (event) => {
    if (onChange) {
      onchange(event);
    }
  };

  return (
    <select
      className="form-control"
      disabled={disabled}
      ref={ref}
      onchange={handleChange}
    >
      <option selected value="0">
        Seleccione una opción
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nombre}
        </option>
      ))}
    </select>
  );
};

Select.defaultProps = {
  options: [],
};

export default Select;
