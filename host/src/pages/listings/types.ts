export interface UserListing {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    status: "pending" | "approved" | "declined";
    startDate: string;
  }
  