package com.agentportal.ontology.repository;

import com.agentportal.ontology.domain.Application;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ApplicationRepository extends Neo4jRepository<Application, String> {
}
