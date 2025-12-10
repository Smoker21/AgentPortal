# Ontology GraphQL API Implementation Plan

## Goal
Implement a GraphQL API using Spring Boot to expose the Ontology data stored in Neo4j. This API will serve as the "Ontology Kernel" interface for the Agent Portal. The implementation will include generating an API documentation (using Spring for GraphQL's GraphiQL and explicit documentation endpoint) as requested, and Dockerizing the application.

## User Review Required
> [!IMPORTANT]
> The user requested "Open API document". For GraphQL, the standard is the **Schema (`.graphqls`)** and **GraphiQL** interface. I will assume "Open API document" implies a **Developer Guide** with sample Queries/Mutations and expected Responses, rather than a Swagger JSON (which is for REST).

## Proposed Changes

### 1. Project Initialization (Backend)
-   Create a new Spring Boot project in `src/backend/ontology-api`.
-   **Dependencies**:
    -   `spring-boot-starter-graphql`
    -   `spring-boot-starter-data-neo4j`
    -   `spring-boot-starter-web` (for GraphiQL/HTTP)
    -   `spring-boot-starter-test`
    -   `spring-graphql-test`
-   **Configuration**:
    -   `application.yml`: Neo4j connection (using `agent_portal` account), GraphiQL enabled.

### 2. Schema Definition (`src/main/resources/graphql/schema.graphqls`)
Define the GraphQL types matching `specs/02_ontology_schema.md`.
-   **Types**: `User`, `Application`, `Function`, `Intent`, `API`, `UserInterface`.
-   **Queries**:
    -   `getUser(accountId: String!)`: Get user details.
    -   `findIntent(text: String!)`: (Mock/Placeholder for vector search integration).
    -   `getApplications`: List all apps.
    -   `getFunctions(appId: ID!)`: List functions for an app.
-   **Mutations** (MVP Scope):
    -   `createIntent(...)`: Allow adding new intents (for Knowledge Expert mode).

### 3. Data Access Layer (Repository)
 Implement `Neo4jRepository` for each core entity.
-   `UserRepository`
-   `ApplicationRepository`
-   `FunctionRepository`
-   `IntentRepository`

### 4. GraphQL Controllers (`@Controller`)
-   `OntologyController`: Map GraphQL queries to Repository calls.

### 5. Docker Integration
-   **Dockerfile**: Create `src/backend/Dockerfile` for the Spring Boot application.
-   **Docker Compose**: Update `neo4j/docker-compose.yml` (or move to root) to include the `ontology-api` service.
    ```yaml
    ontology-api:
      build: ../src/backend
      ports:
        - "8080:8080"
      environment:
        - SPRING_NEO4J_URI=bolt://neo4j:7687
        - SPRING_NEO4J_AUTHENTICATION_USERNAME=agent_portal
        - SPRING_NEO4J_AUTHENTICATION_PASSWORD=portal_secret_123
      depends_on:
        - neo4j
    ```

### 6. Documentation Generator
-   Create a comprehensive markdown artifact `docs/ontology_api_guide.md` containing:
    -   Full Schema.
    -   Sample `curl` requests or GraphiQL screenshots.
    -   Example Query/Response pairs.

## Verification Plan

### Automated Tests
-   **Integration Test**: Use `HttpGraphQlTester` to send requests to the running Spring Boot app (or mock environment) and verify JSON responses.
-   **Unit Tests**: Controller tests using `@GraphQlTest`.

### Manual Verification
1.  Run `docker-compose up --build`.
2.  Open GraphiQL at `http://localhost:8080/graphiql`.
3.  Execute the sample queries defined in the `docs/ontology_api_guide.md`.
4.  Verify data matches the Neo4j database content.
