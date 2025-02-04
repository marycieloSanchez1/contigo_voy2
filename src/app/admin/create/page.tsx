"use client";
import FormSignUp from "@/components/FormSignUp";
import TableUsers from "@/components/table/tableUsers";
import React from "react";

const page = () => {
  return (
    <div className="w-full flex justify-center py-5 gap-4 items-center flex-col">
      <div className="flex items-center justify-center flex-col bg-minsk-200 dark:bg-black w-64 sm:w-[600px] p-4 rounded-2xl border">
        <p className="font-bold text-2xl">Create User</p>
        <FormSignUp />
      </div>
      <div className="bg-minsk-200 dark:bg-black rounded-2xl border">
        <TableUsers />
      </div>
    </div>
  );
};

export default page;