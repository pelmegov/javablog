package ru.javablog.blog.web.rest;

import ru.javablog.blog.JavablogApp;

import ru.javablog.blog.domain.PostSeo;
import ru.javablog.blog.repository.PostSeoRepository;
import ru.javablog.blog.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PostSeoResource REST controller.
 *
 * @see PostSeoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JavablogApp.class)
public class PostSeoResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_KEYWORDS = "AAAAAAAAAA";
    private static final String UPDATED_KEYWORDS = "BBBBBBBBBB";

    @Autowired
    private PostSeoRepository postSeoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPostSeoMockMvc;

    private PostSeo postSeo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PostSeoResource postSeoResource = new PostSeoResource(postSeoRepository);
        this.restPostSeoMockMvc = MockMvcBuilders.standaloneSetup(postSeoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PostSeo createEntity(EntityManager em) {
        PostSeo postSeo = new PostSeo()
            .description(DEFAULT_DESCRIPTION)
            .keywords(DEFAULT_KEYWORDS);
        return postSeo;
    }

    @Before
    public void initTest() {
        postSeo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPostSeo() throws Exception {
        int databaseSizeBeforeCreate = postSeoRepository.findAll().size();

        // Create the PostSeo
        restPostSeoMockMvc.perform(post("/api/post-seos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(postSeo)))
            .andExpect(status().isCreated());

        // Validate the PostSeo in the database
        List<PostSeo> postSeoList = postSeoRepository.findAll();
        assertThat(postSeoList).hasSize(databaseSizeBeforeCreate + 1);
        PostSeo testPostSeo = postSeoList.get(postSeoList.size() - 1);
        assertThat(testPostSeo.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPostSeo.getKeywords()).isEqualTo(DEFAULT_KEYWORDS);
    }

    @Test
    @Transactional
    public void createPostSeoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = postSeoRepository.findAll().size();

        // Create the PostSeo with an existing ID
        postSeo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPostSeoMockMvc.perform(post("/api/post-seos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(postSeo)))
            .andExpect(status().isBadRequest());

        // Validate the PostSeo in the database
        List<PostSeo> postSeoList = postSeoRepository.findAll();
        assertThat(postSeoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPostSeos() throws Exception {
        // Initialize the database
        postSeoRepository.saveAndFlush(postSeo);

        // Get all the postSeoList
        restPostSeoMockMvc.perform(get("/api/post-seos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(postSeo.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].keywords").value(hasItem(DEFAULT_KEYWORDS.toString())));
    }

    @Test
    @Transactional
    public void getPostSeo() throws Exception {
        // Initialize the database
        postSeoRepository.saveAndFlush(postSeo);

        // Get the postSeo
        restPostSeoMockMvc.perform(get("/api/post-seos/{id}", postSeo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(postSeo.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.keywords").value(DEFAULT_KEYWORDS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPostSeo() throws Exception {
        // Get the postSeo
        restPostSeoMockMvc.perform(get("/api/post-seos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePostSeo() throws Exception {
        // Initialize the database
        postSeoRepository.saveAndFlush(postSeo);
        int databaseSizeBeforeUpdate = postSeoRepository.findAll().size();

        // Update the postSeo
        PostSeo updatedPostSeo = postSeoRepository.findOne(postSeo.getId());
        updatedPostSeo
            .description(UPDATED_DESCRIPTION)
            .keywords(UPDATED_KEYWORDS);

        restPostSeoMockMvc.perform(put("/api/post-seos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPostSeo)))
            .andExpect(status().isOk());

        // Validate the PostSeo in the database
        List<PostSeo> postSeoList = postSeoRepository.findAll();
        assertThat(postSeoList).hasSize(databaseSizeBeforeUpdate);
        PostSeo testPostSeo = postSeoList.get(postSeoList.size() - 1);
        assertThat(testPostSeo.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPostSeo.getKeywords()).isEqualTo(UPDATED_KEYWORDS);
    }

    @Test
    @Transactional
    public void updateNonExistingPostSeo() throws Exception {
        int databaseSizeBeforeUpdate = postSeoRepository.findAll().size();

        // Create the PostSeo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPostSeoMockMvc.perform(put("/api/post-seos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(postSeo)))
            .andExpect(status().isCreated());

        // Validate the PostSeo in the database
        List<PostSeo> postSeoList = postSeoRepository.findAll();
        assertThat(postSeoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePostSeo() throws Exception {
        // Initialize the database
        postSeoRepository.saveAndFlush(postSeo);
        int databaseSizeBeforeDelete = postSeoRepository.findAll().size();

        // Get the postSeo
        restPostSeoMockMvc.perform(delete("/api/post-seos/{id}", postSeo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PostSeo> postSeoList = postSeoRepository.findAll();
        assertThat(postSeoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PostSeo.class);
        PostSeo postSeo1 = new PostSeo();
        postSeo1.setId(1L);
        PostSeo postSeo2 = new PostSeo();
        postSeo2.setId(postSeo1.getId());
        assertThat(postSeo1).isEqualTo(postSeo2);
        postSeo2.setId(2L);
        assertThat(postSeo1).isNotEqualTo(postSeo2);
        postSeo1.setId(null);
        assertThat(postSeo1).isNotEqualTo(postSeo2);
    }
}
