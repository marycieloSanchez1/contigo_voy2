"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { specialtyFormSchema } from "@/lib/auth-schema";
import { toast } from "react-toastify";
import { useRef, useState } from "react";

const FormSpecialties = () => {
  const [state, setState] = useState(false);

  const form = useForm({
    resolver: zodResolver(specialtyFormSchema),
    defaultValues: {
      specialty: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof specialtyFormSchema>) => {
    setState(true);
    const { specialty } = values;

    const { data, error } = await supabase
      .from("especialidad")
      .insert([{ nombre: specialty }])
      .select();
    if (
      error?.message?.includes(
        'duplicate key value violates unique constraint "especialidad_nombre_key"'
      )
    ) {
      console.log("Duplicado");
      toast.info("Ya existe una especialidad con ese nombre");
      setState(false);
    }
    if (data) {
      toast.success("Nueva especialidad creada exitosamente");
      setState(false);
    }
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignIn)}
        className="w-64 space-y-8 sm:w-96 py-4"
      >
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especialidad</FormLabel>
              <FormControl>
                <Input placeholder="Inserta tu especialidad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={state} className="w-full">
          Crear Especialidad
        </Button>
      </form>
    </Form>
  );
};

export default FormSpecialties;