package com.gepardec.openspecws;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Path("/dashboard")
@Produces(MediaType.APPLICATION_JSON)
public class DashboardResource {

    @ConfigProperty(name = "dashboard.spotlight.animal-id")
    Long spotlightAnimalId;

    @GET
    @Path("/spotlight")
    public SpotlightResponse getSpotlightAnimal() {
        Animal spotlightAnimal = Animal.findById(spotlightAnimalId);

        if (spotlightAnimal == null) {
            throw new NotFoundException();
        }

        return new SpotlightResponse(
                spotlightAnimal.id,
                spotlightAnimal.name,
                spotlightAnimal.species,
                spotlightAnimal.age,
                spotlightAnimal.enclosure,
                spotlightAnimal.funFact
        );
    }
}
