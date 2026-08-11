export type MediaContent = {
  type: "image" | "video" | "embed";
  src?: string;
  alt?: string;
  caption?: string;
  source?: string;
};

export type SectionStep =
  | {
      kind: "introduction";
      title?: string;
      text?: string;
      media?: MediaContent[];
    }
  | { kind: "content"; title: string; text?: string; media?: MediaContent[] }
  | { kind: "activity"; activityKey: string }
  | { kind: "completion" };

export type SectionConfig = {
  number: number;
  title: string;
  steps: SectionStep[];
};
