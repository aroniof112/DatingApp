export interface AppointmentForAddingDto {
    pacientUsername: string;
    doctorUsername: string;
    appointmentTime: Date;
    location: string;
    specialization: string;
    pacientId: number;
    doctorId: number;
}