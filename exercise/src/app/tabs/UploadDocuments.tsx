'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Viewer } from '@react-pdf-viewer/core';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, Paper, Input, Stack, styled, TextField } from '@mui/material';
import FilterDramaRoundedIcon from '@mui/icons-material/FilterDramaRounded';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import packageJson from '../../../package.json';
import Image from 'next/image';
import pdfIcon from '../../../public/pdfImage.png';

interface PdfDetails {
    id: Number | null
    name: String | null
    file: File | null,
    filePath: String | ArrayBuffer | null
}

const UploadDocuments = () => {
    const [pdfListDetails, setPdfListDetails] = useState<PdfDetails[]>([])
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [pdfError, setPdfError] = useState('');
    const [pdfPath, setPdfPath] = useState<string | ArrayBuffer | null>()

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];


    

    const onDrop = useCallback((acceptedFiles: any) => {

        const uploadedFile = acceptedFiles[0];
        const allowedFiles = ['application/pdf'];
        setPdfFile(uploadedFile);

        let results: string | ArrayBuffer | null

        if (uploadedFile) {
            if (uploadedFile && allowedFiles.includes(uploadedFile.type)) {
                // setFileName(uploadedFile.name);
                let reader = new FileReader();
                reader.onload = () => {
                    results = reader.result;
                };
                reader.readAsDataURL(uploadedFile);
                setPdfListDetails((prev) => [...prev,
                     {id: prev.length + 1,
                        name: uploadedFile.name,
                        file: uploadedFile,
                        filePath: results,
                     }])
            }
            else {
                setPdfError('Not a valid pdf: Please select only PDF');
                setPdfFile(null);
            }
        }
        else {
            console.log('please select a PDF');
        }
    }, []);

    useEffect(() => {
        console.log(pdfPath);
    }, [pdfPath])

    const MyStack = styled(Stack)({
        border: '1px solid #E8EAED',
        borderRadius: '16px',
        width: '80%',
        padding: '1.5rem',
        
        marginBottom: '1.5rem',
        backgroundColor: '#F9FAFB'
        
    })

    const formatFileSize = (size: any) => {
        if (size < 1024) return `${size} bytes`;
        if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
        return `${(size / 1048576).toFixed(2)} MB`;
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper
                {...getRootProps()}
                sx={{
                    width: '80%',
                    padding: 2,
                    textAlign: 'center',
                    border: '2px dashed #ccc',
                    backgroundColor: isDragActive ? '#f0f0f0' : '#fafafa',
                    cursor: 'pointer',
                    marginBottom: '2rem'
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
                    top: '186%'
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
            { pdfListDetails && pdfListDetails.map((pdf) => 

            (
                <>

                <MyStack gap={2}>

                    <Stack direction='row' justifyContent='space-between' sx={{width: '100%'}} >

                        <Stack direction='row' alignItems='center' justifyContent='space-around' gap={2}>

                            <Box >
                                <Image
                                    src={pdfIcon}
                                    alt="PDF Preview"
                                    width={15}
                                    height={15}
                                />
                            </Box>
                            <Typography variant="body2" >{pdf.name}</Typography>
                            <Typography variant="body2">{formatFileSize(pdf.file?.size)}</Typography>
                        </Stack>

                        <Stack direction='row' alignItems='center' justifyContent='space-around' gap={1}>
                            <DeleteOutlineOutlinedIcon />
                            <OpenWithIcon />
                            <ExpandLessIcon />
                        </Stack>
                    </Stack>
                    <Stack direction='row'
                     justifyContent='space-around'
                      sx={{width: '100%'}}
                      alignItems='center' >

                    <Typography variant='body2' >שם הקובץ<span style={{color: 'red'}}>*</span></Typography>
                    <TextField sx={{ width: '900px'}} placeholder='שם הקובץ שהוזן'/>
                    </Stack>
                </MyStack>
                    {/* <iframe src={pdfPath} width="500px" height="500px"></iframe> */}

                </>
            )
            ) }
        </Box>
    );
}

export default UploadDocuments