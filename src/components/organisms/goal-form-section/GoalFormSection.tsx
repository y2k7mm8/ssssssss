import React, { useMemo, useState } from "react";
import { GoalInputCard } from "../../molecules/goal-input-card/GoalInputCard";
import { SubjectSelector } from "../../molecules/subject-selector/SubjectSelector";
import { StudyPlanItem } from "../../molecules/study-plan-item/StudyPlanItem";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

function fakePlan(goal: string, subjects: string[]) {
  const base = subjects.length ? subjects.join(", ") : "общие темы";
  return Array.from({ length: 7 }).map((_, idx) => ({
    day: idx + 1,
    title: `День ${idx + 1}: ${base} — шаг для цели «${goal}»`,
    minutes: 30 + (idx % 3) * 10,
  }));
}

export function GoalFormSection() {
  const [goal, setGoal] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<{ day: number; title: string; minutes: number }[]>([]);

  const toggle = (s: string) =>
    setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const generate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 450));
    setPlan(fakePlan(goal, subjects));
    setLoading(false);
  };

  const can = goal.trim().length > 0;

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <GoalInputCard goal={goal} setGoal={setGoal} onGenerate={generate} isLoading={loading} />
      </motion.div>

      <motion.div
        className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-5 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-accent/10 border border-stroke2 flex items-center justify-center">
            <CalendarCheck size={18} className="text-accent" />
          </div>
          <div className="text-sm font-semibold">План на 7 дней</div>
        </div>

        {!plan.length ? (
          <div className="text-sm text-muted">
            {can ? "Нажми «Сгенерировать план», чтобы увидеть расписание." : "Сначала введи цель."}
          </div>
        ) : (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {plan.map((it) => (
              <StudyPlanItem key={it.day} day={it.day} title={it.title} minutes={it.minutes} />
            ))}
          </motion.div>
        )}
      </motion.div>

      <div className="lg:col-span-2">
        <SubjectSelector selected={subjects} onToggle={toggle} />
      </div>
    </div>
  );
}
