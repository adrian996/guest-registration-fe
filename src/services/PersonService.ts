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
      throw new Error(`Error fetching future events: ${error.message}`);
    }
  }