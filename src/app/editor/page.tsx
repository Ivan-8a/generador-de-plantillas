"use client"
import React, { useState } from "react";
import Toolbar from "@/components/ToolBar";
import Canvas from "@/components/Canvas";

const EditorPage = () => {
  const [elements, setElements] = useState([]); // Elementos en el lienzo

  // Función para agregar un cuadro de texto
  const addText = () => {
    setElements([
      ...elements,
      {
        id: Date.now(),
        type: "text",
        x: 100,
        y: 100,
        text: "Nuevo Texto",
        fontSize: 16,
        color: "#000",
      },
    ]);
  };

  // Cambiar tamaño de fuente
  const changeFontSize = (size) => {
    console.log(`Tamaño de fuente cambiado a: ${size}`);
  };

  // Cambiar color de fuente
  const changeFontColor = (color) => {
    console.log(`Color de fuente cambiado a: ${color}`);
  };

  // Alinear texto
  const alignText = (alignment) => {
    console.log(`Texto alineado a: ${alignment}`);
  };

  // Insertar variable dinámica
  const insertVariable = (variable) => {
    console.log(`Variable insertada: ${variable}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Barra de Herramientas */}
      <Toolbar
        onAddText={addText}
        onChangeFontSize={changeFontSize}
        onChangeFontColor={changeFontColor}
        onAlignText={alignText}
        onAddImage={() => console.log("Agregar imagen")} // Puedes implementar esto más adelante
        variables={["{{nombre}}", "{{fecha}}", "{{titulo}}"]}
        onInsertVariable={insertVariable}
      />

      {/* Lienzo */}
      <div style={{ flex: 1, overflow: "hidden", background: "#fafafa" }}>
        <Canvas width={816} height={1056} elements={elements} setElements={setElements} />
      </div>
    </div>
  );
};

export default EditorPage;
