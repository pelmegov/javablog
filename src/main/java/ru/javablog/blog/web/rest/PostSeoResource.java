package ru.javablog.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.springframework.security.access.annotation.Secured;
import ru.javablog.blog.domain.PostSeo;

import ru.javablog.blog.repository.PostSeoRepository;
import ru.javablog.blog.security.AuthoritiesConstants;
import ru.javablog.blog.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PostSeo.
 */
@RestController
@RequestMapping("/api")
public class PostSeoResource {

    private final Logger log = LoggerFactory.getLogger(PostSeoResource.class);

    private static final String ENTITY_NAME = "postSeo";

    private final PostSeoRepository postSeoRepository;

    public PostSeoResource(PostSeoRepository postSeoRepository) {
        this.postSeoRepository = postSeoRepository;
    }

    /**
     * POST  /post-seos : Create a new postSeo.
     *
     * @param postSeo the postSeo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new postSeo, or with status 400 (Bad Request) if the postSeo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/post-seos")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<PostSeo> createPostSeo(@RequestBody PostSeo postSeo) throws URISyntaxException {
        log.debug("REST request to save PostSeo : {}", postSeo);
        if (postSeo.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new postSeo cannot already have an ID")).body(null);
        }
        PostSeo result = postSeoRepository.save(postSeo);
        return ResponseEntity.created(new URI("/api/post-seos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /post-seos : Updates an existing postSeo.
     *
     * @param postSeo the postSeo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated postSeo,
     * or with status 400 (Bad Request) if the postSeo is not valid,
     * or with status 500 (Internal Server Error) if the postSeo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/post-seos")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<PostSeo> updatePostSeo(@RequestBody PostSeo postSeo) throws URISyntaxException {
        log.debug("REST request to update PostSeo : {}", postSeo);
        if (postSeo.getId() == null) {
            return createPostSeo(postSeo);
        }
        PostSeo result = postSeoRepository.save(postSeo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, postSeo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /post-seos : get all the postSeos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of postSeos in body
     */
    @GetMapping("/post-seos")
    @Timed
    public List<PostSeo> getAllPostSeos() {
        log.debug("REST request to get all PostSeos");
        return postSeoRepository.findAll();
        }

    /**
     * GET  /post-seos/:id : get the "id" postSeo.
     *
     * @param id the id of the postSeo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the postSeo, or with status 404 (Not Found)
     */
    @GetMapping("/post-seos/{id}")
    @Timed
    public ResponseEntity<PostSeo> getPostSeo(@PathVariable Long id) {
        log.debug("REST request to get PostSeo : {}", id);
        PostSeo postSeo = postSeoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(postSeo));
    }

    /**
     * DELETE  /post-seos/:id : delete the "id" postSeo.
     *
     * @param id the id of the postSeo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/post-seos/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deletePostSeo(@PathVariable Long id) {
        log.debug("REST request to delete PostSeo : {}", id);
        postSeoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
