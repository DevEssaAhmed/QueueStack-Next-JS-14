import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MarkDownEditor = ({ theme, editorRef, field }: any) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
      onInit={(evt, editor) => {
        // @ts-ignore
        editorRef.current = editor;
      }}
      onBlur={field.onBlur}
      onChange={(content) => field.onChange(content)}
      initialValue=''
      init={{
        height: 300,
        menubar: false,
        // skin: window.matchMedia('(prefers-color-scheme: dark)')
        //   .matches
        //   ? 'oxide-dark'
        //   : 'oxide',
        // content_css: window.matchMedia(
        //   '(prefers-color-scheme: dark)'
        // ).matches
        //   ? 'dark'
        //   : 'default',
        skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
        content_css: theme === 'dark' ? 'dark' : 'default',
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'print',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'codesample',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'paste',
          'help',
          'wordcount',
          'advcode',
        ],
        toolbar:
          'undo redo preview | styles | code codesample |' +
          'bold italic underline strikethrough | ' +
          'forecolor backcolor | alignleft aligncenter alignright alignjustify |' +
          'bullist numlist outdent indent | ' +
          'blockquote | link unlink | image media | ' +
          'table | hr removeformat | help',
        content_style:
          'body { font-family: Inter, Helvetica, Arial, sans-serif; font-size: 16px }',
      }}
    />
  );
};

export default React.memo(MarkDownEditor);
