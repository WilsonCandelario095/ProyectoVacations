import type { BookingStatus } from "@prisma/client";

export interface AddBooking {
    status : BookingStatus;
}

