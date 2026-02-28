import React, { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Badge } from "../../atoms/badge/Badge";
import { motion } from "framer-motion";
import { PenLine } from "lucide-react";

export function WritingAssistantSection() {
  const [text, setText] = useState("I think education is important because...");
  const [tips, setTips] = useState<string[]>([
    "Уточни тезис в первом предложении.",
    "Добавь 1–2 примера.",
    "Сократи повторяющиеся слова.",
  ]);

  const improve = async () => {
    await new Promise((r) => setTimeout(r, 450));
    setTips((prev) => ["Добавь связку: moreover / therefore.", ...prev]);
  };

  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-accent/10 border border-stroke2 flex items-center justify-center">
            <PenLine size={18} className="text-accent" />
          </div>
          <div className="text-sm font-semibold">Академическое письмо</div>
        </div>
        <Badge>черновик</Badge>
      </div>

      <textarea
        className="w-full min-h-[140px] rounded-xl border border-stroke2 bg-surface p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex items-center gap-2">
        <Button onClick={improve}>Проанализировать</Button>
        <Button variant="ghost" onClick={() => setText("")}>
          Очистить
        </Button>
      </div>

      <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-xs text-muted">Рекомендации</div>
        <ul className="list-disc list-inside text-sm text-text space-y-1">
          {tips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
