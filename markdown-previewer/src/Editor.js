export const Editor = ({ text, setText }) => {
  return (
    <div className="offset-md-1 col-5">
      <div className="form-group">
      <label htmlFor="exampleFormControlTextarea1">Write your markdown code here:</label>
      <textarea
      className="form-control"
      rows="25"
      resize="none"
      name="text"
      id="editor"
      value={text}
      onChange={(e) => setText(e.target.value)}
      />
        </div>
    </div>
  )
}