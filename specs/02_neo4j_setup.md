# Neo4j Setup & Verification

## 1. Docker Environment
The Neo4j environment is defined in `neo4j/docker-compose.yml`.

### Docker Compose Configuration
```yaml
version: '3.8'

services:
  neo4j:
    image: neo4j:5.15.0-community
    container_name: agent_portal_neo4j
    ports:
      - "7474:7474" # HTTP
      - "7687:7687" # Bolt
    environment:
      NEO4J_AUTH: neo4j/admin1234
    volumes:
      - ./data:/data
      - ./logs:/logs
      - ./import:/var/lib/neo4j/import
      - ./plugins:/plugins
    restart: unless-stopped
```

## 2. Installation & Verification
### Steps to Run
1. Navigate to the `neo4j` directory:
   ```bash
   cd neo4j
   ```
2. Start the container:
   ```bash
   docker-compose up -d
   ```
3. Verify status:
   ```bash
   docker ps
   # Ensure 'agent_portal_neo4j' is Up
   ```

### Verification
1. Open browser to [http://localhost:7474](http://localhost:7474).
2. Login with default credentials:
   - **User**: `neo4j`
   - **Password**: `admin1234`
3. If successful, you will see the Neo4j Browser Query Interface.

## 3. Schema & Data Initialization
The schema and initial mock data are defined in `neo4j/init.cypher`.
To apply this script:
```bash
cat init.cypher | docker exec -i agent_portal_neo4j cypher-shell -u neo4j -p admin1234
```

## 4. Agent Portal Account Creation
To create a dedicated service account for the Agent Portal backend (instead of using the admin user), run the following Cypher commands in the Neo4j Browser or via Cypher Shell.

```cypher
// 1. Create the user 'agent_portal'
CREATE USER agent_portal IF NOT EXISTS SET PASSWORD 'portal_secret_123' CHANGE NOT REQUIRED;

// 2. Grant privileges (Community Edition has limited Role Based Access Control)
// In Enterprise, you would do: GRANT ROLE reader TO agent_portal;
// In Community, users generally have full access or you rely on the default role.
// Verify user creation:
SHOW USERS;
```

> [!NOTE]
> Update your Spring Boot connection settings to use this new account:
> - `spring.neo4j.authentication.username=agent_portal`
> - `spring.neo4j.authentication.password=portal_secret_123`
