import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeRegister } from "@lexical/utils"
import { useEffect } from "react"

export function ExamplePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerTextContentListener((text) => {
        console.info({ text });
      })
    );
  }, []);

  return null;
}