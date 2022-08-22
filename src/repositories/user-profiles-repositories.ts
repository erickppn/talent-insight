type UserProfileResponse = {
  artName: string | null,
  aboutMe: string | null,
  avatarImgPath: string | null,
}

export interface UserProfilesRepository {
  findProfileByUserId: (userId: string) => Promise<UserProfileResponse | null>;
  deleteProfileByUserId: (userId: string) => Promise<void>;
  editProfile: (userId: string, artName: string | null, aboutMe: string | null) => Promise<UserProfileResponse>;
}