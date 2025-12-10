package com.agentportal.ontology.domain;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Intent")
public class Intent {
    @Id
    private String id;
    private String name;
    private String sampleUtterance;
    private Double confidence;

    // Getters/Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSampleUtterance() { return sampleUtterance; }
    public void setSampleUtterance(String sampleUtterance) { this.sampleUtterance = sampleUtterance; }
    public Double getConfidence() { return confidence; }
    public void setConfidence(Double confidence) { this.confidence = confidence; }
}
