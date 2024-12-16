/*************  ✨ Codeium Command 🌟  *************/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { baseurl, ProjectStatus } from "../../api";
import { useParams } from 'react-router-dom';


import "./App.css";

function App() {
  let { id } = useParams();
  const [elements, setElements] = useState([{ pageNo: 1, rows: [], columns: ["Column 1", "Column 2", "Column 3"] }]);
  const [activeTab, setActiveTab] = useState(0); // Track the active tab index
  const [isPreviewMode, setIsPreviewMode] = useState(false); // State for toggle preview mode

  // Function to add a regular row

  useEffect(() => {
    const getTemplate = async () => {
      // let body=
      const response = await axios.put(`${baseurl}/template/`, {
        _id:id
      });
      // console.log(response.data.templates?.[0]?.elements)
      setElements(response.data.templates?.[0]?.elements);
    }
    getTemplate();


  },[])

  const handleAddRow = () => {
    const updatedElements = [...elements];
    updatedElements[activeTab].rows.push({
      id: Date.now(),
      content: Array(updatedElements[activeTab].columns.length).fill(""),
      type: "row",  // Normal row type
      merged: [],
      mergeInput: "",
      rowColor: "#ffffff", // Default row color (white)
      rowTextColor: "#000000", // Default text color (black)
      rowTextSize: "16px", // Default text size (16px)
    });
    setElements(updatedElements);
    console.log(elements)
  };

  
  // Send the elements to the backend
  const handleSave = () => {
    let body={
      elements:elements
    }
    axios.post(`${baseurl}/template/create`, body)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleRowColorChange = (id, color) => {
    const updatedElements = [...elements];
    const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
    if (updatedRow) {
      updatedRow.rowColor = color; // Update the row color
    }
    setElements(updatedElements);
    console.log(elements)
  };

  // Function to handle text color change
  const handleTextColorChange = (id, color) => {
    const updatedElements = [...elements];
    const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
    if (updatedRow) {
      updatedRow.rowTextColor = color; // Update the text color
    }
    setElements(updatedElements);
  };

  // Function to handle text size change
  const handleTextSizeChange = (id, size) => {
    const updatedElements = [...elements];
    const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
    if (updatedRow) {
      updatedRow.rowTextSize = size + "px"; // Ensure the size includes the "px" unit
    }
    setElements(updatedElements);
  };

  const handleRemoveRow = (id) => {
    const updatedElements = [...elements];
    updatedElements[activeTab].rows = updatedElements[activeTab].rows.filter((row) => row.id !== id);
    setElements(updatedElements);
  };

  const handleContentChange = (id, colIndex, value) => {
    const updatedElements = [...elements];
    const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
    if (updatedRow && updatedRow.type === "row") { // Only allow content change for normal rows
      updatedRow.content[colIndex] = value;
    }
    setElements(updatedElements);
  };

  const handleAddColumn = () => {
    const updatedElements = [...elements];
    updatedElements[activeTab].columns.push(`Column ${updatedElements[activeTab].columns.length + 1}`);
    updatedElements[activeTab].rows.forEach((row) => row.content.push(""));
    setElements(updatedElements);
    console.log(elements)
  };

  const handleRemoveColumn = () => {
    if (elements[activeTab].columns.length > 1) {
      const updatedElements = [...elements];
      updatedElements[activeTab].columns.pop();
      updatedElements[activeTab].rows.forEach((row) => row.content.pop());
      setElements(updatedElements);
    }
  };

  const handleMergeColumns = (id, rangeInput) => {
    const [start, end] = rangeInput.split("-").map((x) => parseInt(x, 10) - 1); // Convert to 0-based index
    if (start >= 0 && end >= start && end < elements[activeTab].columns.length) {
      const updatedElements = [...elements];
      const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
      if (updatedRow) {
        updatedRow.merged.push({ start, end });
      }
      setElements(updatedElements);
    }
  };

  const handleMergeInputChange = (id, value) => {
    const updatedElements = [...elements];
    const updatedRow = updatedElements[activeTab].rows.find((row) => row.id === id);
    if (updatedRow) {
      updatedRow.mergeInput = value;
    }
    setElements(updatedElements);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedRows = [...elements[activeTab].rows];
    const [moved] = reorderedRows.splice(result.source.index, 1);
    reorderedRows.splice(result.destination.index, 0, moved);
    const updatedElements = [...elements];
    updatedElements[activeTab].rows = reorderedRows;
    setElements(updatedElements);
  };

  const handleAddTab = () => {
    const newTab = {
      pageNo: elements.length + 1,
      rows: [],
      columns: ["Column 1", "Column 2", "Column 3"],
    };
    setElements([...elements, newTab]);
  };

  const switchTab = (index) => {
    setActiveTab(index);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode); // Toggle preview mode
  };

  return (
    <div className="App">
      <h1>Dynamic Table Generator</h1>

      {/* Tab Controls */}
      <div style={{ marginBottom: "20px" }}>
        {elements.map((tab, index) => (
          <button key={index} onClick={() => switchTab(index)}>
            Page {tab.pageNo}
          </button>
        ))}
        <button onClick={handleAddTab}>Add New Tab</button>
      </div>

      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Left Control Panel */}
        <div>
          <h3>Controls</h3>
          <button onClick={handleAddRow}>Add Row</button>
          <button onClick={handleAddColumn}>Add Column</button>
          <button onClick={handleRemoveColumn} disabled={elements[activeTab].columns.length <= 1}>
            Remove Column
          </button>
          <button onClick={togglePreviewMode}>
            {isPreviewMode ? "Edit Mode" : "Preview Mode"} {/* Toggle button text */}
          </button>
          <button onClick={handleSave}>Save</button> {/* Button to trigger handleSave */}
          <button onClick={handleAddRow}>Add Row</button>
        </div>

        {/* Right Preview/Editing Panel */}
        <div>
          <h3>Page {elements[activeTab].pageNo}</h3>
          <DragDropContext onDragEnd={handleDragEnd}>
            <table
              border="1"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <thead>
                {!isPreviewMode && (  // Only show row labels and column headers in edit mode
                  <tr>
                    <th>Row</th>
                    {elements[activeTab].columns.map((label, index) => (
                      <th key={index}>{label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                )}
              </thead>
              <Droppable droppableId="table-body">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {elements[activeTab].rows.map((row, index) => (
                      <Draggable key={row.id} draggableId={String(row.id)} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ 
                              backgroundColor: row.rowColor,  // Apply selected color to the row
                              color: row.rowTextColor,  // Apply selected text color
                            }}
                          >
                            {!isPreviewMode && <td>{`Row ${index + 1}`}</td>} {/* Only show in edit mode */}
                            {row.type === "heading" ? (
                              // If it's a heading row, display it as a heading
                              row.content.map((content, colIndex) => (
                                <td key={colIndex} colSpan={elements[activeTab].columns.length}>
                                  <strong>{content}</strong>
                                </td>
                              ))
                            ) : row.type === "space" ? (
                              // If it's a space row, merge all columns
                              <td
                                colSpan={elements[activeTab].columns.length}
                                style={{
                                  textAlign: "center",
                                  fontSize: row.rowTextSize, // Apply text size here in preview mode
                                }}
                              >
                                Space
                              </td>
                            ) : (
                              // Render normal rows
                              row.content.map((cell, colIndex) => {
                                const merged = row.merged;
                                const mergeRange = merged.find(
                                  (range) => colIndex >= range.start && colIndex <= range.end
                                );
                                if (mergeRange) {
                                  if (colIndex === mergeRange.start) {
                                    const colspan = mergeRange.end - mergeRange.start + 1;
                                    return (
                                      <td
                                        key={colIndex}
                                        colSpan={colspan}
                                        style={{
                                          // fontSize: isPreviewMode ? row.rowTextSize : "inherit", // Apply text size only in preview mode
                                        }}
                                      >
                                        {isPreviewMode ? (
                                          <p style={{fontSize: row.rowTextSize}}>{cell}</p> // Display as text in preview mode
                                        ) : (
                                          <input
                                            type="text"
                                            value={cell}
                                            onChange={(e) =>
                                              handleContentChange(row.id, colIndex, e.target.value)
                                            }
                                            style={{ width: "100%" }}
                                          />
                                        )}
                                      </td>
                                    );
                                  }
                                  return null; // Skip rendering merged cells
                                }

                                return (
                                  <td
                                    key={colIndex}
                                    style={{
                                      fontSize: isPreviewMode ? row.rowTextSize : "inherit", // Apply text size only in preview mode
                                    }}
                                  >
                                    {isPreviewMode ? (
                                      <p style={{fontSize: row.rowTextSize}} >{cell}</p> // Display as static text in preview mode
                                    ) : (
                                      <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) =>
                                          handleContentChange(row.id, colIndex, e.target.value)
                                        }
                                        style={{ width: "100%" }}
                                      />
                                    )}
                                  </td>
                                );
                              })
                            )}

                            {!isPreviewMode && (
                              <td>
                                {/* Row Color Picker */}
                                <input
                                  type="color"
                                  value={row.rowColor}
                                  onChange={(e) => handleRowColorChange(row.id, e.target.value)}
                                />
                                {/* Text Color Picker */}
                                <input
                                  type="color"
                                  value={row.rowTextColor}
                                  onChange={(e) => handleTextColorChange(row.id, e.target.value)}
                                />
                                {/* Text Size Picker */}
                                <input
                                  type="number"
                                  value={parseInt(row.rowTextSize, 10)}
                                  onChange={(e) => handleTextSizeChange(row.id, e.target.value)}
                                  style={{ width: "60px" }}
                                />
                                {/* Merge Input Box */}
                                <input
                                  type="text"
                                  value={row.mergeInput}
                                  onChange={(e) => handleMergeInputChange(row.id, e.target.value)}
                                  placeholder="e.g., 1-2"
                                />
                                <button onClick={() => handleMergeColumns(row.id, row.mergeInput)}>
                                  Merge
                                </button>
                                <button onClick={() => handleRemoveRow(row.id)}>-</button>
                              </td>
                            )}
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
// import React from 'react'

// const EditTemplate = () => {
//   return (
//     <div>EditTemplate</div>
//   )
// }

// export default EditTemplate
