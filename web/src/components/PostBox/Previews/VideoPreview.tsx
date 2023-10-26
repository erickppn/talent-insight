import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';

import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';

import { TrashSimple } from "phosphor-react";

interface VideoPreviewProps {
  onRemove: (index: number) => void;
  url: string;
  // thumbnail: File | null;
}

export function VideoPreview({ onRemove, url }: VideoPreviewProps) {  
  return (
    <MediaPlayer
      src={url}
      aspectRatio={16 / 9}
    >
      <MediaOutlet className="relative">
        <button
          type="button"
          className="absolute z-50 top-3 left-3 p-1 rounded-md opacity-80 bg-rose-700 text-white hover:opacity-50 transition-opacity"
          onClick={() => onRemove(0)}
        >
          <TrashSimple size={24} weight="bold" />
        </button>
      </MediaOutlet>
      <MediaCommunitySkin />
    </MediaPlayer>
  )
}
