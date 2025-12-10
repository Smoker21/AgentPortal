package com.agentportal.ontology.repository;

import com.agentportal.ontology.domain.Function;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import java.util.List;
import org.springframework.data.neo4j.repository.query.Query;

public interface FunctionRepository extends Neo4jRepository<Function, String> {
    
    // Placeholder for vector search or fuzzy search
    // In MVP, we might just do a simple contains check on name or description
    List<Function> findByNameContains(String text);
    
    @Query("MATCH (f:Function) WHERE f.name CONTAINS $text OR f.description CONTAINS $text RETURN f")
    List<Function> searchFunctions(String text);
}
