import { EditorState } from "lexical";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Editor } from "./Editor/Editor";
import { emptyInitialState } from "./lib/emptyInitialState";
const LOCAL_STORAGE_KEY = "react-test";

function App() {
  const [editorState, setEditorState] = useState<Object>();

  useEffect(() => {
    const state = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (state) {
      try {
        setEditorState(JSON.parse(state))
      } catch (err) {
        setEditorState(emptyInitialState);
        console.error(err);
      }
    } else {
      setEditorState(emptyInitialState);
    }
  }, [])

  const onChange = useCallback((editorState: EditorState) => {
    console.log(editorState.toJSON());
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(editorState.toJSON())
    );
  }, [])

  if (!editorState) return null;
  return <Editor initialState={editorState} onChange={onChange} />;
}

export default App;
