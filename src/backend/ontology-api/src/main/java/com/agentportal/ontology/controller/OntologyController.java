package com.agentportal.ontology.controller;

import com.agentportal.ontology.domain.*;
import com.agentportal.ontology.repository.*;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
public class OntologyController {

    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final FunctionRepository functionRepository;
    private final IntentRepository intentRepository;

    public OntologyController(UserRepository userRepository, 
                              ApplicationRepository applicationRepository,
                              FunctionRepository functionRepository,
                              IntentRepository intentRepository) {
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
        this.functionRepository = functionRepository;
        this.intentRepository = intentRepository;
    }

    @QueryMapping
    public Optional<User> getUser(@Argument String accountId) {
        return userRepository.findByAccountId(accountId);
    }

    @QueryMapping
    public List<Application> getApplications() {
        return applicationRepository.findAll();
    }

    @QueryMapping
    public Optional<Application> getApplication(@Argument String id) {
        return applicationRepository.findById(id);
    }

    @QueryMapping
    public List<Function> findFunctions(@Argument String text) {
        return functionRepository.searchFunctions(text);
    }

    @MutationMapping
    public Intent createIntent(@Argument String name, @Argument String sampleUtterance) {
        Intent intent = new Intent();
        intent.setId(UUID.randomUUID().toString()); // Simple ID generation
        intent.setName(name);
        intent.setSampleUtterance(sampleUtterance);
        // Default values
        intent.setConfidence(1.0); 
        return intentRepository.save(intent);
    }
}
