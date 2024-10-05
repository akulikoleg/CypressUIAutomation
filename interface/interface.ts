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
