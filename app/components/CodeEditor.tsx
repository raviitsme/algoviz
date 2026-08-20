"use client";

import React, { useEffect, useRef } from "react";
import { Editor, OnMount } from "@monaco-editor/react";

interface CodeProps {
  code?: string;
  setCode: (value: string) => void;
  language?: string;
}

const DEFAULT_CPP_CODE = `#include <bits/stdc++.h>

using namespace std;

int main() {
    vector<int> v = {10, 20, 30};
    cout << "Hello AlgoViz!" << endl;
    return 0;
}
`;

export default function CodeEditor({
  code,
  setCode,
  language = "cpp",
}: CodeProps) {
  const wsRef = useRef<WebSocket | null>(null);
  const requestIdRef = useRef<number>(1);
  const pendingRequestsRef = useRef<Map<number, (value: any) => void>>(
    new Map()
  );
  const versionRef = useRef<number>(1);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleOnMount: OnMount = (editor, monaco) => {
    if (typeof window === "undefined") return;

    console.log("🔌 Connecting to clangd WebSocket...");

    const ws = new WebSocket("ws://localhost:3001/clangd");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("⚡ Connected to clangd LSP server!");

      // 1. Initialize LSP
      ws.send(
        JSON.stringify({
          jsonrpc: "2.0",
          id: requestIdRef.current++,
          method: "initialize",
          params: {
            processId: null,
            rootUri: "file:///workspace",
            capabilities: {
              textDocument: {
                completion: {
                  completionItem: { snippetSupport: false },
                },
              },
            },
          },
        })
      );

      // 2. Open Document
      ws.send(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "textDocument/didOpen",
          params: {
            textDocument: {
              uri: "file:///workspace/main.cpp",
              languageId: "cpp",
              version: versionRef.current++,
              text: editor.getValue(),
            },
          },
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.id && pendingRequestsRef.current.has(data.id)) {
          const resolve = pendingRequestsRef.current.get(data.id);
          if (resolve) resolve(data.result);
          pendingRequestsRef.current.delete(data.id);
        }
      } catch (err) {
        // Ignore non-json logs
      }
    };

    const sendDocChange = () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            jsonrpc: "2.0",
            method: "textDocument/didChange",
            params: {
              textDocument: {
                uri: "file:///workspace/main.cpp",
                version: versionRef.current++,
              },
              contentChanges: [{ text: editor.getValue() }],
            },
          })
        );
      }
    };

    // 3. Register Completion Provider
    monaco.languages.registerCompletionItemProvider("cpp", {
      triggerCharacters: [".", ">", ":"],
      provideCompletionItems: (model: any, position: any) => {
        return new Promise((resolve) => {
          if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            return resolve({ suggestions: [] });
          }

          sendDocChange();

          const reqId = requestIdRef.current++;
          const wordInfo = model.getWordUntilPosition(position);

          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: wordInfo.startColumn,
            endColumn: wordInfo.endColumn,
          };

          pendingRequestsRef.current.set(reqId, (result: any) => {
            if (!result) return resolve({ suggestions: [] });

            const items = Array.isArray(result) ? result : result.items || [];
            const suggestions = items.map((item: any) => {
              let labelStr = typeof item.label === "string" ? item.label : item.label.label || "";
              let insertText = item.insertText || labelStr;

              // Clean snippets
              insertText = insertText
                .replace(/\$\{\d+:(.*?)\}/g, "$1")
                .replace(/\$\d+/g, "");

              return {
                label: labelStr,
                kind: monaco.languages.CompletionItemKind.Method,
                insertText: insertText,
                detail: item.detail || "",
                documentation: item.documentation || "",
                range: range,
                sortText: item.sortText || labelStr,
                filterText: labelStr,
              };
            });

            resolve({ suggestions });
          });

          setTimeout(() => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              wsRef.current.send(
                JSON.stringify({
                  jsonrpc: "2.0",
                  id: reqId,
                  method: "textDocument/completion",
                  params: {
                    textDocument: { uri: "file:///workspace/main.cpp" },
                    position: {
                      line: position.lineNumber - 1,
                      character: position.column - 1,
                    },
                  },
                })
              );
            }
          }, 30);
        });
      },
    });

    editor.onDidChangeModelContent(() => {
      sendDocChange();
    });
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="w-full h-[70vh] rounded-lg overflow-hidden border border-slate-700 shadow-lg">
      <Editor
        height="100%"
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue={DEFAULT_CPP_CODE}
        value={code !== undefined && code !== "" ? code : DEFAULT_CPP_CODE}
        onChange={handleEditorChange}
        onMount={handleOnMount}
        path="file:///workspace/main.cpp"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          autoClosingBrackets: "always",
          automaticLayout: true,
          tabSize: 4,
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          suggestOnTriggerCharacters: true,
          wordBasedSuggestions: "off",
        }}
      />
    </div>
  );
}