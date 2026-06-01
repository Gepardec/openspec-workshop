package com.gepardec.openspecws;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.matchesRegex;
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

    @Test
    void createAnimalReturnsCreatedWithLocationHeaderAndCreatedAnimalBody() {
        Response response = given()
                .contentType(ContentType.JSON)
                .body("""
                        {
                          "name": "Nala",
                          "species": "Lion",
                          "age": 5,
                          "enclosure": "Savanna 2",
                          "notes": "Recently joined the pride."
                        }
                        """)
                .when().post("/api/animals");

        int createdId = response.jsonPath().getInt("id");

        response
                .then()
                .statusCode(201)
                .header("Location", matchesRegex(".*/animals/\\d+"))
                .header("Location", endsWith("/api/animals/" + createdId))
                .body("id", notNullValue())
                .body("id", greaterThan(0))
                .body("name", is("Nala"))
                .body("species", is("Lion"))
                .body("age", is(5))
                .body("enclosure", is("Savanna 2"))
                .body("notes", is("Recently joined the pride."));
    }

    @Test
    void createAnimalReturnsBadRequestWhenRequiredFieldsAreMissing() {
        given()
                .contentType(ContentType.JSON)
                .body("""
                        {
                          "species": "Elephant",
                          "age": 14,
                          "enclosure": "Grassland",
                          "notes": "Very social."
                        }
                        """)
                .when().post("/api/animals")
                .then()
                .statusCode(400);
    }

    @Test
    void updateAnimalReturnsOkWithUpdatedAnimalWhenAnimalExists() {
        long animalId = persistAnimal("Nora", "Bear", 6, "Forest 2", "Enjoys climbing.");

        given()
                .contentType(ContentType.JSON)
                .body("""
                        {
                          "name": "Nora",
                          "species": "Brown Bear",
                          "age": 7,
                          "enclosure": "Forest 3",
                          "notes": "Moved to a larger habitat."
                        }
                        """)
                .when().put("/api/animals/{id}", animalId)
                .then()
                .statusCode(200)
                .body("id", is((int) animalId))
                .body("name", is("Nora"))
                .body("species", is("Brown Bear"))
                .body("age", is(7))
                .body("enclosure", is("Forest 3"))
                .body("notes", is("Moved to a larger habitat."));
    }

    @Test
    void updateAnimalReturnsBadRequestWhenRequiredFieldsAreMissing() {
        long animalId = persistAnimal("Milo", "Monkey", 4, "Jungle 1", "Very curious.");

        given()
                .contentType(ContentType.JSON)
                .body("""
                        {
                          "species": "Monkey",
                          "age": 5,
                          "enclosure": "Jungle 2",
                          "notes": "Changed enclosure."
                        }
                        """)
                .when().put("/api/animals/{id}", animalId)
                .then()
                .statusCode(400);
    }

    @Test
    void updateAnimalReturnsNotFoundWhenAnimalDoesNotExist() {
        given()
                .contentType(ContentType.JSON)
                .body("""
                        {
                          "name": "Luna",
                          "species": "Wolf",
                          "age": 3,
                          "enclosure": "Mountain Ridge",
                          "notes": "Prefers dusk feeding."
                        }
                        """)
                .when().put("/api/animals/{id}", 99999)
                .then()
                .statusCode(404);
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
