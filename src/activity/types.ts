import type { MediaContent } from "@/sections/types";

export type ActivityType =
  | "choice"
  | "multiple_choice"
  | "true_false"
  | "text_input"
  | "drag_drop";

export type FeedbackConfig = {
  correct?: string;
  incorrect?: string;
};

type BaseActivityConfig = {
  key: string;
  sectionNumber: number;
  title: string;
  prompt?: string;
  media?: MediaContent[];
};

export type ChoiceActivityConfig = BaseActivityConfig & {
  type: "choice";
  options: { id: string; label: string }[];
  correctId?: string;
  feedback?: FeedbackConfig;
};

export type MultipleChoiceActivityConfig = BaseActivityConfig & {
  type: "multiple_choice";
  options: { id: string; label: string }[];
  correctIds?: string[];
  feedback?: FeedbackConfig;
};

export type TrueFalseActivityConfig = BaseActivityConfig & {
  type: "true_false";
  statement: string;
  correctValue?: boolean;
  feedback?: FeedbackConfig;
};

export type TextInputActivityConfig = BaseActivityConfig & {
  type: "text_input";
  expectedAnswers?: string[];
  feedback?: FeedbackConfig;
};

export type DragDropActivityConfig = BaseActivityConfig & {
  type: "drag_drop";
  targets: { id: string; label: string }[];
  items: { id: string; label: string }[];
  correctPlacements?: { itemId: string; targetId: string }[];
  feedback?: FeedbackConfig;
};

export type ActivityConfig =
  | ChoiceActivityConfig
  | MultipleChoiceActivityConfig
  | TrueFalseActivityConfig
  | TextInputActivityConfig
  | DragDropActivityConfig;

export type ChoiceAnswer = { selectedId: string };

export type MultipleChoiceAnswer = { selectedIds: string[] };

export type TrueFalseAnswer = { value: boolean };

export type TextInputAnswer = { text: string };

export type DragDropAnswer = {
  placements: { itemId: string; targetId: string }[];
};

export type ActivityAnswer =
  | ChoiceAnswer
  | MultipleChoiceAnswer
  | TrueFalseAnswer
  | TextInputAnswer
  | DragDropAnswer;

export type CheckResult =
  | { checkable: true; correct: boolean; feedback: string }
  | { checkable: false; feedback: string };
