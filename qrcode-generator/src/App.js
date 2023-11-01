
import { useState, createRef } from 'react';
import QRCode from 'qrcode.react';
import './App.css';


function App() {

    const [content, setContent] = useState('Set your content here!');
    const [size, setSize] = useState(512);
    const [level, setLevel] = useState('M');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [fgColor, setFgColor] = useState('#000000');

    const ref = createRef();

    const downloadQRCode = e => {
        const svg = ref.current.querySelector("svg");
        const svgXML = new XMLSerializer().serializeToString(svg);
        const dataUrl = "data:image/svg," + encodeURIComponent(svgXML);

        const anchor = document.createElement("a");
        anchor.href = dataUrl;
        anchor.download = `qr-code.svg`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };


    return (
        <div className='app d-flex flex-column p-3'>
            <h1>Qrcode generator</h1>
            <div className='flex-grow-1 overflow-hidden d-flex flex-row'>
                <div className='data-in p-2'>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea className="form-control" style={{height:150}} value={content} onChange={e => setContent(e.target.value)}></textarea>
                    </div>
                    <div className='form-group pt-2'>
                        <label className="form-label">SVG Size ({size}px)</label>
                        <input type="range" className="form-range" min={128} max={2048} value={size} onChange={e => setSize(e.target.value)} />
                    </div>
                    <div className='form-group pt-2'>
                        <label className="form-label">Error correction level</label>
                        <select className="form-select" onChange={e => setLevel(e.target.value)} value={level}>
                            <option value="L">L (Max 7% errors)</option>
                            <option value="M">M (Max 15% errors)</option>
                            <option value="Q">Q (Max 25% errors)</option>
                            <option value="H">H (Max 30% errors)</option>
                        </select>
                    </div>
                    <div className='form-group pt-2'>
                        <label className="form-label">Background color</label>
                        <input type='text' className="form-control" value={bgColor} onChange={e => setBgColor(e.target.value)}></input>
                    </div>
                    <div className='form-group pt-2'>
                        <label className="form-label">Foreground color</label>
                        <input type='text' className="form-control" value={fgColor} onChange={e => setFgColor(e.target.value)}></input>
                    </div>
                    <div className='pt-3'>
                        <button type="button" class="btn btn-primary" onClick={downloadQRCode}>Download SVG</button>
                    </div>
                </div>
                <div className='data-out p-2 ' ref={ref} >
                    {content && <QRCode value={content} renderAs='svg' includeMargin={true} size={size} level={level} bgColor={bgColor} fgColor={fgColor} />}
                </div>
            </div>
        </div>
    );
}

export default App;
