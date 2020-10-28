package online.inabsurdum.jambox.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;

public interface StorageService {

    void moveAndRenameFile(File file, String name, UploadLocation uploadLocation);

    void delete(File file, UploadLocation uploadLocation);

    void deleteByFilename(String filename, UploadLocation uploadLocation);

    File load(String filename, UploadLocation uploadLocation);

    Resource loadFileAsResource(String checksum);

    String store(MultipartFile file, UploadLocation uploadLocation);

    String getFileNameFromFile(File file);

    String getFileNameFromMultipartFile(MultipartFile file);

    Path getRootLocation(UploadLocation uploadLocation);
}
