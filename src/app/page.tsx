"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Card from "./components/Card";
import axios from "axios";
import { useState } from "react";
import qs from "qs";
import Link from "next/link";

export type SubjectType =
  | "biologia"
  | "física"
  | "quimica"
  | "matemática"
  | "historia"
  | "geografia"
  | "sociologia"
  | "filosofia"
  | "linguagens"
  | "literatura";

interface Subject {
  id: number;
  name: string;
  stars: number;
  subject_type: SubjectType;
}

interface SubjectResponse {
  subjects: Subject[];
}

interface SubjectFilters {
  stars?: number;
  subject_type?: string[];
  name?: string;
}

const fetchSubject = async (
  filters?: SubjectFilters
): Promise<SubjectResponse> => {
  try {
    const res = await axios.get(
      "https://api-autoavaliacao.onrender.com/autoavalaiacao/",
      {
        params: {
          subject: filters?.subject_type,
          stars: filters?.stars,
          name: filters?.name,
        },
        paramsSerializer: (params) => qs.stringify(params, { indices: false }),
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(`Error from fetching data: ${error}`);
  }
};

export default function Home() {
  const [subjects, setSubjects] = useState<SubjectType[]>([
    "biologia",
    "linguagens",
    "matemática",
    "filosofia",
    "física",
    "quimica",
    "sociologia",
    "geografia",
    "historia",
    "literatura",
  ]);
  console.log(subjects);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["subjects", subjects],
    queryFn: () => fetchSubject({ subject_type: subjects }),
  });

  const mutation = useMutation<SubjectResponse, Error, SubjectFilters>({
    mutationFn: (filters) => fetchSubject(filters),
  });

  const handleFilter = (subject_type: SubjectType) => {
    setSubjects((prevSubjects) => {
      const updatedSubjects = prevSubjects.includes(subject_type)
        ? prevSubjects.filter((subject) => subject !== subject_type)
        : [...prevSubjects, subject_type];

      mutation.mutate({ subject_type: updatedSubjects });

      return updatedSubjects;
    });
  };

  return (
    <>
      <header className="h-[11vh]">
        <nav className="flex flex-row justify-between p-5">
          <ul className="flex flex-row gap-2">
            <li>
              <button
                className={`font-semibold text-sm btn transition-colors duration-200 ${
                  subjects.includes("biologia")
                    ? "border-b-success"
                    : "border-base-300"
                } rounded-xl h-8`}
                onClick={() => handleFilter("biologia")}
              >
                Biologia
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-sm btn ${
                  subjects.includes("linguagens")
                    ? "border-b-success"
                    : "border-base-300"
                } rounded-xl h-8`}
                onClick={() => handleFilter("linguagens")}
              >
                Linguagens
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-sm btn ${
                  subjects.includes("matemática")
                    ? "border-b-success"
                    : "border-base-300"
                } rounded-xl h-8`}
                onClick={() => handleFilter("matemática")}
              >
                Matemática
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-sm btn ${
                  subjects.includes("quimica")
                    ? "border-b-success"
                    : "border-base-300"
                } rounded-xl h-8`}
                onClick={() => handleFilter("quimica")}
              >
                Química
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-sm btn ${
                  subjects.includes("física")
                    ? "border-b-success"
                    : "border-base-300"
                } rounded-xl h-8`}
                onClick={() => handleFilter("física")}
              >
                Física
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-sm btn ${
                  subjects.includes("sociologia")
                    ? "border-b-success"
                    : "border-base-300"
                } rounded-xl h-8`}
                onClick={() => handleFilter("sociologia")}
              >
                Sociologia
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-sm btn ${
                  subjects.includes("filosofia")
                    ? "border-b-success"
                    : "border-base-300"
                } rounded-xl h-8`}
                onClick={() => handleFilter("filosofia")}
              >
                Filosofia
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-sm btn ${
                  subjects.includes("literatura")
                    ? "border-b-success"
                    : "border-base-300"
                } rounded-xl h-8`}
                onClick={() => handleFilter("literatura")}
              >
                Literatura
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-sm btn ${
                  subjects.includes("geografia")
                    ? "border-b-success"
                    : "border-base-300"
                } rounded-xl h-8`}
                onClick={() => handleFilter("geografia")}
              >
                Geografia
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-sm btn ${
                  subjects.includes("historia")
                    ? "border-b-success"
                    : "border-base-300"
                } rounded-xl h-8`}
                onClick={() =>
                  setSubjects((prevSubjects) =>
                    subjects.includes("historia")
                      ? prevSubjects.filter((subject) => subject !== "historia")
                      : [...prevSubjects, "historia"]
                  )
                }
              >
                Historia
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="min-h-[88vh] flex justify-center items-center">
        {isError && (
          <div>
            <h1>Something went wrong!</h1>
          </div>
        )}
        {isLoading && (
          <svg
            className="w-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 150"
          >
            <path
              fill="none"
              stroke="#36D399"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="300 385"
              strokeDashoffset="0"
              d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
            >
              <animate
                attributeName="stroke-dashoffset"
                calcMode="spline"
                dur="3.3"
                values="685;-685"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              ></animate>
            </path>
          </svg>
        )}
        <div className="2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid place-items-center p-5 gap-5">
          {data?.subjects &&
            data.subjects.map((item: Subject) => (
              <Card
                key={item.id}
                name={item.name}
                id={item.id}
                subject_type={item.subject_type}
                stars={item.stars}
              />
            ))}

        </div>

      </main>
      <footer className="flex justify-center mt-3 mb-5   items-center">
            <Link className="btn border-success rounded-xl p-6 shadow-xl" href={"create"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#36D399" className="bi bi-plus-lg " viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
              </svg>
            </Link>
      </footer>
    </>
  );
}
