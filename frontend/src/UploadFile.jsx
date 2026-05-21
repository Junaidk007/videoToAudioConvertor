import './uploadFile.css'
import CircularProgress from '@mui/material/CircularProgress';

function UploadFile({ file, setFile, handleSubmit, loading, blobURL, handleDownload, setBlobURL }) {

    const handleCancel = () => {
        setFile(null);
        if (blobURL) {
            URL.revokeObjectURL(blobURL);
            setBlobURL(null);
        }
    }

    return (
        <div className="uploadBox">
            <div className="fileInfo">
                <div className="fileIcon">
                    <i className="fa-solid fa-video"></i>
                </div>
                <div className="fileMeta">
                    <h3 title={file.name}>{file.name}</h3>
                    <p>{file.type} · {Math.round(file.size / (1024 * 1024))} MB</p>
                </div>
                <div className='circleCross' onClick={handleCancel}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="actions">
                {blobURL ? (
                    <button type="button" className="uploadBtn" onClick={handleDownload}>
                        Download Audio
                    </button>
                ) : (
                    <>
                        <button type="button" className="cancelBtn" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="button" className="uploadBtn" onClick={handleSubmit} disabled={loading}>
                            {
                                loading ? <CircularProgress size={20} color="inherit" /> :
                                    <>
                                        <i className="fa-solid fa-cloud-arrow-up"></i>
                                        <span>Upload</span>
                                    </>
                            }
                        </button>
                    </>
                )}
            </div>
        </div>

    );
}

export default UploadFile;
