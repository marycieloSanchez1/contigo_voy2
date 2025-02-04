"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { signUpFormSchema } from "@/lib/auth-schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { validateStorage } from "@/utils/validationStorage";
const FormSignUp = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [especialidad, setEspecialidad] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("especialidad").select("*");
      if (error) {
        console.log(error);
        return;
      }
      if (Array.isArray(data)) {
        setEspecialidad(data);
        console.log(data);
      } else {
        setEspecialidad([]);
      }
    };

    fetchData();
  }, []);

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
      photo: null,
      userSpecialty: "",
      phone: "",
      description: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof signUpFormSchema>) => {
    setState(true);
    const {
      name,
      email,
      password,
      role,
      lastname,
      photo,
      userSpecialty,
      phone,
      description,
    } = values;
    const { data: dataemail, error: emailError } = await supabase.rpc(
      "check_email_exists",
      {
        email_input: email,
      }
    );
    if (dataemail === true) {
      toast.info("El email ya existe");
      setState(false);
      return;
    }
    await validateStorage();
    const ruta = role === "admin" ? "/admin/create" : "/user/home";
    const namePhoto = `avatar_${Date.now()}.png`;
    const urlPhoto = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${namePhoto}`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
          lastname,
          photo: urlPhoto,
        },
        emailRedirectTo: `${window.location.origin}${ruta}`, // Redirigir a /home después de la confirmación
      },
    });

    if (error) {
      console.log(`Error: ${error.message}`);
      toast.error(`Error: ${error.message}`);
    } else {
      await supabase.storage.from("avatars").upload(namePhoto, photo);
      function getIdByName() {
        const item = especialidad.find(
          (item) => item && item.nombre === userSpecialty
        );
        return item ? parseInt(item.idespecialidad) : null;
      }

      if (role === "psicologo") {
        const { error } = await supabase.from("psicologo").insert([
          {
            idUser: data.user?.id,
            introduccion: description,
            idespecialidad: getIdByName(),
            celular: phone,
          },
        ]);
        if (error) {
          console.log(`Error: ${error.message}`);
          toast.error(`Error: ${error.message}`);
        }
      } else if (role === "admin") {
        const { error } = await supabase.from("admin").insert([
          {
            idUser: data.user?.id,
          },
        ]);
        if (error) {
          console.log(`Error: ${error.message}`);
          toast.error(`Error: ${error.message}`);
        }
      }
      toast.success("Usuario registrado con éxito. Que verifique su correo.");
      form.reset();
    }
    setState(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignUp)}
        className="w-64 space-y-8 sm:w-full pt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Insert your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Insert your lastname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Insert your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insert your password"
                  {...field}
                  type="password"
                />
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
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedRole(value);
                    if (value === "admin") {
                      form.setValue("userSpecialty", "aaaaa");
                      form.setValue("description", "aaaaa");
                      form.setValue("phone", "aaaaa");
                    } else {
                      form.setValue("userSpecialty", "");
                      form.setValue("description", "");
                      form.setValue("phone", "");
                    }
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="psicologo">Psicologo</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedRole === "psicologo" && (
          <>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Insert your Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userSpecialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialty</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a Specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          {especialidad.map((item) => (
                            <SelectItem
                              value={item.nombre}
                              key={item.idespecialidad}
                            >
                              {item.nombre}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                    <Input placeholder="Insert your Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" disabled={state} className="w-full">
          Create User
        </Button>
      </form>
    </Form>
  );
};

export default FormSignUp;
