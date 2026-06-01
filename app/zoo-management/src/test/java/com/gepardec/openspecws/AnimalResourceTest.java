package com.gepardec.openspecws;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.notNullValue;

@QuarkusTest
class AnimalResourceTest {

    @BeforeEach
    @Transactional
    void deleteAnimals() {
        Animal.deleteAll();
    }

    @Test
    void listAnimalsReturnsJsonArrayWithRegisteredAnimals() {
        persistAnimal("Maja", "Lion");

        given()
                .when().get("/animals")
                .then()
                .statusCode(200)
                .body("size()", is(1))
                .body("[0].id", notNullValue())
                .body("[0].id", greaterThan(0))
                .body("[0].name", is("Maja"))
                .body("[0].species", is("Lion"));
    }

    @Test
    void listAnimalsReturnsEmptyArrayWhenNoAnimalsAreRegistered() {
        given()
                .when().get("/animals")
                .then()
                .statusCode(200)
                .body("", empty());
    }

    @Transactional
    void persistAnimal(String name, String species) {
        Animal animal = new Animal();
        animal.name = name;
        animal.species = species;
        animal.persist();
    }
}
