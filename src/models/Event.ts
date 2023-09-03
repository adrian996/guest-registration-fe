interface Event {
    id?: number;
    name: string;
    date: Date;
    venue: string;
    additional_information?: string;
  }
  
  export default Event;