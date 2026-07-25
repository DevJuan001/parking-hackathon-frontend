import { useState } from "react";
import { useFormValidation } from "@hooks/useFormValidation";
import { sendMessageService } from "../services/sendMessageService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useChat() {
  const [chatInfo, setChatInfo] = useState({
    message: "",
  });
  const [error, setError] = useState(null);
  const { validate } = useFormValidation();
  const queryClient = useQueryClient();

  function handleChange(e) {
    setChatInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  const { data: messages = [] } = useQuery({
    queryKey: ["chat"],
    queryFn: () => [],
    initialData: [],
    staleTime: 1000 * 60 * 60,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (chatInfo) => sendMessageService(chatInfo),
    onMutate: () => {
      queryClient.setQueryData(["chat"], (prev = []) => [
        ...prev,
        {
          id: Date.now(),
          role: "user",
          content: chatInfo.message,
        },
      ]);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["chat"], (prev = []) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: data.data.response,
        },
      ]);
    },
    onError: () => {
      setError(
        "Lo sentimos ha ocurrido un error, intenta enviar el mensaje nuevamente.",
      );
      queryClient.setQueryData(["chat"], (prev = []) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Lo sentimos ha ocurrido un error, intenta enviar el mensaje nuevamente.",
        },
      ]);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const isValid = validate(chatInfo);

    if (!isValid) {
      return;
    }

    mutate(chatInfo);

    setChatInfo({
      message: "",
    });
  }

  return {
    messages,
    chatInfo,
    isPending,
    error,
    handleChange,
    handleKeyDown,
    handleSubmit,
  };
}
