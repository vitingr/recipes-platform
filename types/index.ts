export interface GoogleAuth {
  clientId: string;
  clientSecret: string;
}

export interface UserContextProps {
  data: object;
  setData: React.Dispatch<React.SetStateAction<Object>>;
  getInfo: () => Promise<void>;
}

export interface UserProps {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  partner: boolean;
  photo: string;
  bio: string;
  recipesCreated: string[];
  recipesLiked: string[];
  driverRecipeCreate: boolean;
  driverProfile: boolean;
}

export interface RecipeProps {
  id: string;
  title: string;
  description: string;
  photo: string;
  qtdLikes: number;
  creatorId: string;
  content: string;
  type: string;
}

export interface UploadProps {
  setState: (value: string) => void;
  currentFoto: string;
  text?: string;
}