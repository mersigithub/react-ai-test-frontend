import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await axios.post("http://localhost:5000/api/agent/ask", {
        question
      });

      setAnswer(res.data.answer || "No answer returned.");
    } catch (error) {
      console.error(error);
      setAnswer("Error contacting backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>AI Repo Assistant</h2>

      <textarea
        style={styles.textarea}
        placeholder="Ask something about the repo..."
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button style={styles.button} onClick={askAI}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div style={styles.answerBox}>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

// simple inline styles
const styles = {
  container: {
    padding: "30px",
    maxWidth: "700px",
    margin: "auto",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center"
  },
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4a90e2",
    color: "white",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "25px"
  },
  answerBox: {
    background: "#f4f4f4",
    padding: "20px",
    borderRadius: "8px",
  },
};

export default App;
