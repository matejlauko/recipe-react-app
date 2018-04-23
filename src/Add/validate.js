const pattern = /^[a-zA-Z0-9,.\-/:()]+$/;

export default function validate(formVals = []) {
  return formVals.reduce((errors, { label, val }) => {
    if (!pattern.test(val)) return errors.concat([`${label} needs to be filled properly`]);
    return errors;
  }, []);
}
