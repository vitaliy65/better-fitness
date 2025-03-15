"use client";

import React, { useEffect, useState } from "react";
import EditableField from "@/components/editableField";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { APP_URL } from "@/utils/constants";

export default function Profile() {
  const [user, setUser] = useState({ id: "", age: "", name: "", email: "" });

  useEffect(() => {
    const getUser = () => {
      const userInfo = localStorage.getItem("user");
      if (userInfo) {
        const parsedData = JSON.parse(userInfo);
        setUser(parsedData.user);
      }
    };

    getUser();
  }, []);

  const saveAttribute = async (attribute: string, value: string | number) => {
    try {
      const response = await axios.patch(`${APP_URL}/api/user`, {
        id: user.id,
        [attribute.toLowerCase()]: value,
      });

      if (response.status === 200) {
        setUser((prev) => ({
          ...prev,
          [attribute.toLowerCase()]: value,
        }));
        toast.success("Успішно оновлено!");
      }
    } catch {
      toast.error("Помилка при оновленні");
    }
  };

  return (
    <div className="absolute flex justify-center items-center w-full h-full mt-20">
      <div className="flex flex-col justify-center items-start w-fit h-fit">
        <span className="flex justify-center w-full mb-10">
          Інформація профілю:
        </span>
        <p>Email: {user.email}</p>
        <EditableField
          label="Ім'я"
          value={user.name}
          onSave={(value) => saveAttribute("name", value)}
        />
        <EditableField
          label="Вік"
          value={user.age}
          onSave={(value) => saveAttribute("age", value)}
        />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
