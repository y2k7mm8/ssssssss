import React, { useState } from "react";
import { Button } from "../components/atoms/button/Button";
import { FormField } from "../components/molecules/form-field/FormField";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Вход</div>
      <FormField label="Email" value={email} onChange={setEmail} placeholder="you@mail.com" />
      <FormField label="Пароль" value={pass} onChange={setPass} placeholder="••••••••" />
      <Button className="w-full" disabled={!email || !pass}>
        Войти
      </Button>
      <div className="text-xs text-muted">Это демо-экран. Авторизацию подключим позже.</div>
    </div>
  );
}
