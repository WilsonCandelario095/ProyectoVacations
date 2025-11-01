import type { BookingStatus } from "@prisma/client";

export interface AddBookingDTO {
    status : BookingStatus;
}

