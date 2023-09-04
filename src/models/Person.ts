import { PaymentMethod } from "../enums/PaymentMethod";

interface Person {
    id?: number;
    eventId?: number
    firstName: string,
    lastName: string,
    idCode: string,
    paymentMethod: PaymentMethod,
    additionalInformation: string
    type: string
}

export default Person;