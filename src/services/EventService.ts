import Event from "../models/Event";

const BASE_URL = 'http://localhost:8080/api';

export async function getFutureEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${BASE_URL}/events/future`);
    if (!response.ok) {
      throw new Error(`Failed to fetch future events. Status: ${response.status}`);
    }

    const futureEvents: Event[] = await response.json();
    console.log(futureEvents);
    return futureEvents;
  } catch (error) {
    throw new Error(`Error fetching future events: ${error.message}`);
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
    throw new Error(`Error fetching past events: ${error.message}`);
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
    throw new Error(`Error deleting event: ${error.message}`);
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
      const errorData = await response.json();
      throw new Error(`Failed to create event: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
  