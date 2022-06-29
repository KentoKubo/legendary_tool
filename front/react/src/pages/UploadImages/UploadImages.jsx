import React, {useState} from 'react'
import {Box, Button} from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FlatButton from '../../components/FlatButton';

const UploadImages = () => {
    const [images, setImages] = useState([])

    const handleOnAddImage = (event) => {
		if (!event.target.files) return
        setImages([...images, ...event.target.files])
	}

    return (
        <Box>
            <Box sx={{ width: "70%", height: "50%", display: "flex", mx: "auto", textAlign: "center", alignItems: "center",justifyContent: "center", backgroundColor: "#f5f5f5", border: "2px solid #a8a8a8", color: "#a8a8a8" }}>
                <Box>
                    <CloudUploadIcon sx={{ fontSize: "100px"}}/>
                    <p>画像のアップロード（10枚まで）</p>
                    <label htmlFor="form-id">
                        <Button
                            variant="text"
                            disabled={images.length >= 10}
                            component="span"
                            sx={{ color: "#a8a8a8" }}
                        >
                            <p>ファイルを開く</p>
                        </Button>
                        <input
                            id="form-id"
                            type="file"
                            multiple
                            accept="image/*,.png,.jpg,.jpeg,.gif"
                            onChange={(event) =>
                                handleOnAddImage(event)
                            }
                            style={{ display: "none" }}
                        />
                    </label>
                </Box>
            </Box>
            <FlatButton text="つくる" onclick={console.log("aaa")} />
        </Box>
    )}


export default UploadImages