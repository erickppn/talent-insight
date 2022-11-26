import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import { Trash } from "phosphor-react";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import defaultAvatar from "../assets/default-avatar.png";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useApi } from "../hooks/useApi";
import { comment } from "../types/Comment";

interface CommentProps {
  id: string,
  avatarUrl: string | null,
  name: string,
  postedAt: string,
  content: string,
  userId: string,
  comments: comment[],
  setComments: (comments: comment[]) => void,
}

export function Comment({ id, name, postedAt, avatarUrl, content, userId, comments, setComments }: CommentProps) {
  const { user } = useContext(AuthContext);
  const { id: postId } = useParams();
  const api = useApi();

  const date = new Date(postedAt);

  const dateFormatted = format(date, "- d' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  });

  async function handleRemoveComment() {
    const response = await api.deleteComment(postId, id);

    if (response.error === true) return console.log(response.message);

    const newCommentsList = comments.filter(comment => comment.id !== id);

    setComments(newCommentsList);
  }

  return (
    <div 
      className="flex justify-between"
    >
      <div className="flex gap-4">
        <img 
          className="h-12 w-12 mt-1 rounded-md object-cover"
          src={avatarUrl || defaultAvatar} 
        />

        <div className="leading-relaxed">
          <span className="flex items-center font-bold text-lg">
            {name}
            
            <small className="ml-1 text-xs text-zinc-500">
              {dateFormatted}
            </small>
          </span>

          <p className="text-gray-900 text-sm block">
            {content}
          </p>
        </div>
      </div>

      {
        userId === user?.id && (
          <button
            onClick={handleRemoveComment}
            className="flex justify-center items-center w-8 h-8 text-rose-600 rounded-md transition-colors hover:bg-zinc-200 active:bg-zinc-300"
          >
            <Trash size={22} weight="bold" />
          </button>
        )
      }
    </div>
  )
}