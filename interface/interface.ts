export type NavBarValues = string[];
export type PromoSectionValue = string[];

export interface ContactData {
    validSubmission: {
        firstName: string;
        lastName: string;
        email: string;
        message: string;
    },
    invalidEmail?: {
        firstName: string;
        lastName: string;
        email: string;
        message: string;
    }
}

export interface FrameLetCode {

    firstName: string,
    lastName: string,
    email: string

}

export interface TextBoxData {
    validData: {
        fullName: string,
        email: string,
        currentAddress?: string,
        permanentAddress: string
    },
    unvalidEmailData: {
        fullName: string,
        email: string,
        currentAddress?: string,
        permanentAddress?: string

    }
}

export interface ClientData {
    firstName: string;
    lastName: string;
    email: string;
    gender : string;
    phone : string;
    dateOfBirth : string;
    subject: string;
    hobbies: {
        sports: boolean,
        readings: boolean,
        music: boolean
    },
    currentAddress: string;
    state: string;
    city: string;
}