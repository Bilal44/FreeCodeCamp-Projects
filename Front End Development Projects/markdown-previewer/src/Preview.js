import { marked } from '../node_modules/marked/lib/marked.esm.js';

export const Preview = ({ markdown }) => {

  marked.setOptions({
    breaks: true
  });

  return (
    <div className="form-group col-5 auto">
      <label>Preview the result here:</label>
      <div
        type="input"
        className="rounded"
        id="preview"
        dangerouslySetInnerHTML={{
          __html: marked(markdown)
        }}
      />
    </div>
  )
}