import { useState } from 'react'
import './App.css'
import UploadBox from './UploadBox'
import UploadFile from './UploadFile';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blobURL, setBlobURL] = useState(null);

  const handleSubmit = async () => {

    // ✅ FormData created fresh inside handler, not outside component
    const formData = new FormData();
    formData.append('video', file);

    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Conversion failed');
      }

      // ✅ get binary blob from response
      const blob = await response.blob();
      setBlobURL(window.URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

    const handleDownload = () => {
    if (blobURL) {
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobURL;
      a.download = 'converted_audio.mp3';
      document.body.appendChild(a);
      a.click();
    } else {
      alert('No audio file available to download');
    }
  }

  return (
    <div className='app'>
      <header className="hero">
        <h1>Video to MP3</h1>
      </header>
      <div className="glassmorfismBox">
        {file || blobURL ? <UploadFile file={file} setFile={setFile} handleSubmit={handleSubmit} loading={loading} blobURL={blobURL} handleDownload={handleDownload} setBlobURL={setBlobURL} /> : <UploadBox setFile={setFile} />}
      </div>
    </div>
  )
}

export default App
