# Ontology GraphQL API Developer Guide

## Overview
The Ontology API provides a GraphQL interface to interact with the Knowledge Graph stored in Neo4j. It allows retrieving Users, Applications, Functions, Intents, and their relationships.

**Endpoint**: `http://localhost:8080/graphql`
**GraphiQL Console**: `http://localhost:8080/graphiql`

## Schema Types

### Key Entities
-   **User**: Represents an end-user or agent.
-   **Application**: A software tool (e.g., Salesforce, Workday).
-   **Function**: A specific capability provided by an Application (e.g., "Create Lead").
-   **Intent**: A user's natural language goal (e.g., "I want to add a new customer").
-   **API**: The technical endpoint invoked by a Function.

## Sample Queries

### 1. Get User Profile
Retrieve user details, their assigned roles, and functions they can access.
```graphql
query {
  getUser(accountId: "u123") {
    id
    name
    email
    roles {
      name
      description
    }
    accessibleFunctions {
      name
      riskLevel
    }
  }
}
```

### 2. List Applications & Functions
Get all applications and their functions, including basic details.
```graphql
query {
  getApplications {
    name
    status
    category {
      name
    }
    functions {
      name
      sampleUtterance
    }
  }
}
```

### 3. Semantic Search (Functions)
Find functions relevant to a specific text query (e.g., "profile").
```graphql
query {
  findFunctions(text: "profile") {
    name
    description
    userInterface {
      url
    }
  }
}
```

## Sample Mutations

### 1. Create Usage Intent
Register a new user intent for the Knowledge Graph.
```graphql
mutation {
  createIntent(name: "ResetPassword", sampleUtterance: "I forgot my password") {
    id
    name
    confidence
  }
}
```

## Expected Response Format
All responses follow the standard GraphQL JSON structure:
```json
{
  "data": {
    "getUser": {
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}
```
