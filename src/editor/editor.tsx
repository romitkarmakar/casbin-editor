import React, { CSSProperties, useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { get, Persist, set } from './persist';

import * as codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/display/placeholder';
import './casbin-mode/casbin-conf';
import './casbin-mode/casbin-csv';

interface CasbinCodeMirror {
  model: string;
  options: codemirror.EditorConfiguration;
  style?: CSSProperties;
  onChange: (text: string) => void;
  persist: Persist;
}

interface EditorProps {
  model: string;
  onChange?: (text: string) => void;
  style?: CSSProperties;
}

const CasbinCodeMirror = (props: CasbinCodeMirror) => {
  const [value, setValue] = useState(get(props.persist, props.model));

  const { model, onChange, persist } = props;

  useEffect(() => {
    const modelText = get(persist, model);
    setValue(modelText);
    onChange(modelText);
  }, [model, persist, onChange]);

  return (
    <div style={props.style}>
      <CodeMirror
        onBeforeChange={(editor, data, value) => {
          setValue(value);
          props.onChange(value);
          set(props.persist, value);
        }}
        options={props.options}
        value={value}
      />
    </div>
  );
};

CasbinCodeMirror.defaultProps = {
  onChange: () => {}
};

export const CustomFunctionEditor = (props: EditorProps) => {
  return (
    <CasbinCodeMirror
      persist={Persist.CUSTOM_FUNCTION}
      options={{
        lineNumbers: true,
        indentUnit: 4,
        styleActiveLine: true,
        matchBrackets: true,
        mode: 'javascript',
        lineWrapping: true,
        theme: 'monokai'
      }}
      {...props}
    />
  );
};

export const ModelEditor = (props: EditorProps) => {
  return (
    <CasbinCodeMirror
      persist={Persist.MODEL}
      options={{
        lineNumbers: true,
        indentUnit: 4,
        styleActiveLine: true,
        matchBrackets: true,
        mode: 'casbin-conf',
        lineWrapping: true,
        theme: 'monokai'
      }}
      {...props}
    />
  );
};

export const PolicyEditor = (props: EditorProps) => {
  return (
    <CasbinCodeMirror
      persist={Persist.POLICY}
      options={{
        lineNumbers: true,
        indentUnit: 4,
        styleActiveLine: true,
        matchBrackets: true,
        mode: 'casbin-csv',
        lineWrapping: true,
        theme: 'monokai'
      }}
      {...props}
    />
  );
};

export const RequestEditor = (props: EditorProps) => {
  return (
    <CasbinCodeMirror
      persist={Persist.REQUEST}
      options={{
        lineNumbers: true,
        indentUnit: 4,
        styleActiveLine: true,
        matchBrackets: true,
        mode: 'casbin-csv',
        lineWrapping: true,
        theme: 'monokai'
      }}
      {...props}
    />
  );
};

interface RequestResultEditorProps {
  value: string;
  style?: CSSProperties;
}

export const RequestResultEditor = (props: RequestResultEditorProps) => {
  return (
    <div style={props.style}>
      <CodeMirror
        onBeforeChange={() => {}}
        value={props.value}
        options={{
          readOnly: true,
          indentUnit: 4,
          styleActiveLine: true,
          matchBrackets: true,
          mode: 'javascript',
          lineWrapping: true,
          theme: 'monokai'
        }}
      />
    </div>
  );
};
