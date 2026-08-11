"use client";

import { useState } from "react";
import type { DragDropActivityConfig, DragDropAnswer } from "@/activity/types";

type Props = {
  config: DragDropActivityConfig;
  value: DragDropAnswer | null;
  onChange: (answer: DragDropAnswer) => void;
};

export function DragDropActivity({ config, value, onChange }: Props) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const placements = value?.placements ?? [];
  const placedItemIds = placements.map((placement) => placement.itemId);
  const unplacedItems = config.items.filter(
    (item) => !placedItemIds.includes(item.id),
  );

  function targetOf(itemId: string): string | undefined {
    return placements.find((placement) => placement.itemId === itemId)?.targetId;
  }

  function place(itemId: string, targetId: string) {
    const others = placements.filter((placement) => placement.itemId !== itemId);
    onChange({ placements: [...others, { itemId, targetId }] });
  }

  function handleTarget(targetId: string) {
    if (!selectedItem) return;
    place(selectedItem, targetId);
    setSelectedItem(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {unplacedItems.map((item) => (
          <button
            key={item.id}
            type="button"
            draggable
            onDragStart={() => setSelectedItem(item.id)}
            onClick={() =>
              setSelectedItem(selectedItem === item.id ? null : item.id)
            }
            className={`cursor-pointer rounded-lg border px-3 py-2 ${
              selectedItem === item.id
                ? "border-zinc-900 bg-zinc-100"
                : "border-zinc-300 bg-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {config.targets.map((target) => {
          const assigned = config.items.filter(
            (item) => targetOf(item.id) === target.id,
          );
          return (
            <div
              key={target.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleTarget(target.id)}
              onClick={() => handleTarget(target.id)}
              className="rounded-lg border border-dashed border-zinc-400 p-4"
            >
              <p className="mb-2 font-medium">{target.label}</p>
              <ul className="flex flex-col gap-1">
                {assigned.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item.id);
                      }}
                      className={`w-full rounded-lg border bg-white px-3 py-2 text-left ${
                        selectedItem === item.id
                          ? "border-zinc-900 bg-zinc-100"
                          : "border-zinc-300"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-zinc-500">
        Klik item lalu klik target untuk menempatkan, atau seret item ke target.
      </p>
    </div>
  );
}
