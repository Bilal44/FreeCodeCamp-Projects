import './App.css';
import React from 'react';
import { Preview } from './Preview';
import { Editor } from './Editor';


const App = () =>  {

  const placeHolderText = `This is a sameple text of:
  # H1 Heading
  ## H2 sub header
  [GitHub Porfolio](https//bilal44.github.io) link
  \`inline code\`
  \`\`\`
  CODEBLOCK
  func() {
    return -1
  }
  \`\`\`
  * list item 1
  * list item 2
  > blockquote of
  text
  an image like ![freeCodeCamp Logo](https://cdn.iconscout.com/icon/free/png-256/free-codecamp-3445596-2878528.png)
  and finally some **bolded text**`

  var [text, setText] = React.useState(placeHolderText);

  return (
    <div className="App">
      <h2 className="text-center mt-4"> Markdown Previewer</h2>
      <div className="row">
      <Editor text={text} setText={setText} />
      <Preview markdown={text} />
      </div>
    </div>
  );

}

export default App;
