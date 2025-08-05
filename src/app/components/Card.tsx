"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { SubjectType } from "../page";

const subject_colors: Record<SubjectType, string> = {
  biologia: "#2196F3",
  matemática: "#673AB7",
  linguagens: "#FF9800",
  filosofia: "#FFEB3B",        
  física: "#00BCD4",
  quimica: "#BA68C8",
  literatura: "#F8BBD0",
  sociologia: "#F44336",
  geografia: "#4CAF50",
  historia: "#795548",
};

interface Subject {
  id: number;
  name: string;
  stars: number;
  subject_type: SubjectType;
}

interface PatchSubjectInput {
  id: number;
  name?: string;
  stars?: number;
  subject_type?: SubjectType;
}

const patchSubject = async ({id, name, stars, subject_type}: PatchSubjectInput) : Promise<Subject> => {
  try {
    const res = await axios.patch(`https://api-autoavaliacao.onrender.com/autoavalaiacao/${id}`
      ,{
        name: name,
        stars: stars,
        subject_type: subject_type,
      }
    )
    return res.data
  } catch (error) {
    throw new Error(`Error from fetching data: ${error}`)
  }

}

const Card: FC<Subject> = ({ name, stars, subject_type, id }) => {
  const color = subject_colors[subject_type] ?? "white";

  const mutation = useMutation<PatchSubjectInput, Error, PatchSubjectInput>({
    mutationFn: patchSubject,
  });

  return (
    <div style={{ borderColor: color, backgroundColor: `${color}20` }} className="card hover:scale-102 transition-all duration-150  h-57 card-border shadow-2xl w-105 mt-[1vh]">
      <div className="card-body">
        <h1 className="card-body font-bold text-2xl">{name}</h1>
        <h1 className="font-semibold text-sm">{subject_type.slice(0,1).toUpperCase() + subject_type.slice(1)}</h1>
        <div className="rating">
          <input
            type="radio"
            name={`rating-${id}`}
            className="mask mask-star-2 bg-white"
            aria-label="1 star"
            onChange={() => (mutation.mutate({ id, stars: 1 }))}
            defaultChecked={(stars === 1)}
          />
          <input
            type="radio"
            name={`rating-${id}`}
            className="mask mask-star-2 bg-white"
            aria-label="2 star"
            onChange={() => (mutation.mutate({ id, stars: 2 }))}
            defaultChecked={stars === 2}
          />
          <input
            type="radio"
            name={`rating-${id}`}
            className="mask mask-star-2 bg-white"
            aria-label="3 star"
            onChange={() => (mutation.mutate({ id, stars: 3 }))}
            defaultChecked={stars === 3}
          />
          <input
            type="radio"
            name={`rating-${id}`}
            className="mask mask-star-2 bg-white"
            aria-label="4 star"
            onChange={() => (mutation.mutate({ id, stars: 4 }))}
            defaultChecked={stars === 4}
          />
          <input
            type="radio"
            name={`rating-${id}`}
            className="mask mask-star-2 bg-white"
            aria-label="5 star"
            onChange={() => (mutation.mutate({ id, stars: 5 }))}
            defaultChecked={stars === 5}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
