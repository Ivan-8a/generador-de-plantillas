"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore"; // Para guardar datos
import { auth, db } from "@/utils/firebase"; // Firebase configurado

export default function NewTemplatePage() {
  const [orientation, setOrientation] = useState("portrait"); // Vertical por defecto
  const [size, setSize] = useState("letter"); // Carta por defecto
  const [name, setName] = useState(""); // Nombre de la plantilla
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si hay un usuario autenticado
    const user = auth.currentUser;
    if (!user) {
      alert("Debes iniciar sesión para crear una plantilla.");
      return;
    }

    try {
      // Guardar la plantilla en Firestore
      await addDoc(collection(db, "templates"), {
        userId: user.uid, // ID del usuario actual
        name,
        orientation,
        size,
        createdAt: new Date(),
      });

      alert("Plantilla creada con éxito");
      router.push("/dashboard"); // Redirigir al Dashboard
    } catch (err) {
      console.error("Error al crear la plantilla:", err);
      alert("Hubo un error al crear la plantilla.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Crear Nueva Plantilla
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre de la plantilla
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="orientation" className="block text-sm font-medium">
            Orientación
          </label>
          <select
            id="orientation"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            className="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-400"
          >
            <option value="portrait">Vertical</option>
            <option value="landscape">Horizontal</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="size" className="block text-sm font-medium">
            Tamaño de la hoja
          </label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-400"
          >
            <option value="letter">Carta</option>
            <option value="legal">Oficio</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Crear Plantilla
        </button>
      </form>
    </div>
  );
}
