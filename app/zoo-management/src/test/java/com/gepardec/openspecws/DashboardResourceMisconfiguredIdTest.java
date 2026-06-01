package com.gepardec.openspecws;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.QuarkusTestProfile;
import io.quarkus.test.junit.TestProfile;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static io.restassured.RestAssured.given;

@QuarkusTest
@TestProfile(DashboardResourceMisconfiguredIdTest.MisconfiguredSpotlightProfile.class)
class DashboardResourceMisconfiguredIdTest {

    @Test
    void getSpotlightReturnsNotFoundWhenConfiguredAnimalIdDoesNotExist() {
        given()
                .when().get("/api/dashboard/spotlight")
                .then()
                .statusCode(404);
    }

    public static class MisconfiguredSpotlightProfile implements QuarkusTestProfile {
        @Override
        public Map<String, String> getConfigOverrides() {
            return Map.of("dashboard.spotlight.animal-id", "99999");
        }
    }
}
