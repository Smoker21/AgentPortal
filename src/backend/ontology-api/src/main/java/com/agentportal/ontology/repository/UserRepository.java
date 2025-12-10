package com.agentportal.ontology.repository;

import com.agentportal.ontology.domain.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import java.util.Optional;

public interface UserRepository extends Neo4jRepository<User, String> {
    Optional<User> findByAccountId(String accountId);
}
