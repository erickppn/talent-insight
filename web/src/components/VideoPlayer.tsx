import { Media, Video } from "@vidstack/player-react";

export function VideoPlayer({ url, thumbnail }: { url: string, thumbnail: string }) {
  return (
    <Media className="w-full h-full aspect-video">
      <Video className="w-full h-full" controls poster={thumbnail}>
        <video controls className="w-full h-full" src={url} preload="none" data-video="0" />
      </Video>
    </Media>
  )
}