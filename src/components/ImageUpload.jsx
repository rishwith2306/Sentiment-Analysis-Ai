import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './ImageUpload.css';

/**
 * ImageUpload Component
 * Drag-and-drop image upload with preview
 */
const ImageUpload = ({ onImageSelect, selectedImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect({
          file,
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload">
      {!selectedImage ? (
        <motion.div
          className={`image-upload__dropzone ${isDragging ? 'image-upload__dropzone--dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="image-upload__icon">
            📤
          </div>
          <h3 className="image-upload__title">
            {isDragging ? 'Drop your image here' : 'Upload an Image'}
          </h3>
          <p className="image-upload__description">
            Drag & drop or click to select
          </p>
          <p className="image-upload__formats">
            PNG, JPG, GIF up to 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="image-upload__input"
            aria-label="Image file input"
          />
        </motion.div>
      ) : (
        <motion.div
          className="image-upload__preview"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src={selectedImage.preview}
            alt="Upload preview"
            className="image-upload__preview-image"
          />
          <div className="image-upload__preview-overlay">
            <button
              className="image-upload__remove"
              onClick={handleRemove}
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
          <div className="image-upload__preview-info">
            <span className="image-upload__filename">
              {selectedImage.file.name}
            </span>
            <span className="image-upload__filesize">
              {(selectedImage.file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;
