export function validate(config) {
  const errors = [];
  console.log(config);
  //checks that str is valid JSON

  // const configObject = JSON.parse(str);
  // configObject.notes = configObject.notes
  //   //removes square brackets
  //   .replace(/[\[\]']+/g, "")
  //   //removes whitespace
  //   .replace(/ /g, "")
  //   .split(",")
  //   //removes empty strings
  //   .filter((item) => item !== "");
  errors.push(...validateNotes(config.notes));
  errors.push(validateNumber("octaveLow", config.octaveLow, 1, 8));
  errors.push(validateNumber("octaveHigh", config.octaveHigh, 1, 8));
  errors.push(validateNumber("speedSlow", config.speedSlow, 50, 2000));
  errors.push(validateNumber("speedFast", config.speedFast, 50, 2000));

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
