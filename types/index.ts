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
  ingredients: string[];
  methods: string[];
  photo: string;
  likes: string[];
  qtdLikes: number;
  creatorId: string;
  creatorName: string;
  creatorPhoto: string;
  type: string;
}

export interface UploadProps {
  setState: (value: any) => void;
  currentFoto: string;
  text?: string;
}

export interface HolidayProps {
  image: string;
  title: string;
}

export interface CommentProps {
  id: string;
  recipeId: string;
  creatorId: string;
  creatorPhoto: string;
  creatorName: string;
  content: string;
  qtdLikes?: number;
  likes?: string[];
  createdAt: Date;
}

export interface PopupProps {
  children: React.ReactNode;
  title: string;
  state?: any;
  handleSubmit?: () => void;
}
