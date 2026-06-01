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
        persistAnimal("Maja", "Lion", 7, "Savanna", "Keeps close to the lookout rock.");

        given()
                .when().get("/api/animals")
                .then()
                .statusCode(200)
                .body("size()", is(1))
                .body("[0].id", notNullValue())
                .body("[0].id", greaterThan(0))
                .body("[0].name", is("Maja"))
                .body("[0].species", is("Lion"));
    }

    @Test
    void getAnimalByIdReturnsAnimalWithAllFieldsWhenAnimalExists() {
        long animalId = persistAnimal("Kira", "Giraffe", 9, "Savanna 3", "Calm during medical checks.");

        given()
                .when().get("/api/animals/{id}", animalId)
                .then()
                .statusCode(200)
                .body("id", is((int) animalId))
                .body("name", is("Kira"))
                .body("species", is("Giraffe"))
                .body("age", is(9))
                .body("enclosure", is("Savanna 3"))
                .body("notes", is("Calm during medical checks."));
    }

    @Test
    void getAnimalByIdReturnsNotFoundWhenAnimalDoesNotExist() {
        given()
                .when().get("/api/animals/{id}", 99999)
                .then()
                .statusCode(404);
    }

    @Test
    void listAnimalsReturnsEmptyArrayWhenNoAnimalsAreRegistered() {
        given()
                .when().get("/api/animals")
                .then()
                .statusCode(200)
                .body("", empty());
    }

    @Transactional
    long persistAnimal(String name, String species, Integer age, String enclosure, String notes) {
        Animal animal = new Animal();
        animal.name = name;
        animal.species = species;
        animal.age = age;
        animal.enclosure = enclosure;
        animal.notes = notes;
        animal.persist();
        return animal.id;
    }
}
