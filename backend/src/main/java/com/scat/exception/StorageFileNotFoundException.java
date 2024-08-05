package com.scat.exception;

public class StorageFileNotFoundException extends StorageException {

    private static final long serialVersionUID = 1L; // Add this line

    public StorageFileNotFoundException(String message) {
        super(message);
    }

    public StorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
