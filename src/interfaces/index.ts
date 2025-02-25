// Objective: Define interfaces for the application

// Interface for the user data
export interface INewUser {
  userData: {
    email: string;
    password: string;
  };
  profileData: {
    first_name: string;
    last_name: string;
    avatar?: string;
    bio?: string;
  };
}
