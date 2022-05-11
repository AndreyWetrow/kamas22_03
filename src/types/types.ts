export type PostType = {
  id: number;
  message: string;
  likeCounts: number;
};

export type PhotosType = {
  littlePhoto: string | null;
  bigPhoto: string | null;
};

export type ProfileType = {
  name: string;
  username: string;
  email: string;
  phone: string;
  photo: PhotosType;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
};
