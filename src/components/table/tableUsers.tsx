"use client";
import Image from "next/image";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import obtenerUsuarios from "@/utils/obtenerUsuarios";
import { useEffect, useState } from "react";
const TableUsers = () => {
  const [users, setUsers] = useState<any[]>([]); // Cambia `any` por el tipo adecuado

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await obtenerUsuarios();
        setUsers(usersData);
      } catch (err) {
        console.log("Error al cargar los usuarios");
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-auto flex-col space-y-8 p-4 md:flex  max-w-[600px]">
        <div className="flex items-center justify-between space-y-2">
          <div className="w-full">
            <h2 className="text-2xl font-bold tracking-tight text-center">
              List of Users
            </h2>
            
          </div>
        </div>
        <DataTable data={users} columns={columns} />
      </div>
    </>
  );
};

export default TableUsers;