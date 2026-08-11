"use client";

import { useState } from "react";
import type { DragDropActivityConfig, DragDropAnswer } from "@/activity/types";

type Props = {
  config: DragDropActivityConfig;
  value: DragDropAnswer | null;
  onChange: (answer: DragDropAnswer) => void;
};

type Item = DragDropActivityConfig["items"][number];

function DragItem({ item }: { item: Item }) {
  return (
    <>
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt={item.label} className="w-full rounded" />
      )}
      <span>{item.label}</span>
    </>
  );
}

export function DragDropActivity({ config, value, onChange }: Props) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [itemOrder] = useState(() =>
    [...config.items].sort(() => Math.random() - 0.5),
  );

  const placements = value?.placements ?? [];
  const placedItemIds = placements.map((placement) => placement.itemId);
  const unplacedItems = itemOrder.filter(
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
            className={`flex w-44 cursor-pointer flex-col items-center gap-2 rounded-lg border p-3 text-center ${
              selectedItem === item.id
                ? "border-zinc-900 bg-zinc-100"
                : "border-zinc-300 bg-white"
            }`}
          >
            <DragItem item={item} />
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
              <ul className="flex flex-col gap-2">
                {assigned.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item.id);
                      }}
                      className={`flex w-full flex-col items-start gap-1 rounded-lg border bg-white p-3 text-left ${
                        selectedItem === item.id
                          ? "border-zinc-900 bg-zinc-100"
                          : "border-zinc-300"
                      }`}
                    >
                      <DragItem item={item} />
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
