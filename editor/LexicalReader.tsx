"use client";

import React, {
  FC,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";

import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes } from "@lexical/html";
import "@/styles/globals.css";

/* Lexical Design System */
import PlaygroundNodes from "./nodes/PlaygroundNodes";

import theme from "@/editor/themes/PlaygroundEditorTheme";

interface Props {
  data: string;
}

async function run(value: string, callback: Dispatch<SetStateAction<string>>) {

  return new Promise((resolve) => {
    const editor = createHeadlessEditor({
      namespace: "Editor",
      theme: theme,
      nodes: [...PlaygroundNodes],
      onError: () => {},
    });
    try {
      const parsedEditorState = editor.parseEditorState(value);
      editor.setEditorState(parsedEditorState);
    } catch (e) {
      console.error("Failed to parse editor state:", e);
    }

    editor.update(() => {
      let html = $generateHtmlFromNodes(editor, null);
      callback(html);
    });
  });
}
const empty =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export const LexicalReader: FC<Props> = ({ data = empty }) => {
  const [content, setContent] = useState(empty);
  useEffect(() => {
    let r = async () => {
      await run(data, setContent);
    };
    r();
  }, [data]);

  return <div dangerouslySetInnerHTML={{ __html: content ?? empty }} />;
};
