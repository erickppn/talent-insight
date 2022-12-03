type UserProfileResponse = {
  id: string,
  artName: string | null,
  aboutMe: string | null,
  avatarKey: string | null,
  avatarUrl: string | null,
  bannerKey: string | null,
  bannerUrl: string | null,

  categories: 
    { category: { name: string } }[]
}

export interface UserProfilesRepository {
  findProfileByUserId: (userId: string) => Promise<UserProfileResponse | null>;
  deleteProfileByUserId: (userId: string) => Promise<void>;
  deleteAllProfileCategories: (profileId: string) => Promise<void>;
  editProfile: (userId: string, artName: string | null, aboutMe: string | null, avatarKey: string, avatarUrl: string, bannerKey: string, bannerUrl: string, categoriesList: string[]) => Promise<UserProfileResponse>;
}