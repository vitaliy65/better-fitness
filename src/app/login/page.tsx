"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/style/custom-jsx.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth", formData);
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Успішний вхід!");
      router.push("/");
    } catch {
      toast.error("Помилка при вході");
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
