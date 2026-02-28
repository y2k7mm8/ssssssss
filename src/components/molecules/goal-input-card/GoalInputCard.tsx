import React from "react";
import { H2, Text } from "../../atoms/typography/Typography";
import { Button } from "../../atoms/button/Button";
import { FormField } from "../form-field/FormField";
import { Target } from "lucide-react";

export function GoalInputCard({
  goal,
  setGoal,
  onGenerate,
  isLoading,
}: {
  goal: string;
  setGoal: (v: string) => void;
  onGenerate: () => void;
  isLoading?: boolean;
}) {
  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-accent/10 border border-stroke2 flex items-center justify-center">
          <Target size={18} className="text-accent" />
        </div>
        <div className="space-y-1">
          <H2>Цель обучения</H2>
          <Text>Например: подготовиться к экзамену по математике за 14 дней</Text>
        </div>
      </div>

      <FormField label="Цель" placeholder="Введите цель" value={goal} onChange={setGoal} />

      <div className="flex gap-2">
        <Button onClick={onGenerate} disabled={!goal || isLoading}>
          {isLoading ? "Генерируем" : "Сгенерировать план"}
        </Button>
        <Button variant="ghost" onClick={() => setGoal("")}>
          Очистить
        </Button>
      </div>
    </div>
  );
}
