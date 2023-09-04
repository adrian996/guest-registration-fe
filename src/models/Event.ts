import Company from "./Company";
import Person from "./Person";

interface Event {
    id?: number;
    name: string;
    date: Date;
    venue: string;
    additional_information?: string;
    participants: (Person[] | Company[]);
}
  
  export default Event;