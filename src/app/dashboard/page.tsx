"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore"; // Para consultar datos
import { auth, db } from "@/utils/firebase";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState([]); // Plantillas del usuario
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth/login");
      } else {
        setUser(currentUser);

        // Cargar las plantillas del usuario
        const q = query(
          collection(db, "templates"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const userTemplates = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTemplates(userTemplates);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-6">Usuario autenticado: {user?.email}</p>

      <button
        onClick={() => router.push("/dashboard/new-template")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Crear nueva plantilla
      </button>

      <h2 className="text-2xl font-bold mb-4">Mis Plantillas</h2>
      {templates.length === 0 ? (
        <p>No tienes plantillas creadas aún.</p>
      ) : (
        <ul className="space-y-4">
          {templates.map((template) => (
            <li
              key={template.id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{template.name}</h3>
                <p>
                  {template.size.toUpperCase()} -{" "}
                  {template.orientation === "portrait" ? "Vertical" : "Horizontal"}
                </p>
              </div>
              <button
                onClick={() => router.push(`/editor?id=${template.id}`)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
