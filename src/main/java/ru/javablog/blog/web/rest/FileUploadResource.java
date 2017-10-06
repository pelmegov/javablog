package ru.javablog.blog.web.rest;

import java.io.IOException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import ru.javablog.blog.handler.error.StorageFileNotFoundException;
import ru.javablog.blog.service.file.upload.inter.StorageService;

@RestController
@RequestMapping("/api")
public class FileUploadResource {

    private final StorageService storageService;

    @Autowired
    public FileUploadResource(StorageService storageService) {
        this.storageService = storageService;
    }

    /*
    * GET /uploadForm looks up the current list of uploaded files from the StorageService
    * and loads it into a Thymeleaf template. It calculates a link to the actual resource using
    * */
    @GetMapping("/uploadForm")
    public String listUploadedFiles(Model model) throws IOException {

        model.addAttribute("files", storageService.loadAll().map(
            path -> MvcUriComponentsBuilder.fromMethodName(FileUploadResource.class,
                "serveFile", path.getFileName().toString()).build().toString())
            .collect(Collectors.toList()));

        return "uploadForm";
    }

    /*
    * GET /files/{filename} loads the resource if it exists, and sends it to the browser
    * to download using a "Content-Disposition" response header
    * */
    @GetMapping("/files/{filename:.+}")
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
    @PostMapping("/uploadForm")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        storageService.store(file);
        redirectAttributes.addFlashAttribute("message",
            "You successfully uploaded " + file.getOriginalFilename() + "!");

        return "redirect:/";
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
