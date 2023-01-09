import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    if (isGenerating) return;

    setIsGenerating(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  return (
    <div className="root">
      <Head>
        <title>Sebel X Aristotle</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Talk to Aristotle, a Greek philosopher</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Write a message to Aristotle, ask him about anything (ex. what’s
              the meaning of life, etc)
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="What's your favorite book?"
            className="prompt-box"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <div className="prompt-buttons">
            <button
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              disabled={isGenerating}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </button>
          </div>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>

      <div className="badge-container">
        <div className="badge">
          <Image
            src={buildspaceLogo}
            width={21}
            height={17}
            alt="buildspace logo"
          />

          <p>
            <a
              href="https://buildspace.so/builds/ai-writer"
              target="_blank"
              rel="noreferrer"
            >
              <span>build with buildspace</span>
            </a>
            <a
              href="https://twitter.com/sabilimawlana"
              target="_blank"
              rel="noreferrer"
            >
              <span> by sabilimaulana</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
