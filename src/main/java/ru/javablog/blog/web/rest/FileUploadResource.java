package ru.javablog.blog.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import ru.javablog.blog.service.upload.inter.StorageService;
import ru.javablog.blog.service.upload.properties.StorageProperties;

@RestController
@RequestMapping("/api")
public class FileUploadResource {

    private final StorageService storageService;
    private final StorageProperties storageProperties;

    public static final String UPLOAD_DIR = "images";

    @Autowired
    public FileUploadResource(StorageService storageService, StorageProperties storageProperties) {
        this.storageService = storageService;
        this.storageProperties = storageProperties;
    }

    /*
    * GET /files/{filename} loads the resource if it exists, and sends it to the browser
    * to download using a "Content-Disposition" response header
    * */
    @GetMapping("files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    /*
    * POST /uploadForm is geared to handle a multi-part message file
    * and give it to the StorageService for saving
    * */
    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        storageService.store(file);
        redirectAttributes.addFlashAttribute("message", "You successfully uploaded " + file.getOriginalFilename() + "!");
        return ResponseEntity.ok(storageProperties.getLocation() + "/" + file.getOriginalFilename());
    }

}
