import { ParticipantType } from "../enums/ParticipantType";

export function stringToParticipantTypeEnum(value: string): ParticipantType | undefined {
  switch (value) {
    case "PERSON":
      return ParticipantType.PERSON;
    case "COMPANY":
      return ParticipantType.COMPANY;
    default:
      return undefined;
  }
}