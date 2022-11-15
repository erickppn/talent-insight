type UserProfileResponse = {
  artName: string | null,
  aboutMe: string | null,
  avatarKey: string | null,
  avatarUrl: string | null,
  bannerKey: string | null,
  bannerUrl: string | null,
}

export interface UserProfilesRepository {
  findProfileByUserId: (userId: string) => Promise<UserProfileResponse | null>;
  deleteProfileByUserId: (userId: string) => Promise<void>;
  editProfile: (userId: string, artName: string | null, aboutMe: string | null, avatarKey: string, avatarUrl: string, bannerKey: string, bannerUrl: string) => Promise<UserProfileResponse>;
}