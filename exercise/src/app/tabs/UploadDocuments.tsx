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
import { Filter } from '@mui/icons-material';

interface PdfDetails {
    id: number | null
    name: string | null
    file: File | null
    filePath: any
    displayName: boolean
    
}

const UploadDocuments = () => {
    const [pdfListDetails, setPdfListDetails] = useState<PdfDetails[]>([])
    const [pdfError, setPdfError] = useState('');
    const [pdfToDisplay, setPdfToDisplay] = useState<any>(null)

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];

    const onDrop = useCallback((acceptedFiles: any) => {

        const uploadedFile = acceptedFiles[0];
        const allowedFiles = ['application/pdf'];

        let results: string | ArrayBuffer | null

        if (uploadedFile) {
            if (uploadedFile && allowedFiles.includes(uploadedFile.type)) {

                let reader = new FileReader();
                reader.onload = () => {
                    results = reader.result;
                    setPdfListDetails((prev) => [...prev,
                    {
                        id: prev.length + 1,
                        name: uploadedFile.name,
                        file: uploadedFile,
                        filePath: results,
                        displayName: false
                    }])
                };
                reader.readAsDataURL(uploadedFile);
            }
            else {
                setPdfError('Not a valid pdf: Please select only PDF');
            }
        }
        else {
            console.log('please select a PDF');
        }
    }, []);

    useEffect(() => {
        console.log(pdfToDisplay);
    }, [pdfToDisplay])

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

    const handleNameChange = (id: number | null, newName: string) => {
        setPdfListDetails((prev) =>
            prev.map((pdf) => (pdf.id === id ? { ...pdf, name: newName , displayName: true} : pdf))
        );
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
            {pdfToDisplay !== null && <iframe src={pdfToDisplay} width="500px" height="500px"></iframe>}
            {pdfListDetails && pdfListDetails.map((pdf, index) =>

            (
                <>

                    <MyStack gap={2} key={pdf.id}>

                        <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }} >

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
                                <Button onClick={() => setPdfListDetails((list) => list.filter((item) => item.id !== pdf.id))}>
                                    <DeleteOutlineOutlinedIcon />
                                </Button>
                                <Button onClick={() => setPdfToDisplay(pdf.filePath)}>
                                    <OpenWithIcon />
                                </Button>
                                <Button>

                                    <ExpandLessIcon />
                                </Button>

                            </Stack>
                        </Stack>
                        <Stack direction='row'
                            justifyContent='space-around'
                            sx={{ width: '100%' }}
                            alignItems='center' >

                            <Typography variant='body2' >שם הקובץ<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField 
                            autoFocus 
                             value={pdf.displayName ? pdf.name : ''}
                            onChange={(e) => handleNameChange(pdf.id, e.target.value)}
                                sx={{ width: '900px' }}
                                 placeholder='שם הקובץ שהוזן' />
                        </Stack>
                    </MyStack>


                </>
            )
            )}
        </Box>
    );
}

export default UploadDocuments