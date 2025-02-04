"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  ArrowRight,
  CheckCircle2,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { Input, Button, Card } from "@nextui-org/react";
import { signInFormSchema } from "@/lib/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  // const toggleVisibility = () => setIsVisible(!isVisible);
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof signInFormSchema>) => {
    setIsVisible(true);
    const { email: email_input } = values;
    const { data, error: emailError } = await supabase.rpc(
      "check_email_exists",
      {
        email_input,
      }
    );

    if (emailError) {
      console.error("Error fetching users:", emailError.message);
      toast.error("Error al verificar el correo electrónico");
      setIsVisible(false);
      form.reset();
      return;
    }

    if (data === false) {
      toast.warning("El correo electrónico no está registrado");
      setIsVisible(false);
      form.reset();
      return;
    }
    const { data: dateRole, error: dataRole } = await supabase.rpc(
      "get_user_role",
      {
        email_input,
      }
    );

    console.log(dateRole);
    const redireccion = dateRole === "admin" ? "/admin/create" : "/user/home";
    // Enviar el enlace de inicio de sesión
    const { error } = await supabase.auth.signInWithOtp({
      email: email_input,
      options: {
        emailRedirectTo: `${window.location.origin}${redireccion}`,
      },
    });

    if (error) {
      console.log(error.cause);
      toast.error("Error al enviar el enlace");
      setIsVisible(false);
      form.reset();
    } else {
      toast.info("Se ha enviado un enlace mágico a tu correo electrónico.");
      form.reset();
      setIsVisible(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-purple-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] px-4 relative"
      >
        {/* Purple background card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -20, y: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          className="absolute -left-8 -bottom-8 right-8 top-8 bg-purple-600/30 rounded-2xl backdrop-blur-sm"
        />

        <Card className="w-full p-8 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl static z-10">
          <motion.div initial={false}>
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#6b4ce6] to-[#9747FF] bg-clip-text text-transparent">
              Sign In
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSignIn)}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">
                    Usuario
                  </label>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Ingrese su email"
                            startContent={
                              <User className="text-gray-700" size={20} />
                            }
                            classNames={{
                              base: "max-w-full",
                              mainWrapper: "h-12",
                              input: "text-base",
                              inputWrapper: [
                                "h-12",
                                "bg-gray-200",
                                "hover:bg-white/60",
                                "group-data-[focused=true]:bg-white",
                                "!cursor-text",
                                "shadow-sm",
                                "text-gray-700",
                              ],
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">
                    Contraseña
                  </label>
                  <Input
                    type={isVisible ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startContent={<Lock className="text-gray-700" size={20} />}
                    endContent={
                    <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                      {isVisible ? (
                      <EyeOffIcon className="text-gray-700 hover:text-[#6b4ce6] transition-colors" size={20} />
                      ) : (
                      <EyeIcon className="text-gray-700 hover:text-[#6b4ce6] transition-colors" size={20} />
                      )}
                    </button>
                    }
                    isDisabled={isLoading || isSuccess}
                  />
                  </div> */}
                <Button
                  type="submit"
                  className={`w-full h-12 mt-4 text-white text-lg font-medium transition-all duration-300 ${
                    !isVisible
                      ? "bg-[#8b74ea]"
                      : "bg-[#6b4ce6] hover:bg-[#5a3dd4] hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  disabled={isVisible}
                >
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span>Ingresar</span>
                    <ArrowRight className="ml-2" size={20} />
                  </motion.div>
                </Button>
              </form>
            </Form>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
