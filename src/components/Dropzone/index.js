import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import fotoContent from "../../assets/foto-content.png";

const styleImg = {width:199, height:206}


function Dropzone() {
  const imagem = <img src={fotoContent} />
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => { 
      setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
      })))
    }

  });

  
  const foto = files.map(file => (
    <img key={file.index}
      src={file.preview}
      className="acaoImg"
      style={styleImg}
    />
  ));

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
          <div className="acaoImg">
            {foto.length === 0 ? imagem : foto}
          </div>

    </div>
  )
}
export default Dropzone;