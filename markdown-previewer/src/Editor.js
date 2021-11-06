export const Editor = ({ text, setText }) => {
  return (
    <textarea
    name="text"
    id="editor"
    rows="10"
    className="textarea"
    value={text}
    onChange={(e) => setText(e.target.value)} />
  )
}