import React, { useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import { Typography, Button } from "@material-ui/core";

const Dropzone = ({
  onBibtexFileRead
}) => {

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        if (typeof (onBibtexFileRead) === "function") {
          onBibtexFileRead(reader.result);
        }
      };

      reader.readAsText(file);
    });
  }, []);

  const {
    getRootProps, getInputProps, isDragActive
  } = useDropzone({ onDrop });

  return (
    <Button color="primary" variant="outlined" fullWidth>
      <div {...getRootProps()} style={{
        width: "100%",
        height: "100%",
      }}>
        <input {...getInputProps()}/>
        {
          isDragActive ?
            <Typography>Drop file</Typography> :
            <Typography>Drag and drop Bibtex file here</Typography>
        }
      </div>
    </Button>
  );
};
export default Dropzone;
