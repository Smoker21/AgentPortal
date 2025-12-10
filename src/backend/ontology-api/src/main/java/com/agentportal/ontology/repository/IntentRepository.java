package com.agentportal.ontology.repository;

import com.agentportal.ontology.domain.Intent;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface IntentRepository extends Neo4jRepository<Intent, String> {
}
