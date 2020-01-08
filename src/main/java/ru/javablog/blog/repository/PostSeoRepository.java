package ru.javablog.blog.repository;

import ru.javablog.blog.domain.PostSeo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PostSeo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostSeoRepository extends JpaRepository<PostSeo, Long> {

}
