import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatText, PaperPlaneRight } from "phosphor-react";

import { useApi } from "../hooks/useApi";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { ModalContext } from "../contexts/Modal/ModalContext";
import { Loading } from "./Loading";
import { Comment } from "./Comment";

import { comment } from "../types/Comment";

export function Comments() {
  const [comments, setComments] = useState<comment[]>([]);

  const [comment, setComent] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);

  const { user } = useContext(AuthContext);
  const { openLogin } = useContext(ModalContext);
  const { id } = useParams();
  const api = useApi();

  async function handleSendComment(e: FormEvent) {
    e.preventDefault();

    if (!user) {
      return openLogin();
    }

    setIsSendingComment(true);

    const response = await api.sendComment(id, comment);

    if (response.error) console.log(response.message);

    setIsSendingComment(false);
    setComent("");

    setComments([response, ...comments]);
  }

  useEffect(() => {
    async function getComments() {
      const comments = await api.getComments(id);
      setComments(comments);
    }

    getComments();
  }, [id]);

  return (
    <div className="w-full">
      <header>
        <h3 className="text-2xl font-bold">
          Comentários
        </h3>

        <form
          className="flex justify-between items-center mt-3 border-b-2 border-rose-400" 
          onSubmit={handleSendComment}
        >
          <input 
            className="w-full p-2 bg-transparent" 
            type="text" 
            value={comment}
            placeholder="Diga o que achou"
            onChange={e => setComent(e.target.value)}
          />

          <button 
            className="mx-2 text-rose-400 opacity-100 transition-opacity disabled:opacity-50"
            type="submit"
            disabled={!comment.length}
          >
            {
              isSendingComment ? (
                <Loading />
              ) : (
                <PaperPlaneRight className="animate-x-bounce" size={26} />
              )
            }
          </button>
        </form>
      </header>

      <main className="mt-10">
        {
          comments.length > 0 ? (
            <div className="flex flex-col gap-8">
              {
                comments.map(comment => {
                  return (
                    <Comment 
                      key={comment.id} 
                      id={comment.id}
                      avatarUrl={comment.user.profile.avatarUrl} 
                      name={comment.user.profile.artName || comment.user.name} 
                      postedAt={comment.postedAt}
                      content={comment.content} 
                      userId={comment.userId} 
                      comments={comments}
                      setComments={setComments}
                    />
                  )
                })
              }
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center w-full mt-12 text-zinc-700 animate-pulse">
              <ChatText size={52} />

              <span>Seja o primeiro a comentar neste post</span>
            </div>
          )
        }
      </main>
    </div>
  )
}