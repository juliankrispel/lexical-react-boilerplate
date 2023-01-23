import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { createEmptyHistoryState, HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import ErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { EditorState, ParagraphNode } from "lexical";

export function Editor({
  initialState,
  onChange,
}: {
  initialState: Object;
  onChange?: (editorState: EditorState) => void;
}) {
  const history = createEmptyHistoryState();
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "test",
        nodes: [ParagraphNode],
        editorState: JSON.stringify(initialState),
        theme: {
          text: {
            underline: /*tw*/ "underline",
          },
        },
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <OnChangePlugin
        ignoreSelectionChange
        onChange={(editorState) => {
          if (onChange) onChange(editorState);
        }}
      />
      <ClearEditorPlugin />
      <RichTextPlugin
        placeholder={<>Type something</>}
        contentEditable={
          <ContentEditable className="fixed top-0 bg-slate-200 bg-opacity-75 border-b w-full h-full text-lg p-8" />
        }
        ErrorBoundary={ErrorBoundary}
      />
      <HistoryPlugin externalHistoryState={history} />
    </LexicalComposer>
  );
}