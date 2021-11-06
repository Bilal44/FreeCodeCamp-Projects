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
  func() {
    return -1
  }
  \`\`\`
  \* list item 1
  \* list item 2
  \> blockquote\n
  an image like ![freeCodeCamp Logo](https://cdn.changelog.com/uploads/icons/news_sources/Qo/icon_small.png)
  and finally some **bolded text**`

  var [text, setText] = React.useState(placeHolderText);

  return (
    <div className="App">
      <h1> Markdown Previewer</h1>
      <Editor text={text} setText={setText} />
      <Preview markdown={text} />
    </div>
  );

}

export default App;
