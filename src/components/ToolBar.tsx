import React, { useState } from "react";

const Toolbar = ({
  onAddText,
  onChangeFontSize,
  onChangeFontColor,
  onAlignText,
  onAddImage,
  variables,
  onInsertVariable,
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#000000");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ccc",
      }}
    >
      {/* Botón para añadir texto */}
      <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
        <button onClick={onAddText} style={{ marginRight: "10px" }}>
          Añadir Texto
        </button>
      </div>

      {/* Tamaño de Fuente */}
      <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
        <label style={{ marginRight: "10px" }}>Tamaño de Fuente:</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => {
            const size = parseInt(e.target.value, 10);
            setFontSize(size);
            onChangeFontSize(size);
          }}
          style={{ width: "60px" }}
        />
      </div>

      {/* Color de Fuente */}
      <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
        <label style={{ marginRight: "10px" }}>Color:</label>
        <input
          type="color"
          value={fontColor}
          onChange={(e) => {
            const color = e.target.value;
            setFontColor(color);
            onChangeFontColor(color);
          }}
        />
      </div>

      {/* Alineación de Texto */}
      <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
        <label style={{ marginRight: "10px" }}>Alineación:</label>
        <button onClick={() => onAlignText("left")} style={{ marginRight: "5px" }}>
          Izquierda
        </button>
        <button onClick={() => onAlignText("center")} style={{ marginRight: "5px" }}>
          Centro
        </button>
        <button onClick={() => onAlignText("right")} style={{ marginRight: "5px" }}>
          Derecha
        </button>
        <button onClick={() => onAlignText("justify")}>Justificar</button>
      </div>

      {/* Agregar Imágenes */}
      <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
        <button onClick={onAddImage}>Subir Imagen</button>
      </div>

      {/* Variables Dinámicas */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "10px" }}>Variables:</label>
        <select onChange={(e) => onInsertVariable(e.target.value)} defaultValue="">
          <option value="" disabled>
            Seleccionar Variable
          </option>
          {variables.map((variable) => (
            <option key={variable} value={variable}>
              {variable}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Toolbar;
