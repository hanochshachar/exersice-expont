'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Viewer } from '@react-pdf-viewer/core';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, Paper, Input } from '@mui/material';
import FilterDramaRoundedIcon from '@mui/icons-material/FilterDramaRounded';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import packageJson from '../../../package.json';

const UploadDocuments = () => {
    // const [file, setFile] = useState<string | null>(null);
    const [pdfFile, setPdfFile] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [pdfError, setPdfError] = useState('');
    const [pdfPath, setPdfPath] = useState<any>()

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];


    // const handleFileChange = (event: any) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //       setPdfFile(file)
    //       setFileName(file.name)
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         setPdfPath(reader.result);
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   };

    const onDrop = useCallback((acceptedFiles: any) => {
        const uploadedFile = acceptedFiles[0];
        const allowedFiles = ['application/pdf'];
        // setPdfPath(uploadedFile.path);

        if (uploadedFile) {
            if (uploadedFile && allowedFiles.includes(uploadedFile.type)) {
                setFileName(uploadedFile.name);
                let reader = new FileReader();
                reader.onload = () => {
                    setPdfPath(reader.result);
                };
                reader.readAsDataURL(uploadedFile);
            }
            else {
                setPdfError('Not a valid pdf: Please select only PDF');
                setPdfFile('');
            }
        }
        else {
            console.log('please select a PDF');
        }
    }, []);

    useEffect(() => {
        console.log(pdfPath);



    }, [pdfPath])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Paper
                {...getRootProps()}
                sx={{
                    width: '100%',
                    padding: 2,
                    textAlign: 'center',
                    border: '2px dashed #ccc',
                    backgroundColor: isDragActive ? '#f0f0f0' : '#fafafa',
                    cursor: 'pointer'
                }}
            >
                <input {...getInputProps()} />
                <FilterDramaRoundedIcon sx={{
                    width: '168px',
                    height: '128px',
                    border: '1px solid #FFFFFF',
                    borderRadius: '50%',
                    backgroundColor: '#EAF2FF'
                }} />
                <FileUploadOutlinedIcon sx={{
                    position: 'absolute',
                    backgroundColor: '#EAF2FF',
                    border: '6px solid #FFFFFF',
                    borderRadius: '50%',
                    color: '#3872DC',
                    padding: '.7px',
                    left: '48.3vw',
                    top: '190%'
                }} />

                <Typography variant="h6">
                    לחץ כאן או גרור קובץ להעלאה
                </Typography>

            </Paper>
            {/* <Button
                variant="contained"
                component="label"
            >
                Upload PDF
                <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={handleFileChange}
                />
            </Button> */}
            {pdfPath && (
                <>
                    <Typography variant="h6" sx={{ mt: 2 }}>{fileName}</Typography>

                    {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
                        <Viewer fileUrl={`/${pdfPath}`}
                            plugins={[defaultLayoutPluginInstance]}></Viewer>
                    </Worker> */}
                    {/* <Document file={pdfPath}>
                        <Page pageNumber={1} />
                    </Document> */}
                    <iframe src={pdfPath} width="500px" height="500px"></iframe>

                </>
            )}
        </Box>
    );
}

export default UploadDocuments