package com.agentportal.ontology.domain;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node("User")
public class User {
    @Id
    private String id;
    private String accountId;
    private String name;
    private String email;

    @Relationship(type = "BELONG_TO", direction = Relationship.Direction.OUTGOING)
    private List<UserRole> roles;

    @Relationship(type = "ACCESS", direction = Relationship.Direction.OUTGOING)
    private List<Function> accessibleFunctions;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getAccountId() { return accountId; }
    public void setAccountId(String accountId) { this.accountId = accountId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public List<UserRole> getRoles() { return roles; }
    public void setRoles(List<UserRole> roles) { this.roles = roles; }
    public List<Function> getAccessibleFunctions() { return accessibleFunctions; }
    public void setAccessibleFunctions(List<Function> accessibleFunctions) { this.accessibleFunctions = accessibleFunctions; }
}
