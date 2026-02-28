import React, { useState } from "react";
import { FormField } from "../../molecules/form-field/FormField";
import { Button } from "../../atoms/button/Button";
import { ExplanationCard } from "../../molecules/explanation-card/ExplanationCard";
import { motion } from "framer-motion";

export function ExplanationSection() {
  const [topic, setTopic] = useState("Интегралы");
  const [text] = useState(
    "Интеграл — это способ посчитать накопленное значение. Если есть график, то площадь под линией показывает накопление."
  );
  const [shown, setShown] = useState(true);

  return (
    <div className="space-y-4">
      <div className="rounded-xl2 border border-stroke2 bg-surface p-5 shadow-card space-y-4">
        <div className="text-sm font-semibold">Объяснение темы</div>
        <div className="grid md:grid-cols-2 gap-3">
          <FormField label="Тема" value={topic} onChange={setTopic} />
          <div className="flex items-end gap-2">
            <Button onClick={() => setShown(true)}>Показать</Button>
            <Button variant="ghost" onClick={() => setShown(false)}>
              Скрыть
            </Button>
          </div>
        </div>
      </div>

      {shown && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <ExplanationCard topic={topic} text={text} />
        </motion.div>
      )}
    </div>
  );
}
