import React from "react";
import { Grid } from "../components/editor/Grid";
import { EditorProvider } from "../components/editor/EditorContext";

const EditorPage = () => {
    return (
        <EditorProvider>
            <h1>Editor</h1>
            <Grid />
        </EditorProvider>
    );
};

export default EditorPage;
