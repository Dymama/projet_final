import React, { Component,useState } from "react";
import RichTextEditor, { stateToHTML } from "react-rte";
import parse from 'html-react-parser';


const RichTextEditorC = (props) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const onChange = (value) => {
    setValue(value);
    if (props.onChange) {
      props.onChange(value.toString('html'));
    }
  };

  return <RichTextEditor 
        style={{ minHeight: 410,maxWidth:200 }}
        multiline value={value}
         onChange={onChange} />
};


export default RichTextEditorC;

