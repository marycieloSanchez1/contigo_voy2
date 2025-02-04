"use client";
import { Button, Form, Input } from "@nextui-org/react";
import React from "react";

export default function App() {
  const [action, setAction] = React.useState<string | null>(null);

  return (
    <Form
      className="w-full max-w-md bg-[#B8B8FF] rounded-2xl p-6 mr-10 "
      validationBehavior="native"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setAction(`submit ${JSON.stringify(data)}`);
      }}
    >
      <div className="space-y-3 w-full">
        <Input
          isRequired
          errorMessage="Por favor ingrese un nombre válido"
          name="Nombres"
          placeholder="Nombres"
          type="text"
          className="input-placeholder"
        />
        <Input
          isRequired
          errorMessage="Por favor ingrese un apellido válido"
          name="Apellidos"
          placeholder="Apellidos"
          type="text"
          className="input-placeholder"
        />
        <Input
          isRequired
          errorMessage="Por favor ingrese un número de teléfono válido"
          name="phone"
          placeholder="Celular"
          type="tel"
          className="input-placeholder"
        />
        <Input
          isRequired
          errorMessage="Ingrese un correo electrónico válido"
          name="email"
          placeholder="Correo"
          type="email"
          className="input-placeholder"
        />
        <Input
          name="message"
          placeholder="Comentario"
          type="textarea"
          className="input-placeholder"
        />
        <div className="w-full flex justify-center pt-4">
          <Button
            className="bg-[#634AE3] text-white px-8 py-2 rounded-lg hover:bg-[#5339cc] transition-colors"
            type="submit"
          >
            Enviar
          </Button>
        </div>
      </div>

      {action && (
        <div className="text-small text-default-500 mt-4">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
}
