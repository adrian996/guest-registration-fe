import { ParticipantType } from "../enums/ParticipantType";
import Company from "../models/Company";
import Event from "../models/Event";
import Person from "../models/Person";

const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;
const BASE_URL = `http://${API_HOST}:${API_PORT}/api`;

export async function getEventById(eventId: string): Promise<Event | null> {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      } else {
        throw new Error(`Failed to fetch event. Status: ${response.status}`);
      }
    }

    const event: Event = await response.json();
    return event;
  } catch (error) {
    console.error("Error fetching by id:", error);
    throw error;
  }
}

export async function getParticipantsByEventId(
  eventId: number
): Promise<Person[] | Company[]> {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}/participants`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch event participants. Status: ${response.status}`
      );
    }

    const participants: Person[] | Company[] = await response.json();
    return participants;
  } catch (error) {
    console.error("Error getting event participants:", error);
    throw error;
  }
}

export async function getFutureEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${BASE_URL}/events/future`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch future events. Status: ${response.status}`
      );
    }

    const futureEvents: Event[] = await response.json();
    return futureEvents;
  } catch (error) {
    console.error("Error getting future events:", error);
    throw error;
  }
}

export async function getPastEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${BASE_URL}/events/past`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch past events. Status: ${response.status}`
      );
    }

    const pastEvents: Event[] = await response.json();
    return pastEvents;
  } catch (error) {
    console.error("Error getting past events:", error);
    throw error;
  }
}

export async function deleteEvent(eventId: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete event. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function createEvent(newEvent: Event) {
  try {
    const response = await fetch(`${BASE_URL}/events`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newEvent),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      throw new Error(`Failed to create event: ${error.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function addCompanyParticipant(
  newCompany: Company,
  eventId: number
) {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCompany),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      throw new Error(`Failed to add company participant: ${error.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function addPersonParticipant(newPerson: Person, eventId: number) {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}/person`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      throw new Error(`Failed to add person participant: ${error.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteParticipantFromEvent(
  eventId: number,
  participantId: number,
  participantType: ParticipantType
) {
  const requestBody = {
    eventId: eventId,
    participantId: participantId,
    participantType: participantType,
  };

  try {
    const response = await fetch(`${BASE_URL}/events/participants`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status !== 204) {
      console.error("Failed to delete participant");
    }
  } catch (error) {
    console.error("Error deleting participant:", error);
  }
}
