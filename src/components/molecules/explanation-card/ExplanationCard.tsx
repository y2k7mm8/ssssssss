import React from "react";
import { H2, Text } from "../../atoms/typography/Typography";
import { Badge } from "../../atoms/badge/Badge";
import { BookOpen } from "lucide-react";

export function ExplanationCard({
  topic,
  level = "простыми словами",
  text,
}: {
  topic: string;
  level?: string;
  text: string;
}) {
  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface p-5 shadow-card space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-accent/10 border border-stroke2 flex items-center justify-center">
            <BookOpen size={18} className="text-accent" />
          </div>
          <H2>{topic}</H2>
        </div>
        <Badge>{level}</Badge>
      </div>
      <Text className="text-text">{text}</Text>
    </div>
  );
}
