import { UserProfilesRepository } from "../../../repositories/user-profiles-repositories";
import { validateToken } from "../../../utils/validate-token";

interface EditUserProfileUseCaseRequest {
  authToken: string | undefined,
  artName: string | null,
  aboutMe: string | null,
}

export class EditUserProfileUseCase {
  constructor(
    private userProfileRepository: UserProfilesRepository
  ) {}
  
  async execute(request: EditUserProfileUseCaseRequest) {
    const { authToken, artName, aboutMe } = request;

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    //save new info profile
    const newUserProfileInfo = await this.userProfileRepository.editProfile(userId, artName, aboutMe);
    
    return newUserProfileInfo;
  }
}