import { ParticipantType } from "../enums/ParticipantType";

export function stringToParticipantTypeEnum(
  value: string
): ParticipantType | undefined {
  switch (value) {
    case "PERSON":
      return ParticipantType.PERSON;
    case "COMPANY":
      return ParticipantType.COMPANY;
    default:
      return undefined;
  }
}

export function validateEstonianIdCode(idCode: string) {
  console.log("id koord" + idCode);

  if (idCode.length !== 11) {
    return false;
  }

  let century = 0;

  // Check century
  switch (idCode.charAt(0)) {
    case "1":
    case "2":
      century = 1800;
      break;
    case "3":
    case "4":
      century = 1900;
      break;
    case "5":
    case "6":
      century = 2000;
      break;
    default:
      return false;
  }

  // Check if the birthday is a valid date
  const year = century + parseInt(idCode.substr(1, 2));
  const month = idCode.substr(3, 2);
  const day = idCode.substr(5, 2);

  // Get birthdate. Comment out if not needed
  const bd = new Date(year, parseInt(month) - 1, parseInt(day));

  if (
    bd.getMonth() + 1 !== parseInt(month) ||
    bd.getDate() !== parseInt(day) ||
    bd.getFullYear() !== year
  ) {
    return false;
  }

  // Calculate the checksum
  let sum = parseInt(idCode.charAt(9));

  for (let i = 0; i <= 8; i++) {
    sum += parseInt(idCode.charAt(i)) * (i + 1);
  }

  let check = sum % 11;

  // Special case, recalculate the checksum
  if (check === 10) {
    sum = 0;

    for (let i = 0; i <= 6; i++) {
      sum += parseInt(idCode.charAt(i)) * (i + 3);
    }

    for (let i = 7; i <= 9; i++) {
      sum += parseInt(idCode.charAt(i)) * (i - 6);
    }

    check = sum % 11;
    check = check % 10;
  }

  if (check !== parseInt(idCode.charAt(10))) {
    return false;
  }
  return true;
}
