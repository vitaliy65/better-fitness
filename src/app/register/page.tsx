"use client";

import React from "react";
import Image from "next/image";
import "@/style/custom-jsx.css";
import axios from "axios";
import bcrypt from "bcryptjs";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const res = await axios.post("http://localhost:3000/api/user", {
        Email: formData.email,
        Password: hashedPassword,
      });

      if (res.status === 201) {
        toast.success("Дякуємо що повернулися!");
        setTimeout(() => {
          router.push("/login");
          setIsLoading(false);
        }, 2000);
        return;
      }
    } catch {
      toast.error("виникла помилка!");
      setIsLoading(false);
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
          <p>Register</p>
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
          {!isLoading ? (
            <button type="submit" className="button-custom text-xl">
              реєстрація
            </button>
          ) : (
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mt-6"></div>
          )}
        </form>
      </div>
    </div>
  );
}
