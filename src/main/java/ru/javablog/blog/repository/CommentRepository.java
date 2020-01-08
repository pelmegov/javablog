package ru.javablog.blog.repository;

import ru.javablog.blog.domain.Comment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import ru.javablog.blog.domain.Post;

import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Comment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select comment from Comment comment where comment.author.login = ?#{principal.username}")
    List<Comment> findByAuthorIsCurrentUser();

    Set<Comment> findByPost(Post post);

}
