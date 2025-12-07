// 1. Constraints (Run First)
CREATE CONSTRAINT user_id IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE;
CREATE CONSTRAINT app_id IF NOT EXISTS FOR (a:Application) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT func_id IF NOT EXISTS FOR (f:Function) REQUIRE f.id IS UNIQUE;
CREATE CONSTRAINT intent_id IF NOT EXISTS FOR (i:Intent) REQUIRE i.id IS UNIQUE;
CREATE CONSTRAINT api_id IF NOT EXISTS FOR (api:API) REQUIRE api.id IS UNIQUE;
CREATE CONSTRAINT user_account IF NOT EXISTS FOR (u:User) REQUIRE u.accountId IS UNIQUE;
CREATE CONSTRAINT intent_name IF NOT EXISTS FOR (i:Intent) REQUIRE i.name IS UNIQUE;

// 2. Indexes
CREATE INDEX app_name IF NOT EXISTS FOR (a:Application) ON (a.name);
CREATE INDEX func_name IF NOT EXISTS FOR (f:Function) ON (f.name);
CREATE INDEX intent_name_idx IF NOT EXISTS FOR (i:Intent) ON (i.name);
CREATE INDEX app_status IF NOT EXISTS FOR (a:Application) ON (a.status);
CREATE INDEX func_active IF NOT EXISTS FOR (f:Function) ON (f.isActive);

// 3. Vector Index
CREATE VECTOR INDEX intent_embedding_index IF NOT EXISTS
FOR (i:Intent)
ON (i.embedding)
OPTIONS {indexConfig: {
 `vector.dimensions`: 1536,
 `vector.similarity_function`: 'cosine'
}};

// 4. Create Nodes (Mock Data)
CREATE (n1:UserInterface {id: "ui-001", createdAt: datetime(), isActive: true, url: "http://example.com/ui", type: "Web", title: "User Dashboard"})
CREATE (api:API {id: "api-001", createdAt: datetime(), isActive: true, url: "http://api.example.com", method: "GET", specUrl: "http://api.example.com/spec", operationId: "op1", name: "GetInfo", riskLevel: "Low", timeout: 5000})
CREATE (n2:Function:Feature {id: "func-001", createdAt: datetime(), isActive: true, description: "Get User Info", sampleUtterance: "Who am I?", abbreviation: "GetUI", riskLevel: "Low", tags: ["profile", "identity"]})
CREATE (gs:GlobalSupport {id: "gs-001", createdAt: datetime(), isActive: true, ServicePhone: "123-456-7890", email: "support@example.com"})
CREATE (n0:Application {id: "app-001", createdAt: datetime(), isActive: true, icon: "user-icon.png", name: "UserApp", description: "Main application for user self-service", status: "Production"})
CREATE (um:UserManual:Document:Faq {id: "doc-001", createdAt: datetime(), isActive: true, link: "http://docs.example.com", version: "1.0", format: "HTML"})
CREATE (prov:Provider {id: "prov-001", createdAt: datetime(), isActive: true, team: "CoreTeam", contactWindow: "admin@example.com"})
CREATE (cat:ApplicationCategory:UserDomain {id: "cat-001", createdAt: datetime(), isActive: true, name: "Productivity", serviceGroup: "General"})
CREATE (n12:UserGroup:Role {id: "role-001", createdAt: datetime(), isActive: true, name: "Employee", description: "Standard employee role"})
CREATE (n3:User {id: "user-001", createdAt: datetime(), isActive: true, accountId: "u123", name: "Alice", email: "alice@example.com", preferences: "{}"})
CREATE (n11:Intent {id: "intent-001", createdAt: datetime(), isActive: true, name: "CheckIdentity", sampleUtterance: "Who am I?", trainingPhrases: ["Who am I?", "Show my profile", "My info"], embedding: [], inputSlots: "{}", clarifyPrompt: "", confidence: 0.9, riskLevel: "Low", domain: "SelfService"})
CREATE (auth:SSOProvider:`A4Auth` {id: "auth-001", createdAt: datetime(), isActive: true, authnMethod: "OIDC", authrGroups: "All"})

// 5. Create Relationships
CREATE (n1)<-[:FALLBACK_TO]-(api)
CREATE (api)<-[:INVOKES]-(n2)
CREATE (n2)-[:SUPPORT_BY]->(gs)
CREATE (n0)-[:Provides]->(n2)
CREATE (n0)-[:SUPPORT_BY]->(gs)
CREATE (n2)-[:EXPLAIN_BY]->(um)
CREATE (prov)-[:MAINTAINS]->(n0)
CREATE (cat)-[:CONTAINS]->(n0)
CREATE (n0)-[:BELONG_TO]->(cat)
CREATE (n0)-[:SERVICE]->(n12)
CREATE (n3)-[:ACCESS]->(n2)
CREATE (n11)-[:MATCHES]->(n2)
CREATE (n3)-[:EXPRESS]->(n11)
CREATE (n3)-[:AUTH_BY]->(auth)
CREATE (n12)-[:HAS_PERMISSION]->(auth)
CREATE (n2)-[:GRANT_TO]->(n12)
CREATE (n2)-[:DISPLAY]->(n1)
CREATE (n3)-[:BELONG_TO]->(n12)
CREATE (n12)-[:CONTAINS]->(n3)
CREATE (n11)-[:SUBCATEGORY_OF]->(n11)
