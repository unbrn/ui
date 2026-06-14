"use client";

import React, { useCallback, useRef, useState } from 'react';
import { Upload, File, X, FileText, Image } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../Badge/Badge';
import './Dropzone.css';
import { getAccentVariables } from '../../lib/colors';

export interface DropzoneProps {
  dropzoneOnFilesDrop?: (files: File[]) => void;
  dropzoneAccept?: string;
  dropzoneMultiple?: boolean;
  dropzoneMaxSize?: number;
  dropzoneLabel?: string;
  dropzoneDescription?: string;
  dropzoneIcon?: React.ReactNode;
  dropzoneClassName?: string;
  dropzoneDisabled?: boolean;
  dropzoneAccentColor?: string;
  classNames?: {
    dropzoneRoot?: string;
    dropzoneContent?: string;
    dropzoneIcon?: string;
    dropzoneLabel?: string;
    dropzoneDescription?: string;
  };
  styles?: {
    dropzoneRoot?: React.CSSProperties;
    dropzoneContent?: React.CSSProperties;
    dropzoneIcon?: React.CSSProperties;
    dropzoneLabel?: React.CSSProperties;
    dropzoneDescription?: React.CSSProperties;
  };
  dropzoneStyle?: React.CSSProperties;
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
  dropzoneOnFilesDrop,
  dropzoneAccept,
  dropzoneMultiple = false,
  dropzoneMaxSize,
  dropzoneLabel = 'Drop files here',
  dropzoneDescription = 'Drag and drop or click to upload',
  dropzoneIcon,
  dropzoneClassName,
  dropzoneDisabled = false,
  dropzoneAccentColor,
  classNames,
  styles,
  dropzoneStyle
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dropzoneDisabled) setIsDragging(true);
  }, [dropzoneDisabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles || dropzoneDisabled) return;

    const validFiles: File[] = [];
    const filesArray = Array.from(newFiles);

    filesArray.forEach(file => {
      if (dropzoneMaxSize && file.size > dropzoneMaxSize) return;
      if (!isFileTypeAccepted(file, dropzoneAccept)) return;
      validFiles.push(file);
    });

    const updatedFiles = dropzoneMultiple ? [...files, ...validFiles] : validFiles;
    setFiles(updatedFiles);
    dropzoneOnFilesDrop?.(updatedFiles);
  }, [dropzoneDisabled, dropzoneMaxSize, dropzoneMultiple, files, dropzoneOnFilesDrop, dropzoneAccept]);

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
    if (!dropzoneDisabled) fileInputRef.current?.click();
  };

  const removeFile = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    dropzoneOnFilesDrop?.(newFiles);
  };

  const accentStyle = getAccentVariables(dropzoneAccentColor);

  return (
    <div className={cn("unburn-dropzone-container", dropzoneClassName, classNames?.dropzoneRoot)} style={{ ...dropzoneStyle, ...styles?.dropzoneRoot, ...accentStyle }}>
      <div
        className={cn(
          "unburn-dropzone",
          "unburn-glass",
          isDragging && "unburn-dropzone-dragging",
          dropzoneDisabled && "unburn-dropzone-disabled",
          files.length > 0 && "unburn-dropzone-has-files"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        style={styles?.dropzoneContent}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={dropzoneAccept}
          multiple={dropzoneMultiple}
          className="unburn-dropzone-input"
          tabIndex={-1}
        />

        <div className="unburn-dropzone-content">
          <div className={cn("unburn-dropzone-icon", classNames?.dropzoneIcon)} style={styles?.dropzoneIcon}>
            {dropzoneIcon || <Upload size={24} />}
          </div>
          <div className="unburn-dropzone-text">
            <h4 className={cn("unburn-dropzone-label", classNames?.dropzoneLabel)} style={styles?.dropzoneLabel}>
              {dropzoneLabel}
            </h4>
            <p className={cn("unburn-dropzone-description", classNames?.dropzoneDescription)} style={styles?.dropzoneDescription}>
              {dropzoneDescription}
            </p>
          </div>

          {dropzoneAccept && (
            <div className="unburn-dropzone-badges">
              {dropzoneAccept.split(',').map((type) => {
                const cleanType = type.trim().replace('.', '').replace('*', '').toUpperCase();
                if (!cleanType) return null;
                return (
                  <Badge key={type} badgeVariant="outlined" badgeSize="sm" badgeClassName="unburn-dropzone-badge" badgeChildren={cleanType} />
                );
              })}
            </div>
          )}
        </div>

        <div className="unburn-dropzone-noise" />
        <div className="unburn-dropzone-glow" />
      </div>

      {files.length > 0 && (
        <div className="unburn-dropzone-file-list">
          {files.map((file, index) => {
            const extension = file.name.split('.').pop()?.toLowerCase();
            const getFileIcon = () => {
              if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(extension || '')) {
                return <Image size={18} className="unburn-dropzone-file-icon" />;
              }
              if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension || '')) {
                return <FileText size={18} className="unburn-dropzone-file-icon" />;
              }
              return <File size={18} className="unburn-dropzone-file-icon" />;
            };

            return (
              <div key={`${file.name}-${index}`} className="unburn-dropzone-file-item unburn-glass">
                <div className="unburn-dropzone-file-info">
                  <div className="unburn-dropzone-file-icon-wrapper">
                    {getFileIcon()}
                  </div>
                  <div className="unburn-dropzone-file-text">
                    <span className="unburn-dropzone-file-name" title={file.name}>
                      {file.name}
                    </span>
                    <span className="unburn-dropzone-file-size">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <button
                  className="unburn-dropzone-file-remove"
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
