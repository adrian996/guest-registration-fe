import Company from "../models/Company";
import Event from "../models/Event";
import Person from "../models/Person";

const BASE_URL = 'http://localhost:8080/api';

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
    console.error('Error fetching by id:', error);
    throw error;
  }
}

export async function getParticipantsByEventId(eventId: number): Promise<Person[] | Company[]> {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}/participants`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch event participants. Status: ${response.status}`);
    }

    const participants: Person[] | Company[] = await response.json();
    return participants;
  } catch (error) {
    console.error('Error getting event participants:', error);
    throw error;
  }
}

export async function getFutureEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${BASE_URL}/events/future`);
    if (!response.ok) {
      throw new Error(`Failed to fetch future events. Status: ${response.status}`);
    }

    const futureEvents: Event[] = await response.json();
    return futureEvents;
  } catch (error) {
    console.error('Error getting future events:', error);
    throw error;
  }
}

export async function getPastEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${BASE_URL}/events/past`);
    if (!response.ok) {
      throw new Error(`Failed to fetch past events. Status: ${response.status}`);
    }

    const pastEvents: Event[] = await response.json();
    return pastEvents;
  } catch (error) {
    console.error('Error getting past events:', error);
    throw error;
  }
}

export async function deleteEvent(eventId: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete event. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export async function createEvent(newEvent: Event) {
  try {
    const response = await fetch(`${BASE_URL}/events/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    console.error('Error:', error);
    throw error;
  }
}
  