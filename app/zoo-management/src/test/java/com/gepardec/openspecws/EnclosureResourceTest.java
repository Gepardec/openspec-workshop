package com.gepardec.openspecws;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.notNullValue;

@QuarkusTest
class EnclosureResourceTest {

    @BeforeEach
    @Transactional
    void deleteAnimals() {
        Animal.deleteAll();
    }

    @Test
    void listEnclosuresGroupsAnimalsByEnclosureSortedByName() {
        persistAnimal("Nala", "Lion", "Savanna");
        persistAnimal("Kira", "Giraffe", "Savanna");
        persistAnimal("Pingu", "Penguin", "Polar World");

        given()
                .when().get("/api/enclosures")
                .then()
                .statusCode(200)
                .body("size()", is(2))
                .body("[0].name", is("Polar World"))
                .body("[0].animalCount", is(1))
                .body("[0].animals.size()", is(1))
                .body("[0].animals[0].name", is("Pingu"))
                .body("[1].name", is("Savanna"))
                .body("[1].animalCount", is(2))
                .body("[1].animals.name", contains("Kira", "Nala"))
                .body("[1].animals[0].id", notNullValue())
                .body("[1].animals[0].species", is("Giraffe"));
    }

    @Test
    void listEnclosuresExcludesAnimalsWithoutEnclosure() {
        persistAnimal("Nala", "Lion", "Savanna");
        persistAnimal("Lost", "Fox", null);
        persistAnimal("Blank", "Owl", "  ");

        given()
                .when().get("/api/enclosures")
                .then()
                .statusCode(200)
                .body("size()", is(1))
                .body("[0].name", is("Savanna"))
                .body("[0].animalCount", is(1));
    }

    @Test
    void listEnclosuresReturnsEmptyArrayWhenNoAnimalsAreRegistered() {
        given()
                .when().get("/api/enclosures")
                .then()
                .statusCode(200)
                .body("", empty());
    }

    @Transactional
    void persistAnimal(String name, String species, String enclosure) {
        Animal animal = new Animal();
        animal.name = name;
        animal.species = species;
        animal.enclosure = enclosure;
        animal.persist();
    }
}
