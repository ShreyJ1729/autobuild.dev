import "./App.css";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [resultHTML, setResultHTML] = useState("");
  const [loading, setLoading] = useState(false);
  const [htmlHistory, setHtmlHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(0);
  const url = "https://shreyj1729--autobuild-run-query-dev.modal.run";

  const handleSendMessage = (message) => {
    if (!message) return;
    let m = message;
    setMessage("");
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: m, html: resultHTML }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResultHTML(data);
        setHtmlHistory([...htmlHistory, data]);
        setHistIndex(histIndex + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && (
        <div className="relative">
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}

      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: resultHTML }}
      ></div>

      <div className="fixed bottom-0 left-0 flex items-center justify-center w-full h-20 bg-gray-100">
        <div className="relative flex w-9/12">
          <button
            className="flex items-center justify-center mx-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-red-500 text-white hover:bg-red-600"
            onClick={() => {
              setResultHTML("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />{" "}
            </svg>
          </button>
          <button
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              if (histIndex > 0) {
                setHistIndex(histIndex - 1);
                setResultHTML(htmlHistory[histIndex - 1]);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            className="flex items-center justify-center mr-2 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              if (histIndex < htmlHistory.length - 1) {
                setHistIndex(histIndex + 1);
                setResultHTML(htmlHistory[histIndex + 1]);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-full"
            placeholder="Enter text..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && message && handleSendMessage(message)
            }
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
