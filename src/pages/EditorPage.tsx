import React from "react";
import { Editor } from "../components/editor/Editor";
import { EditorProvider } from "../components/editor/EditorContext";

const EditorPage = () => {
    return (
        <EditorProvider>
            <h1>Editor</h1>
            <Editor />
        </EditorProvider>
    );
};

export default EditorPage;
