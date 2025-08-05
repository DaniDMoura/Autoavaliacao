"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SubjectType } from "../page";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

type FormData = {
  name: string;
  subject_type: SubjectType;
};

interface CreateSubject {
  id: number;
  name: string;
  subject_type: SubjectType;
  stars: number;
}

const createSubject = async (data: FormData): Promise<CreateSubject> => {
  try {
    const res = await axios.post(
      "https://api-autoavaliacao.onrender.com/autoavalaiacao/",
      {
        name: data.name,
        subject_type: data.subject_type,
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(`Error from fetching data: ${error}`);
  }
};

const Create: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const mutation = useMutation<FormData, Error, FormData>({
    mutationFn: (data) => createSubject(data),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
    router.push("/")
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 border-base-200 shadow-xl bg-base-300 rounded-2xl focus:outline-none"
        >
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
            {...register("name", { required: "Campo obrigatório" })}
            type="text" className="input" placeholder="Type here" />
            {errors.name && (
              <p className="text-error">{errors.name.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Subject Type</legend>
              <select
                {...register("subject_type", { required: "Selecione um tipo" })}
                className="border cursor-pointer bg-base-300 p-2 w-full"
              >
                <option value="">Selecione...</option>
                <option value="biologia">Biologia</option>
                <option value="fisica">Física</option>
                <option value="quimica">Química</option>
                <option value="sociologia">Sociologia</option>
                <option value="historia">Historia</option>
                <option value="matemática">Matemática</option>
                <option value="linguagens">Linguagens</option>
                <option value="geografia">Geografia</option>
                <option value="literatura">Literatura</option>
                <option value="filosofia">Filosofia</option>
              </select>
              {errors.name && (
                <p className="text-error">{errors.name.message}</p>
              )}
          </fieldset>
          <div className="flex justify-center items-center mt-5">
            <button
              className="text-sm font-semibold btn rounded-xl border-success text-success"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Create;
