export class User {
  uid: number;
  user_name?: string;
  user_email: string;
  user_pw: string;
  created_at: Date;
  updated_at: Date;
  refresh_token: string;
  is_expired: boolean;
}