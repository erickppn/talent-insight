import { useContext, useEffect, useRef } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

import { AuthContext } from "../../../contexts/Auth/AuthContext";

import { IPostForm } from "..";

interface DescriptionInputProps {
  register: UseFormRegister<IPostForm>;
  watch: UseFormWatch<IPostForm>;
}

export function DescriptionInput({ register, watch }: DescriptionInputProps) {
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, ...rest } = register("description");
  const watchDescription = watch("description");

  const { user, profile } = useContext(AuthContext);

  useEffect(() => {
    if (descriptionRef.current) {
      const mainViewHeight = document.getElementById('main')?.offsetHeight || 0;

      const maxTextAreaHeight = mainViewHeight - 180;

      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = descriptionRef.current.scrollHeight + "px";
      descriptionRef.current.style.maxHeight = maxTextAreaHeight + "px";
    }
  }, [watchDescription]);

  return(
    <textarea
      {...rest}

      className="w-full resize-none px-3 py-2 scrollbar-thumb-red-400 hover:scrollbar-thumb-red-300 active:scrollbar-thumb-red-500 scrollbar-track-transparent scrollbar-thin bg-zinc-100 rounded-md font-medium text-blue-950 leading-relaxed"
      rows={1}
      name="description"
      placeholder={`What's new, ${profile?.artName || user?.name}?`}

      ref={(e) => {
        ref(e);
        descriptionRef.current = e
      }}
    />
  )
}