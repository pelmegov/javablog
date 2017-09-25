package ru.javablog.blog.repository;

import ru.javablog.blog.domain.Post;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Post entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("select post from Post post where post.author.login = ?#{principal.username}")
    List<Post> findByAuthorIsCurrentUser();
    @Query("select distinct post from Post post left join fetch post.tags order by post.id desc")
    List<Post> findAllWithEagerRelationships();

    @Query("select post from Post post left join fetch post.tags where post.id =:id")
    Post findOneWithEagerRelationships(@Param("id") Long id);

}
