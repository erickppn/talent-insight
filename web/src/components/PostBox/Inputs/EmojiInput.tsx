import * as Popover from '@radix-ui/react-popover';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';

import { SmileySticker } from 'phosphor-react';

interface EmojiInputProps {
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
}

export function EmojiInput({ onEmojiClick }: EmojiInputProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className="flex items-center px-2 rounded-md hover:bg-zinc-100">
        <SmileySticker color="gray" size={24} />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content sideOffset={18}>
          <Popover.Arrow height={12} width={20} className="fill-white"/>

          <div className="shadow-md">
            <EmojiPicker height={320}  emojiStyle={EmojiStyle.TWITTER} onEmojiClick={onEmojiClick} searchDisabled/>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}