package online.inabsurdum.jambox.storage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class StorageServiceImpl implements StorageService {

    private final Path tempFileRootLoc = Paths.get("./temp-files");
    private final Path trackRootLoc = Paths.get("./tracks");

    @Override
    public void moveAndRenameFile(File file, String name, UploadLocation uploadLocation) {
        Path rootLocation = getRootLocation(uploadLocation);
        String filename = getFileNameFromFile(file);
        try {
            Files.move(tempFileRootLoc.resolve(filename), rootLocation.resolve(name), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new StorageException("Failed to move audio file: " + filename, e);
        }
    }

    @Override
    public void delete(File file, UploadLocation uploadLocation) {
        String filename = getFileNameFromFile(file);
        Path rootLocation = getRootLocation(uploadLocation);
        try {
            Files.delete(rootLocation.resolve(filename));
        } catch (IOException e) {
            throw new StorageException("Failed to delete audio file: " + filename, e);
        }
    }

    @Override
    public void deleteByFilename(String filename, UploadLocation uploadLocation) {
        File file = load(filename, uploadLocation);
        delete(file, uploadLocation);
    }

    @Override
    public File load(String filename, UploadLocation uploadLocation) {
        Path rootLocation = getRootLocation(uploadLocation);
        return new File(String.valueOf(rootLocation.resolve(filename)));
    }

    @Override
    public Resource loadFileAsResource(UploadLocation uploadLocation, String checksum) {
        try {
            Path filePath = getRootLocation(uploadLocation).resolve(checksum).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new StorageException("File not found " + checksum);
            }
        } catch (MalformedURLException ex) {
            throw new StorageException("File not found " + checksum, ex);
        }
    }

    @Override
    public File loadFileWithOriginalFilename(String checksum, String originalFilename) {
        Path source = trackRootLoc.resolve(checksum);
        Path destination = tempFileRootLoc.resolve(originalFilename);
        try {
            Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new StorageException("Failed to copy and rename audio file: " + checksum, e);
        }
        File file = null;
        try {
            file = new File(String.valueOf(destination));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return file;
    }


    @Override
    public String store(MultipartFile file, UploadLocation uploadLocation) {
        Path rootLocation = getRootLocation(uploadLocation);
        String filename = getFileNameFromMultipartFile(file);
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file: " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, rootLocation.resolve(filename),
                        StandardCopyOption.REPLACE_EXISTING);
                return filename;
            }
        } catch (IOException e) {
            throw new StorageException("Failed to store file: " + filename, e);
        }
    }

    @Override
    public String getFileNameFromFile(File file) {
        return StringUtils.cleanPath(file.getName());
    }

    @Override
    public String getFileNameFromMultipartFile(MultipartFile file) {
        return StringUtils.cleanPath(file.getOriginalFilename());
    }

    @Override
    public Path getRootLocation(UploadLocation uploadLocation) {
        Path rootLocation;
        switch (uploadLocation) {
            case TEMPFILE:
                rootLocation = tempFileRootLoc;
                break;
            case TRACK:
                rootLocation = trackRootLoc;
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + uploadLocation);
        }
        return rootLocation;
    }
}
