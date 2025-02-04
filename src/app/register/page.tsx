"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import { motion } from "framer-motion";

const signUpFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Dirección de correo electrónico no válida"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpFormSchema>) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full">
          <CardHeader className="flex flex-col items-center pb-0 pt-6 px-4 gap-2">
            <UserPlus size={40} className="text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Crea tu cuenta</h2>
            <p className="text-sm text-default-500">Únete a nosotros hoy y comienza tu viaje</p>
          </CardHeader>
          <CardBody className="overflow-hidden px-6 py-4">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Input
                type="text"
                label="Nombre completo"
                placeholder="Ingresa tu nombre"
                labelPlacement="outside"
                startContent={<User className="text-default-400" size={16} />}
                {...form.register("name")}
                errorMessage={form.formState.errors.name?.message}
              />
              <Input
                type="email"
                label="Correo electrónico"
                placeholder="Ingresa tu correo"
                labelPlacement="outside"
                startContent={<Mail className="text-default-400" size={16} />}
                {...form.register("email")}
                errorMessage={form.formState.errors.email?.message}
              />
              <Input
                type="password"
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                labelPlacement="outside"
                startContent={<Lock className="text-default-400" size={16} />}
                {...form.register("password")}
                errorMessage={form.formState.errors.password?.message}
              />
              <Input
                type="password"
                label="Confirmar contraseña"
                placeholder="Confirma tu contraseña"
                labelPlacement="outside"
                startContent={<Lock className="text-default-400" size={16} />}
                {...form.register("confirmPassword")}
                errorMessage={form.formState.errors.confirmPassword?.message}
              />
              <div className="flex items-center">
                <Checkbox id="terms" size="sm" />
                <label htmlFor="terms" className="ml-2 text-sm text-default-600">
                  Acepto los{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Términos de Servicio
                  </Link>
                </label>
              </div>
              <Button type="submit" color="primary" className="w-full">
                Registrarse
              </Button>
            </form>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-center py-4 px-6">
            <p className="text-sm text-default-500">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

