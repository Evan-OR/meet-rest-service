export type User = {
  id: number;
  email: string;
  name: string | null;
  date_of_birth: string | null;
  description: string | null;
  job: string | null;
  gender_id: number | null;
  created_at: string;
  updated_at: string;
};

export type Gender = 'Male' | 'Female' | 'Non-binary' | ' Other';

export type InterestedInGender = Gender | 'All';

export type ProfileData = {
  displayName?: string;
  description?: string;
  job?: string;
  dateOfBirth?: string;
  gender?: Gender;
  insterestedIn?: InterestedInGender;
};
