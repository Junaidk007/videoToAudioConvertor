import { useRef } from 'react';

function UploadBox({ setFile}) {
    const fileInputRef = useRef(null);

    const handleInp = () => {
        fileInputRef.current?.click();
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('video/')) {
                alert('Please select a video file');
                return;
            }
        }
        setFile(file);
    }

    return (
        <div className="uploadBox">
            <div className="uploadIcon">
                <button type="button" className="circle" onClick={handleInp} aria-label="Choose a video file">
                    <i className="fa-solid fa-upload"></i>
                </button>
                <input ref={fileInputRef} type="file" id="fileinp" accept="video/*" onChange={handleChange} hidden />
            </div>
            <div className="uploadText">
                <h3>Upload Video</h3>
            </div>
        </div>
    );
}

export default UploadBox;
