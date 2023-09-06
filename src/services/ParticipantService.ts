import { ParticipantType } from "./../enums/ParticipantType";
import Person from "../models/Person";
import Company from "../models/Company";

const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;
const BASE_URL = `http://${API_HOST}:${API_PORT}/api`;

export async function fetchParticipantById(
  participantId: number,
  participantType: ParticipantType
) {
  let apiUrl = BASE_URL;
  if (participantType === ParticipantType.PERSON) {
    apiUrl = apiUrl.concat(`/persons`);
  } else if (participantType === ParticipantType.COMPANY) {
    apiUrl = apiUrl.concat(`/companies`);
  }
  try {
    const response = await fetch(`${apiUrl}/${participantId}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch participant. Status: ${response.status}`
      );
    }
    const participant: Person | Company = await response.json();
    return participant;
  } catch (error) {
    console.error("Error getting participant:", error);
    throw error;
  }
}

export async function updateParticipant(
  participantId: number,
  updatedParticipant: Person | Company,
  participantType: ParticipantType
) {
  let apiUrl = BASE_URL;

  if (participantType === ParticipantType.PERSON) {
    apiUrl = apiUrl.concat(`/persons`);
  } else if (participantType === ParticipantType.COMPANY) {
    apiUrl = apiUrl.concat(`/companies`);
  }
  try {
    const response = await fetch(`${apiUrl}/${participantId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedParticipant),
    });

    if (!response.ok) {
      throw new Error(`Failed to edit participant. Status: ${response.status}`);
    }

    const editedParticipant: Person | Company = await response.json();
    return editedParticipant;
  } catch (error) {
    console.error("Error editing participant:", error);
    throw error;
  }
}
