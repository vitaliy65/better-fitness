"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/style/custom-jsx.css";
import axios from "axios";
import bcrypt from "bcryptjs";
import { toast, ToastContainer } from "react-toastify";
import User from "@/models/User";
import { useRouter } from "next/navigation";

interface User {
  Email: string;
  Password: string;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3000/api/user");
      const users = response.data;

      // Шукаємо користувача за email
      const user = users.find((user: User) => user.Email === formData.email);

      if (!user) {
        toast.error("Користувача з таким email не знайдено");
        return;
      }

      // Перевіряємо пароль
      const isPasswordValid = await bcrypt.compare(
        formData.password,
        user.Password
      );

      if (!isPasswordValid) {
        toast.error("Невірний пароль");
        return;
      }

      // Якщо все добре
      toast.success("Успішний вхід!");
      localStorage.setItem("User", JSON.stringify(formData));
      router.push("/");
      // Тут можна додати редирект або інші дії після успішного входу
    } catch (error) {
      toast.error("Помилка при вході");
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex w-screen h-screen bg-white text-black text-xl">
      <ToastContainer />
      <div className="sm:flex justify-center items-center w-1/2 h-full object-cover hidden">
        <Image
          src={"/login-left-photo.jpg"}
          width={4467}
          height={6700}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex justify-center items-center sm:w-1/2 w-full h-full">
        <form
          className="flex flex-col justify-center items-center h-fit w-fit"
          onSubmit={handleSubmit}
        >
          <p>Log in</p>
          <input
            className="input-custom"
            type="email"
            name="email"
            placeholder="Введіть email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="input-custom"
            type="password"
            name="password"
            placeholder="Введіть пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="button-custom text-xl">
            увійти
          </button>
          <div className="flex justify-center items-center text-sm mt-8 w-full">
            <span>Немає аккаунту?</span>
            <Link href={"/register"} className="ml-4 text-blue-500 underline">
              створіть новий!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
