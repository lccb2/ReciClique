
export interface Comment {
  id: number;
  userPhoto: string;
  userName: string;
  dateTime: string;
  text: string;
  liked: boolean;
  disliked: boolean;
  likes: number;
  dislikes: number;
}
