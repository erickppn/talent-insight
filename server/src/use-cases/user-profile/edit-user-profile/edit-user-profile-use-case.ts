import path from "path";
import { unlink } from "fs/promises";

import { UserProfilesRepository } from "../../../repositories/user-profiles-repositories";
import { validateToken } from "../../../utils/validate-token";

interface EditUserProfileUseCaseRequest {
  authToken: string | undefined,
  artName: string | null,
  aboutMe: string | null,
  avatarKey: string | undefined
}

export class EditUserProfileUseCase {
  constructor(
    private userProfileRepository: UserProfilesRepository
  ) {}
  
  async execute(request: EditUserProfileUseCaseRequest) {
    const { authToken, artName, aboutMe, avatarKey } = request;

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    //delete current avatar
    const currentProfileInfo = await this.userProfileRepository.findProfileByUserId(userId);

    //save new info profile
    const newAvatarKey = avatarKey || currentProfileInfo?.avatarKey!;

    const avatarUrl = `${process.env.APP_URL}/files/${newAvatarKey}`;

    const newUserProfileInfo = await this.userProfileRepository.editProfile(userId, artName, aboutMe, newAvatarKey, avatarUrl);

    //remove old avatar
    if (currentProfileInfo?.avatarKey && newAvatarKey != currentProfileInfo?.avatarKey) {
      await unlink(path.resolve(__dirname, "../../../../tmp/uploads", currentProfileInfo?.avatarKey));
    }

    return newUserProfileInfo;
  }
}