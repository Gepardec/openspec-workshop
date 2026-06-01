package com.gepardec.openspecws;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class DashboardResourceTest {

    private static final long SPOTLIGHT_ID = 6L;

    @Inject
    EntityManager entityManager;

    @BeforeEach
    @Transactional
    void seedSpotlightAnimal() {
        entityManager.createQuery("delete from Animal").executeUpdate();
        entityManager.createNativeQuery("""
                        insert into animals (id, name, species, age, enclosure, notes, fun_fact)
                        values (?1, ?2, ?3, ?4, ?5, ?6, ?7)
                        """)
                .setParameter(1, SPOTLIGHT_ID)
                .setParameter(2, "Blitz")
                .setParameter(3, "Gepard")
                .setParameter(4, 4)
                .setParameter(5, "Raubkatzen-Areal")
                .setParameter(6, "Reagiert gut auf Enrichment-Training.")
                .setParameter(7, "Kann in wenigen Sekunden von 0 auf 100 km/h sprinten.")
                .executeUpdate();
    }

    @Test
    void getSpotlightReturnsConfiguredAnimalWhenItExists() {
        given()
                .when().get("/api/dashboard/spotlight")
                .then()
                .statusCode(200)
                .body("id", is((int) SPOTLIGHT_ID))
                .body("name", is("Blitz"))
                .body("species", is("Gepard"))
                .body("age", is(4))
                .body("enclosure", is("Raubkatzen-Areal"))
                .body("funFact", is("Kann in wenigen Sekunden von 0 auf 100 km/h sprinten."));
    }
}
