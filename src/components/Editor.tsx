import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Editor as MonacoEditor, loader } from '@monaco-editor/react'
import JSONWorker from 'url:monaco-editor/esm/vs/language/json/json.worker.js'
import TSWorker from 'url:monaco-editor/esm/vs/language/typescript/ts.worker.js'
import EditorWorker from 'url:monaco-editor/esm/vs/editor/editor.worker.js'

self.MonacoEnvironment = {
  getWorkerUrl(moduleId, label) {
    if (label === 'json')
      return JSONWorker

    if (label === 'typescript' || label === 'javascript')
      return TSWorker

    return EditorWorker
  },
}

async function init() {
  const monaco = await import('monaco-editor/esm/vs/editor/editor.api')
  await Promise.all([
    import('monaco-editor/esm/vs/editor/editor.all'),
    import('monaco-editor/esm/vs/language/json/monaco.contribution'),
    import('monaco-editor/esm/vs/language/typescript/monaco.contribution'),
    import('monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution'),
    import('monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'),
  ])
  return monaco
}

interface Props {
  height?: number
  language?: string

  [k: string]: any
}

const Editor: FC<Props> = (props) => {
  const [monacoLoaded, setMonocoLoaded] = useState<unknown>(null)
  useEffect(() => {
    if (!monacoLoaded) {
      void init().then((monaco) => {
        setMonocoLoaded(monaco)
        loader.config({ monaco })
      })
    }
  }, [monacoLoaded])
  if (!monacoLoaded)
    return <p className='p-4 text-slate-400'>编辑器加载中...</p>
  return <MonacoEditor
    {...props}
  />
}

export default Editor
