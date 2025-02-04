"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Task, taskSchema } from "@/lib/auth-schema";
import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import UpdateUser from "@/components/UpdateUser";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const handleDelete = useCallback(async () => {
    const userId = task.id;
    const userRole = task.role;
    try {
      // Paso 1: Eliminar el psicólogo
      const { error: deletePsychologistError } = await supabase
        .from(`${userRole}`)
        .delete()
        .eq("idUser", userId);

      // Verificar si hubo un error al eliminar el psicólogo
      if (deletePsychologistError) {
        throw new Error(
          `Error al eliminar psicólogo: ${deletePsychologistError.message}`
        );
      }

      // Paso 2: Eliminar el usuario solo si no hubo error al eliminar el psicólogo
      const { data, error: deleteUserError } =
        await supabase.auth.admin.deleteUser(userId);

      // Verificar si hubo un error al eliminar el usuario
      if (deleteUserError) {
        throw new Error(
          `Error al eliminar usuario: ${deleteUserError.message}`
        );
      }
      toast.success("Usuario eliminado con éxito");
    } catch (error) {
      toast.error("Error al eliminar: " + error);
    }
  }, [task.id]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {/* <Dialog>
            <DialogTrigger asChild>
              <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
                Edit
                <DropdownMenuShortcut>
                  <Pencil className="w-4 h-4" />
                </DropdownMenuShortcut>
              </div>
            </DialogTrigger>
            <UpdateUser task={task} />
          </Dialog>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={handleDelete}>
            Delete
            <DropdownMenuShortcut>
              <Trash2 className="w-4 h-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}