"use client";

import type { MediaContent as MediaContentType } from "@/sections/types";

const PLACEHOLDER_LABELS: Record<MediaContentType["type"], string> = {
  image: "Gambar belum tersedia",
  video: "Video belum tersedia",
  embed: "Embed belum tersedia",
};

export function MediaContent({ media }: { media?: MediaContentType[] }) {
  const items = media ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <MediaItem key={index} media={item} />
      ))}
    </div>
  );
}

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-3xl border-2 border-dashed border-navy/25 bg-sky-2">
      <p className="text-sm text-navy/50">{label}</p>
    </div>
  );
}

function MediaItem({ media }: { media: MediaContentType }) {
  return (
    <figure className="flex flex-col gap-1">
      {renderMedia(media)}
      {media.caption && (
        <figcaption className="text-sm text-navy/70">
          {media.caption}
        </figcaption>
      )}
      {media.source && (
        <p className="text-xs text-navy/50">Sumber: {media.source}</p>
      )}
    </figure>
  );
}

function renderMedia(media: MediaContentType) {
  if (!media.src) {
    return <MediaPlaceholder label={PLACEHOLDER_LABELS[media.type]} />;
  }

  switch (media.type) {
    case "video":
      return <video src={media.src} controls className="w-full rounded-3xl" />;
    case "embed":
      return (
        <iframe
          src={media.src}
          title={media.alt ?? "Embed"}
          className="aspect-video w-full rounded-3xl"
          allowFullScreen
        />
      );
    case "image":
    default:
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.src} alt={media.alt ?? ""} className="w-full rounded-3xl" />
      );
  }
}
