package ru.javablog.blog.upload;

import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import ru.javablog.blog.service.upload.impl.StorageServiceImpl;
import ru.javablog.blog.service.upload.properties.StorageProperties;
import ru.javablog.blog.web.rest.errors.StorageException;

import java.util.Random;

import static org.assertj.core.api.Assertions.assertThat;

public class FileSystemStorageServiceTests {

    private StorageProperties properties = new StorageProperties();
    private StorageServiceImpl service;

    @Before
    public void init() {
        properties.setLocation("target/files/" + Math.abs(new Random().nextLong()));
        service = new StorageServiceImpl(properties);
        service.init();
    }

    @Test
    public void loadNonExistent() {
        assertThat(service.load("foo.txt")).doesNotExist();
    }

    @Test
    public void saveAndLoad() {
        service.store(new MockMultipartFile("foo", "foo.txt", MediaType.TEXT_PLAIN_VALUE,
            "Hello World".getBytes()));
        assertThat(service.load("foo.txt")).exists();
    }

    @Test(expected = StorageException.class)
    public void saveNotPermitted() {
        service.store(new MockMultipartFile("foo", "../foo.txt",
            MediaType.TEXT_PLAIN_VALUE, "Hello World".getBytes()));
    }

    @Test
    public void savePermitted() {
        service.store(new MockMultipartFile("foo", "bar/../foo.txt",
            MediaType.TEXT_PLAIN_VALUE, "Hello World".getBytes()));
    }

}
