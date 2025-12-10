package com.agentportal.ontology.domain;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import java.util.List;

@Node("Function")
public class Function {
    @Id
    private String id;
    private String name; // Check if ontology has 'name' or uses description as main label. Schema has description/abbr. Adding name for GraphQL.
    private String description;
    private String sampleUtterance;
    private String riskLevel;
    private List<String> tags;

    @Relationship(type = "INVOKES", direction = Relationship.Direction.OUTGOING)
    private API api;

    @Relationship(type = "DISPLAY", direction = Relationship.Direction.OUTGOING)
    private UserInterface userInterface;

    // Getters/Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getSampleUtterance() { return sampleUtterance; }
    public void setSampleUtterance(String sampleUtterance) { this.sampleUtterance = sampleUtterance; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public API getApi() { return api; }
    public void setApi(API api) { this.api = api; }
    public UserInterface getUserInterface() { return userInterface; }
    public void setUserInterface(UserInterface userInterface) { this.userInterface = userInterface; }
}
