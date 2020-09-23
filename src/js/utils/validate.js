export function validate(str) {
  const errors = [];

  //checks that str is valid JSON
  try {
    const configObject = JSON.parse(str);
    configObject.notes = configObject.notes
      //removes whitespace
      .replace(/ /g, "")
      .split(",")
      //removes empty strings
      .filter((item) => item !== "");
    errors.push(...validateNotes(configObject.notes));
    errors.push(validateNumber("octaveLow", configObject.octaveLow, 1, 8));
    errors.push(validateNumber("octaveHigh", configObject.octaveHigh, 1, 8));
    errors.push(validateNumber("speedSlow", configObject.speedSlow, 50, 2000));
    errors.push(validateNumber("speedFast", configObject.speedFast, 50, 2000));
  } catch (err) {
    errors.push(err.message);
  }

  return errors.filter((error) => error !== undefined);
}

function validateNotes(notes) {
  const noteErrors = [];
  const validNotes = [
    "c",
    "d",
    "e",
    "f",
    "g",
    "a",
    "b",
    "c#",
    "d#",
    "e#",
    "f#",
    "g#",
    "a#",
    "b#",
    "cb",
    "db",
    "eb",
    "fb",
    "gb",
    "ab",
    "bb",
  ];
  notes.forEach((note) => {
    if (!validNotes.includes(note)) {
      noteErrors.push(`${note} is not a valid note name`);
    }
  });
  return noteErrors;
}

function validateNumber(label, num, min, max) {
  if (typeof num !== "number" || num > max || num < min) {
    return `${label} must be a number between ${min} and ${max}`;
  }
  return;
}
