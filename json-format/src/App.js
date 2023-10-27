import { useState, useEffect,  } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import LZString from 'lz-string';   
import './App.css';

function App() {

   
  

    const [text, setText] = useState();
    const [alert, setAlert] = useState();

    useEffect(() => {
        const searchParams = new URLSearchParams(document.location.search);
        const valueFromQueryString = searchParams.get('json');
        if (valueFromQueryString){
            const inflated = LZString.decompressFromEncodedURIComponent(valueFromQueryString);
            setText(inflated);
        }
    },[])

    useEffect(() => {
        if (alert?.disposable){
            setTimeout(() => {
                setAlert(null);
            }, 2000);
        }
    },[alert])

    /*useEffect(() => {
        try{
            const obj = parseText();
            const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(obj));
            console.log(text.length, compressed.length);
        }catch(e){}
    },[text])*/
    /**
     * Tries to parse the text as json
     * @returns 
     */
    function parseText(){
        setAlert(null);     

        // Double json-ified strings, like some json stored in databases as strings (I'm looking at you, mongo!)
        // Playing around with initial and final \" to overcome copy-paste errors
        try{
            return JSON.parse(JSON.parse(text));
        }catch(e){
            console.log("Double JSON.parse failed: "+e.message);
        }
        try{
            return JSON.parse(JSON.parse("\""+text+"\""));
        }catch(e){
            console.log("Double JSON.parse with initial and final \" failed: "+e.message);
        }
        try{
            return JSON.parse(JSON.parse("\""+text));
        }catch(e){
            console.log("Double JSON.parse with initial \" failed: "+e.message);
        }
        try{
            return JSON.parse(JSON.parse(text+"\""));
        }catch(e){
            console.log("Double JSON.parse with final \" failed: "+e.message);
        }
        
        // Standard json
        try{
            return JSON.parse(text);
        }catch(e){
            console.log("Simple JSON.parse failed: "+e.message);
        }

        setAlert({type:'error', message:"Cannot decode json"});
        throw new Error("Invalid json")
    }

    function toObject(){
        try{
            const obj = parseText();
            setText(JSON.stringify(obj, null, 2));
        }catch(e){}
    }

    function toString(){
        try{
            const obj = parseText();
            setText(JSON.stringify(obj));
        }catch(e){}
    }

    
    function toStringDouble(){
        try{
            const obj = parseText();
            setText(JSON.stringify(JSON.stringify(obj)));
        }catch(e){}
    }

    function linkToThisJson(){
        const deflated = LZString.compressToEncodedURIComponent(text);
        const url = new URL(window.location.href);
        const link = url.origin+url.pathname+"?json="+deflated;
        navigator.clipboard.writeText(link);
        setAlert({disposable:true, type:'success', message:"Link copied to clipboard."});
    }


    return (
        <div className="App">
            <h3>Json format</h3>
            Tries to encode/decode a json in various flavous
            <div className={'json-code'}>
                <AceEditor
                    mode="json"
                    theme="github"
                    value={text}
                    width='100%'
                    height='100%'
                    
                    onChange={(value) => setText(value)}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true,useWorker: false, showLineNumbers: true}}
                />
            </div>
            {alert && <div className={`mt-2 mb-0 alert alert-${alert.type}`} role="alert">
                    {alert.message}
            </div>}
        
            <div className='mt-2'>
                <button className='btn btn-secondary me-2' onClick={toObject}>To object</button>
                <button className='btn btn-secondary me-2' onClick={toString}>Stringify</button>
                <button className='btn btn-secondary me-2' onClick={toStringDouble}>Double stringify</button>
                <button className='btn btn-secondary me-2' onClick={linkToThisJson}>Generate link to this json</button>
            </div>
        </div>
    );
}

export default App;
