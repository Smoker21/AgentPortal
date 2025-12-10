# Walkthrough: Ontology Infrastructure Setup

## Overview
We have successfully set up the Neo4j-based Ontology infrastructure for the Agent Portal. This includes the schema design, Docker environment, and a robust test data generator for verifying the Graph RAG pipeline.

## 1. Schema Design
The ontology schema is defined in [specs/02_ontology_schema.md](file:///d:/workspace/agent_portal/specs/02_ontology_schema.md).
- **Core Nodes**: `User`, `Application`, `Function`, `Intent`, `API`.
- **Performance**: Added uniqueness constraints and indexes (including Vector Index for embeddings).

## 2. Environment Setup
The Neo4j environment is containerized using Docker. All configuration files are in `d:/workspace/agent_portal/neo4j`.

### Files
- [docker-compose.yml](file:///d:/workspace/agent_portal/neo4j/docker-compose.yml): Defines the Neo4j service (Ports 7474, 7687).
- [init.cypher](file:///d:/workspace/agent_portal/neo4j/init.cypher): Initializes the database with constraints, indexes, and schema.
- [setup_neo4j.ps1](file:///d:/workspace/agent_portal/neo4j/setup_neo4j.ps1): Helper script to start Docker and run the import.

### How to Run
```powershell
cd d:\workspace\agent_portal\neo4j
.\setup_neo4j.ps1
```

## 3. Test Data Generation
We created a Python script to generate realistic enterprise test data.
- **Script**: [neo4j/test/generate_data.py](file:///d:/workspace/agent_portal/neo4j/test/generate_data.py)
- **Output**: `neo4j/test/data/*.csv`
- **Domains Covered**: HR, IT, Finance, Sales, Manufacturing.

### Sample Data (Master Import Source)
The `master_import_source.csv` is designed for testing the Graph RAG importer.
| Application | Category | Function | Intent | API_Url |
|---|---|---|---|---|
| Workday | HR | Submit Leave Request | I want to take time off | .../api/v1/leaves/request |
| Siemens Opcenter | Manufacturing | Check Lot Status | Check my lot status | .../api/mes/lot/status/{lot_id} |

## 4. Verification
- **Schema**: Validated via `init.cypher` execution.
- **Data**: Validated by generating 100+ realistic records including semantic URLs and business intents.
- **Version Control**: All changes committed and pushed to `main`.
