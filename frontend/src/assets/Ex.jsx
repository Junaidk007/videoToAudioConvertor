import { useState } from 'react'

function Ex() {
  const [file, setFile] = useState(null);
  // const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [blobURL, setBlobURL] = useState(null);

  const handleUpload = (e) => {
    setFile(e.target.files[0]); // ✅ store file in state
  }

  const handleSubmit = async () => {
    if (!file) return alert('Please select a video file first');

    // ✅ FormData created fresh inside handler, not outside component
    const formData = new FormData();
    formData.append('video', file);

    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
        // ✅ do NOT set Content-Type header — browser sets it automatically
        //    with the correct boundary for multipart/form-data
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
      a.remove();
      URL.revokeObjectURL(blobURL);
      setBlobURL(null);
    } else {
      alert('No audio file available to download');
    }
  }

  return (
    <>
      <div>
        <h4>Upload a video</h4>
        <input type="file" accept="video/*" onChange={handleUpload} />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Converting...' : 'Upload & Convert'}
        </button>
        <br /><br />
        {loading && <p>Converting, please wait...</p>}
        {blobURL && (
          <div>
            <p>Conversion complete!</p>
            <br />
            <audio controls src={blobURL} />
            <br />
            <button onClick={handleDownload}>Download Audio</button>
          </div>
        )}
      </div>
    </>
  )
}

export default Ex;