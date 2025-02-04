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
import { serviceFormSchema } from "@/lib/auth-schema";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { validateStorage } from "@/utils/validationStorage";

const PageService = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState(false);

  const form = useForm({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: "",
      description: "",
      photo: null,
    },
  });

  const handleSignIn = async (values: z.infer<typeof serviceFormSchema>) => {
    setState(true);
    const { title, description, photo } = values;
    await validateStorage();
    const namePhoto = `avatar_${Date.now()}.png`;
    const urlPhoto = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${namePhoto}`;
    const { data: dataServices, error: errorServices } = await supabase
      .from("services")
      .insert([{ name: title, description: description, photo: urlPhoto }])
      .select();
    if (
      errorServices?.message?.includes(
        'duplicate key value violates unique constraint "services_name_key"'
      )
    ) {
      console.log("Duplicado");
      toast.error("Ya existe un servicio con ese nombre");
      setState(false);
    }
    if (dataServices) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(namePhoto, photo);

      toast.success("Nuevo servicio creado exitosamente");
      form.reset();
      setState(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <p className="my-4 font-bold text-2xl">Create Service</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="space-y-8 w-64 sm:w-96"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Insert your title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Insert your description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg, image/png"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // Captura el archivo seleccionado
                      field.onChange(file); // Pasa el archivo al estado del formulario
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


<Button type="submit" disabled={state} className="w-full">
            Create Service
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PageService;