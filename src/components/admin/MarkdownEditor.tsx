"use client";

import EasyMDE, { Options } from "easymde";
import "easymde/dist/easymde.min.css";
import { useEffect, useRef } from "react";

/**
 * Props para o Editor
 * - value: o valor atual do markdown
 * - onChange: callback para atualizar o valor
 * - options: configurações extras do EasyMDE
 * - isDark: se true, aplica a classe "dark-mode-easymde" no wrapper do editor
 */
interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  options?: Options;
  isDark?: boolean;
}

/**
 * Componente Editor isolado, que instancia o EasyMDE apenas uma vez
 * e atualiza o valor do editor ao mudar a prop value, sem perder o foco.
 */
export function MarkdownEditor({
  value,
  onChange,
  options,
  isDark,
}: MarkdownEditorProps) {
  const editorRef = useRef<EasyMDE | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Instancia o EasyMDE uma única vez ao montar.
  useEffect(() => {
    if (!textareaRef.current) return;

    editorRef.current = new EasyMDE({
      element: textareaRef.current,
      initialValue: value,
      ...options,
    });

    // Listener de mudança de conteúdo
    editorRef.current.codemirror.on("change", () => {
      const text = editorRef.current?.value() ?? "";
      onChange(text);
    });

    // Cleanup para quando o componente for desmontado
    return () => {
      editorRef.current?.toTextArea();
      editorRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ajusta a classe para dark mode (se isDark = true)
  useEffect(() => {
    const wrapper = editorRef.current?.codemirror.getWrapperElement();
    if (!wrapper) return;

    if (isDark) {
      wrapper.classList.add("dark-mode-easymde");
    } else {
      wrapper.classList.remove("dark-mode-easymde");
    }
  }, [isDark]);

  // Se a prop "value" mudar externamente, atualiza o editor sem recriá-lo
  useEffect(() => {
    if (editorRef.current && editorRef.current.value() !== value) {
      editorRef.current.value(value);
    }
  }, [value]);

  return <textarea ref={textareaRef} />;
}
