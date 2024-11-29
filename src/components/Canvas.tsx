import React, { useState } from "react";

const Canvas = ({ width, height }) => {
  const [elements, setElements] = useState([]); // Lista de elementos en el lienzo
  const [editingTextId, setEditingTextId] = useState(null); // ID del texto que está siendo editado

  // Función para agregar un nuevo elemento de texto
  const addText = () => {
    const newText = {
      id: Date.now(),
      type: "text",
      x: 100,
      y: 100,
      text: "Nuevo Texto",
      fontSize: 20,
      color: "black",
    };
    setElements([...elements, newText]);
  };

  // Manejar el movimiento de un elemento
  const handleDrag = (e, id) => {
    const { clientX, clientY } = e;
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? { ...el, x: clientX - e.target.getBoundingClientRect().width / 2, y: clientY - e.target.getBoundingClientRect().height / 2 }
          : el
      )
    );
  };

  // Manejar el doble clic para editar texto
  const handleDoubleClick = (id) => {
    setEditingTextId(id);
  };

  // Manejar cambios en el texto
  const handleTextChange = (e, id) => {
    const newText = e.target.value;
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, text: newText } : el))
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Botón para añadir texto */}
      

      {/* Lienzo SVG */}
      <svg
        width={width}
        height={height}
        style={{ border: "1px solid #ccc", background: "#fff" }}
        onDragOver={(e) => e.preventDefault()} // Permitir el arrastre
      >
        {elements.map((el) => {
          if (el.type === "text") {
            return (
              <g key={el.id}>
                {editingTextId === el.id ? (
                  // Modo de edición
                  <foreignObject
                    x={el.x}
                    y={el.y - 20} // Ajustar para centrar el input
                    width="200"
                    height="30"
                  >
                    <input
                      type="text"
                      value={el.text}
                      onChange={(e) => handleTextChange(e, el.id)}
                      onBlur={() => setEditingTextId(null)} // Salir del modo de edición al perder el foco
                      style={{
                        width: "100%",
                        border: "1px solid #ccc",
                        fontSize: `${el.fontSize}px`,
                        color: el.color,
                      }}
                      autoFocus
                    />
                  </foreignObject>
                ) : (
                  // Modo de visualización
                  <text
                    x={el.x}
                    y={el.y}
                    fontSize={el.fontSize}
                    fill={el.color}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), 0, 0)}
                    onDrag={(e) => handleDrag(e, el.id)}
                    onDoubleClick={() => handleDoubleClick(el.id)}
                  >
                    {el.text}
                  </text>
                )}
              </g>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default Canvas;
