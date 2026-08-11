"use client";

import { MediaContent } from "@/components/MediaContent";
import type { MediaContent as MediaContentType } from "@/sections/types";

type Props = {
  title?: string;
  text?: string;
  media?: MediaContentType[];
};

export function ContentStepView({ title, text, media }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {title && <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>}
      {text && (
        <p className="whitespace-pre-line text-sm text-zinc-600">{text}</p>
      )}
      {media && media.length > 0 && <MediaContent media={media} />}
    </div>
  );
}
