package com.agentportal.ontology.domain;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node("Application")
public class Application {
    @Id
    private String id;
    private String name;
    private String description;
    private String icon;
    private String status;

    @Relationship(type = "Provides", direction = Relationship.Direction.OUTGOING)
    private List<Function> functions;

    @Relationship(type = "BELONG_TO", direction = Relationship.Direction.OUTGOING)
    private ApplicationCategory category;

    // Getters/Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<Function> getFunctions() { return functions; }
    public void setFunctions(List<Function> functions) { this.functions = functions; }
    public ApplicationCategory getCategory() { return category; }
    public void setCategory(ApplicationCategory category) { this.category = category; }
}
