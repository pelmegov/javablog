package ru.javablog.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.google.common.collect.Lists;
import org.springframework.security.access.annotation.Secured;
import ru.javablog.blog.domain.Comment;
import ru.javablog.blog.domain.Post;

import ru.javablog.blog.repository.CommentRepository;
import ru.javablog.blog.repository.PostRepository;
import ru.javablog.blog.security.AuthoritiesConstants;
import ru.javablog.blog.service.UserService;
import ru.javablog.blog.web.rest.util.HeaderUtil;
import ru.javablog.blog.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Post.
 */
@RestController
@RequestMapping("/api")
public class PostResource {

    private final Logger log = LoggerFactory.getLogger(PostResource.class);

    private static final String ENTITY_NAME = "post";

    private final PostRepository postRepository;

<<<<<<< HEAD
    private final UserService userService;

    public PostResource(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
=======
    private final CommentRepository commentRepository;

    private final UserService userService;

    public PostResource(PostRepository postRepository, CommentRepository commentRepository, UserService userService) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
>>>>>>> 96241f1aa3bfb79b9252b4c2c2d0e69ee98bd1c2
        this.userService = userService;
    }

    /**
     * POST  /posts : Create a new post.
     *
     * @param post the post to create
     * @return the ResponseEntity with status 201 (Created) and with body the new post, or with status 400 (Bad Request) if the post has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/posts")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Post> createPost(@Valid @RequestBody Post post) throws URISyntaxException {
        log.debug("REST request to save Post : {}", post);
        if (post.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new post cannot already have an ID")).body(null);
        }
        post.setAuthor(userService.getUserWithAuthorities());
        Post result = postRepository.save(post);
        return ResponseEntity.created(new URI("/api/posts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /posts : Updates an existing post.
     *
     * @param post the post to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated post,
     * or with status 400 (Bad Request) if the post is not valid,
     * or with status 500 (Internal Server Error) if the post couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/posts")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Post> updatePost(@Valid @RequestBody Post post) throws URISyntaxException {
        log.debug("REST request to update Post : {}", post);
        if (post.getId() == null) {
            return createPost(post);
        }
        Post result = postRepository.save(post);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, post.getId().toString()))
            .body(result);
    }

    /**
     * GET  /posts : get all the posts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of posts in body
     */
    @GetMapping("/posts")
    @Timed
    public ResponseEntity<List<Post>> getAllPosts(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Posts");
        Page<Post> page = postRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/posts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /posts/:id : get the "id" post.
     *
     * @param id the id of the post to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the post, or with status 404 (Not Found)
     */
    @GetMapping("/posts/{id}")
    @Timed
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        log.debug("REST request to get Post : {}", id);
        Post post = postRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(post));
    }

    /**
     * DELETE  /posts/:id : delete the "id" post.
     *
     * @param id the id of the post to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/posts/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        log.debug("REST request to delete Post : {}", id);
        postRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * GET  /posts/:id/comments : get all comments in post.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posts in body
     */
    @GetMapping("/posts/{id}/comments")
    @Timed
    public ResponseEntity<List<Comment>> getPostComments(@PathVariable Long id) {
        log.debug("REST request to get comments for Post : {}", id);
        List<Comment> comments = Lists.newArrayList(commentRepository.findByPost(postRepository.findOne(id)));
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

}
