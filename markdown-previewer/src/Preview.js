import { marked } from '../node_modules/marked/lib/marked.esm.js';

export const Preview = ({ markdown }) => {

  marked.setOptions({
    breaks: true
  });

  const renderer = new marked.Renderer();

  return (
    <div
    id="preview"
    dangerouslySetInnerHTML={{
      __html: marked(markdown, { renderer: renderer }),
    }}></div>
  )
}