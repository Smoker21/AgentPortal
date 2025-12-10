package com.agentportal.ontology.domain;

import org.junit.jupiter.api.Test;
import java.util.Collections;
import static org.junit.jupiter.api.Assertions.*;

class DomainEntitiesTest {

    @Test
    void testUser() {
        User user = new User();
        user.setId("1");
        user.setAccountId("acc1");
        user.setName("Name");
        user.setEmail("test@email.com");
        user.setRoles(Collections.emptyList());
        user.setAccessibleFunctions(Collections.emptyList());

        assertEquals("1", user.getId());
        assertEquals("acc1", user.getAccountId());
        assertEquals("Name", user.getName());
        assertEquals("test@email.com", user.getEmail());
        assertNotNull(user.getRoles());
        assertNotNull(user.getAccessibleFunctions());
    }

    @Test
    void testApplication() {
        Application app = new Application();
        app.setId("1");
        app.setName("App");
        app.setDescription("Desc");
        app.setIcon("Icon");
        app.setStatus("Active");
        app.setFunctions(Collections.emptyList());
        app.setCategory(new ApplicationCategory());

        assertEquals("1", app.getId());
        assertEquals("App", app.getName());
        assertEquals("Desc", app.getDescription());
        assertEquals("Icon", app.getIcon());
        assertEquals("Active", app.getStatus());
        assertNotNull(app.getFunctions());
        assertNotNull(app.getCategory());
    }
    
    @Test
    void testFunction() {
        Function f = new Function();
        f.setId("1");
        f.setName("Func");
        f.setDescription("Desc");
        f.setSampleUtterance("Utt");
        f.setRiskLevel("Low");
        f.setTags(Collections.emptyList());
        f.setApi(new API());
        f.setUserInterface(new UserInterface());

        assertEquals("1", f.getId());
        assertEquals("Func", f.getName());
        assertEquals("Desc", f.getDescription());
        assertEquals("Utt", f.getSampleUtterance());
        assertEquals("Low", f.getRiskLevel());
        assertNotNull(f.getTags());
        assertNotNull(f.getApi());
        assertNotNull(f.getUserInterface());
    }
    
    @Test
    void testIntent() {
        Intent i = new Intent();
        i.setId("1");
        i.setName("Intent");
        i.setSampleUtterance("Utt");
        i.setConfidence(0.9);

        assertEquals("1", i.getId());
        assertEquals("Intent", i.getName());
        assertEquals("Utt", i.getSampleUtterance());
        assertEquals(0.9, i.getConfidence());
    }
    
    @Test
    void testSupportClasses() {
        // UserRole
        UserRole role = new UserRole();
        role.setId("1");
        role.setName("Role");
        role.setDescription("Desc");
        assertEquals("1", role.getId());
        assertEquals("Role", role.getName());
        assertEquals("Desc", role.getDescription());
        
        // ApplicationCategory
        ApplicationCategory cat = new ApplicationCategory();
        cat.setId("1");
        cat.setName("Cat");
        assertEquals("1", cat.getId());
        assertEquals("Cat", cat.getName());
        
        // API
        API api = new API();
        api.setId("1");
        api.setName("API");
        api.setUrl("http");
        api.setMethod("GET");
        api.setRiskLevel("Low");
        assertEquals("1", api.getId());
        assertEquals("API", api.getName());
        assertEquals("http", api.getUrl());
        assertEquals("GET", api.getMethod());
        assertEquals("Low", api.getRiskLevel());
        
        // UI
        UserInterface ui = new UserInterface();
        ui.setId("1");
        ui.setUrl("http");
        ui.setType("Web");
        ui.setTitle("Title");
        assertEquals("1", ui.getId());
        assertEquals("http", ui.getUrl());
        assertEquals("Web", ui.getType());
        assertEquals("Title", ui.getTitle());
    }
}
