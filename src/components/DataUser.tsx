"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PanelProps, UserInterface } from "@/interface";
import { supabase } from "@/lib/supabaseClient";
import { fetchUser } from "@/utils/recuperarDataUser";
import React, { useEffect, useState } from "react";

export const DataUser = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ estado, setEstado }, ref) => {
    const [user, setUser] = useState<UserInterface>({
      name: null,
      email: null,
      lastname: null,
      photo: null,
      iniciales: null,
    });
    useEffect(() => {
      fetchUser(setUser);
    }, []);
    return (
      <div ref={ref}>
        <Avatar
          className="cursor-pointer"
          onClick={() => setEstado(!estado)} // Alterna el estado al hacer clic
        >
          <AvatarImage src={user.photo || "https://github.com/shadcn.png"} />
          <AvatarFallback>{user.iniciales}</AvatarFallback>
        </Avatar>
      </div>
    );
  }
);
DataUser.displayName = 'DataUser';