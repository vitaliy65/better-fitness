"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/cards/card";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify"; // For notifications
import emailjs from "@emailjs/browser";
import { APP_URL } from "@/utils/constants";

import "react-toastify/dist/ReactToastify.css"; // Added for styles
import "@/style/survey.css";
import "@/style/custom-jsx.css";

interface Question {
  _id: string;
  questionTitle: string;
  answers: Array<{
    answer: string;
  }>;
}

export default function Survey() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [slideToShow, setSlideToShow] = useState(0);
  const [endOfSurvey, setEndOfSurvey] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      await axios
        .get(`${APP_URL}/api/question`)
        .then((res) => {
          setQuestions(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchQuestions();
  }, []);

  const handleNextQuestion = (prevNumber: number, selectedAnswer: string) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);

    if (questions.length > prevNumber + 1) setSlideToShow(prevNumber + 1);
    else {
      setEndOfSurvey(true);
      console.log("Всі відповіді користувача:", userAnswers);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    try {
      const templateParams = {
        from_name: "Vitaliy Posvistak",
        name: "",
        email: email,
        message: userAnswers.join("\n"),
      };

      const res = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        userID
      );

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setEmail("");
      }
    } catch {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="my-container">
      <ToastContainer />
      <AnimatePresence mode="wait">
        {!endOfSurvey ? (
          questions.length > 0 && (
            <motion.div
              key={questions[slideToShow]?._id}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="question-container"
            >
              <h2 className="mb-6 text-center">
                {questions[slideToShow]?.questionTitle}
              </h2>
              <div className="card-container">
                {questions[slideToShow]?.answers.map((answer, index) => (
                  <Card
                    key={index}
                    text={answer.answer}
                    onClick={() =>
                      handleNextQuestion(slideToShow, answer.answer)
                    }
                  />
                ))}
              </div>
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="question-container"
          >
            <p>Дякую за проходження!</p>
            <p>Отримати програму саме для вас:</p>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="email"
                className="input-custom"
                placeholder="Введіть email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="button-custom">
                Отримати!
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
