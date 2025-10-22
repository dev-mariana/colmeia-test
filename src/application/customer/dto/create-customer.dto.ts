export class CreateCustomerRequest {
  name: string;
  email: string;
  document: string;
  phone?: string;
}

export class CreateCustomerResponse {
  id: string;
  name: string;
  email: string;
  document: string;
  phone: string | undefined;
  created_at: Date;
  updated_at: Date | null;
}
