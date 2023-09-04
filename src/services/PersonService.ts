import Person from "../models/Person";

const BASE_URL = 'http://localhost:8080/api';

export async function getPersons(): Promise<Person[]> {
  try {
    const response = await fetch(`${BASE_URL}/persons`);
    if (!response.ok) {
      throw new Error(`Failed to fetch persons. Status: ${response.status}`);
    }
    const persons: Person[] = await response.json();
    console.log(persons);
    return persons;
  } catch (error) {
    console.error('Error getting future events:', error);
    throw error;
  }
}

export async function addParticipant(newPerson: Person) {
  try {
    console.log("adding person");
    console.log(newPerson);
    // const response = await fetch(`${BASE_URL}/events/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newEvent),
    // });

    // if (response.ok) {
    //   const data = await response.json();
    //   return data;
    // } else {
    //   const error = await response.json();
    //   throw new Error(`Failed to create event: ${error.message}`);
    // }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}