package com.agentportal.ontology.controller;

import com.agentportal.ontology.domain.*;
import com.agentportal.ontology.repository.ApplicationRepository;
import com.agentportal.ontology.repository.FunctionRepository;
import com.agentportal.ontology.repository.IntentRepository;
import com.agentportal.ontology.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.graphql.test.tester.GraphQlTester;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@GraphQlTest(OntologyController.class)
public class OntologyControllerTest {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockBean
    private UserRepository userRepository;
    @MockBean
    private ApplicationRepository applicationRepository;
    @MockBean
    private FunctionRepository functionRepository;
    @MockBean
    private IntentRepository intentRepository;

    @Test
    void shouldGetUser() {
        User user = new User();
        user.setId("u-1");
        user.setAccountId("acc-123");
        user.setName("John Doe");
        user.setEmail("john@example.com");

        when(userRepository.findByAccountId("acc-123")).thenReturn(Optional.of(user));

        this.graphQlTester.document("""
                    query {
                        getUser(accountId: "acc-123") {
                            accountId
                            name
                            email
                        }
                    }
                """)
                .execute()
                .path("getUser.name").entity(String.class).isEqualTo("John Doe")
                .path("getUser.email").entity(String.class).isEqualTo("john@example.com");
    }

    @Test
    void shouldGetApplications() {
        Application app = new Application();
        app.setId("app-1");
        app.setName("TestApp");
        app.setStatus("Active");

        when(applicationRepository.findAll()).thenReturn(List.of(app));

        this.graphQlTester.document("""
                    query {
                        getApplications {
                            name
                            status
                        }
                    }
                """)
                .execute()
                .path("getApplications")
                .entityList(Object.class)
                .hasSize(1);
    }

    @Test
    void shouldGetApplicationById() {
        Application app = new Application();
        app.setId("app-1");
        app.setName("TargetApp");

        when(applicationRepository.findById("app-1")).thenReturn(Optional.of(app));

        this.graphQlTester.document("""
                    query {
                        getApplication(id: "app-1") {
                            name
                        }
                    }
                """)
                .execute()
                .path("getApplication.name").entity(String.class).isEqualTo("TargetApp");
    }

    @Test
    void shouldFindFunctions() {
        Function func = new Function();
        func.setId("f-1");
        func.setName("SearchFunc");

        when(functionRepository.searchFunctions("search")).thenReturn(List.of(func));

        this.graphQlTester.document("""
                    query {
                        findFunctions(text: "search") {
                            name
                        }
                    }
                """)
                .execute()
                .path("findFunctions")
                .entityList(Object.class)
                .hasSize(1);
    }

    @Test
    void shouldCreateIntent() {
        Intent intent = new Intent();
        intent.setId("i-1");
        intent.setName("NewIntent");
        intent.setSampleUtterance("Do something");
        intent.setConfidence(1.0);

        when(intentRepository.save(any(Intent.class))).thenReturn(intent);

        this.graphQlTester.document("""
                    mutation {
                        createIntent(name: "NewIntent", sampleUtterance: "Do something") {
                            name
                            confidence
                        }
                    }
                """)
                .execute()
                .path("createIntent.name").entity(String.class).isEqualTo("NewIntent")
                .path("createIntent.confidence").entity(Double.class).isEqualTo(1.0);
    }
}
