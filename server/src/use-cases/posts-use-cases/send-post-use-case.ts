import { PostsRepository } from "../../repositories/posts-repositories";
import { UsersRepository } from "../../repositories/users-repositories";
import { validateToken } from "../../utils/validate-token";

interface SendPostUseCaseRequest {
  authToken: string | undefined,
  title: string,
  description: string | null,
  thumbnailKey: string | null,
  attachments: Express.Multer.File[]
}

export class SendPostUseCase {
  constructor(
    private userRepository: UsersRepository,
    private postRepository: PostsRepository,
  ) {}

  async execute(request: SendPostUseCaseRequest) {
    const { authToken, title, description, thumbnailKey, attachments } = request;

    //validations
    if (!authToken) throw new Error("Token de autenticação não fornecido");

    //verify token validity
    const userId = validateToken(authToken);
    if (!userId) throw new Error("Não foi possível validar o token");

    //get user infos
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new Error("Não foi possível buscar as informações do usuário");

    //create thumbnail url
    const thumbnailUrl = thumbnailKey ? `${process.env.APP_URL}/files/${thumbnailKey}` : null;
    
    //create attachments list with key and url info
    const attachmentsList = attachments !== undefined ? Object.values(attachments) : [];

    const attachmentsInfo = attachmentsList.map((attachment) => ({
      attachmentKey: attachment.filename,
      attachmentUrl: `${process.env.APP_URL}/files/${attachment.filename}`
    }));

    const post = await this.postRepository.sendPost(
      userId,
      title,
      description,
      thumbnailKey,
      thumbnailUrl,
      attachmentsInfo
    );

    return post;
  }
}