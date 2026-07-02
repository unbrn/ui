"use client";

import React, { useCallback, useRef, useState } from 'react';
import { Upload, File, X, FileText, Image } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../Badge/Badge';
import './Dropzone.css';
import { getAccentVariables } from '../../lib/colors';

export interface DropzoneProps {
  onFilesDrop?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  accentColor?: string;
  classNames?: {
    root?: string;
    content?: string;
    icon?: string;
    label?: string;
    description?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    content?: React.CSSProperties;
    icon?: React.CSSProperties;
    label?: React.CSSProperties;
    description?: React.CSSProperties;
  };
  style?: React.CSSProperties;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const isFileTypeAccepted = (file: File, accept?: string): boolean => {
  if (!accept) return true;
  const acceptTypes = accept.split(',').map(type => type.trim().toLowerCase());
  if (acceptTypes.length === 0) return true;

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return acceptTypes.some(type => {
    if (type.startsWith('.')) {
      return fileName.endsWith(type);
    }
    if (type.endsWith('/*')) {
      const baseType = type.replace('/*', '');
      return fileType.startsWith(baseType);
    }
    return fileType === type;
  });
};

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesDrop,
  accept,
  multiple = false,
  maxSize,
  label = 'Drop files here',
  description = 'Drag and drop or click to upload',
  icon,
  className,
  disabled = false,
  accentColor,
  classNames,
  styles,
  style
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles || disabled) return;

    const validFiles: File[] = [];
    const filesArray = Array.from(newFiles);

    filesArray.forEach(file => {
      if (maxSize && file.size > maxSize) return;
      if (!isFileTypeAccepted(file, accept)) return;
      validFiles.push(file);
    });

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(updatedFiles);
    onFilesDrop?.(updatedFiles);
  }, [disabled, maxSize, multiple, files, onFilesDrop, accept]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const removeFile = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesDrop?.(newFiles);
  };

  const accentStyle = getAccentVariables(accentColor);

  return (
    <div className={cn("unbrn-dropzone-container", className, classNames?.root)} style={{ ...style, ...styles?.root, ...accentStyle }}>
      <div
        className={cn(
          "unbrn-dropzone",
          "unbrn-glass",
          isDragging && "unbrn-dropzone-dragging",
          disabled && "unbrn-dropzone-disabled",
          files.length > 0 && "unbrn-dropzone-has-files"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        style={styles?.content}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={accept}
          multiple={multiple}
          className="unbrn-dropzone-input"
          tabIndex={-1}
        />

        <div className="unbrn-dropzone-content">
          <div className={cn("unbrn-dropzone-icon", classNames?.icon)} style={styles?.icon}>
            {icon || <Upload size={24} />}
          </div>
          <div className="unbrn-dropzone-text">
            <h4 className={cn("unbrn-dropzone-label", classNames?.label)} style={styles?.label}>
              {label}
            </h4>
            <p className={cn("unbrn-dropzone-description", classNames?.description)} style={styles?.description}>
              {description}
            </p>
          </div>

          {accept && (
            <div className="unbrn-dropzone-badges">
              {accept.split(',').map((type) => {
                const cleanType = type.trim().replace('.', '').replace('*', '').toUpperCase();
                if (!cleanType) return null;
                return (
                  <Badge key={type} variant="outlined" size={1} className="unbrn-dropzone-badge">
                    {cleanType}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        <div className="unbrn-dropzone-noise" />
        <div className="unbrn-dropzone-glow" />
      </div>

      {files.length > 0 && (
        <div className="unbrn-dropzone-file-list">
          {files.map((file, index) => {
            const extension = file.name.split('.').pop()?.toLowerCase();
            const getFileIcon = () => {
              if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(extension || '')) {
                return <Image size={18} className="unbrn-dropzone-file-icon" />;
              }
              if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension || '')) {
                return <FileText size={18} className="unbrn-dropzone-file-icon" />;
              }
              return <File size={18} className="unbrn-dropzone-file-icon" />;
            };

            return (
              <div key={`${file.name}-${index}`} className="unbrn-dropzone-file-item unbrn-glass">
                <div className="unbrn-dropzone-file-info">
                  <div className="unbrn-dropzone-file-icon-wrapper">
                    {getFileIcon()}
                  </div>
                  <div className="unbrn-dropzone-file-text">
                    <span className="unbrn-dropzone-file-name" title={file.name}>
                      {file.name}
                    </span>
                    <span className="unbrn-dropzone-file-size">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <button
                  className="unbrn-dropzone-file-remove"
                  onClick={(e) => removeFile(index, e)}
                  aria-label="Remove file"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

Dropzone.displayName = 'Dropzone';
