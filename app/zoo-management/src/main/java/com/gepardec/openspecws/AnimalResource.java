package com.gepardec.openspecws;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/animals")
@Produces(MediaType.APPLICATION_JSON)
public class AnimalResource {

    @GET
    public List<Animal> listAnimals() {
        return Animal.listAll();
    }

    @GET
    @Path("/{id}")
    public Animal getAnimalById(@PathParam("id") Long id) {
        Animal animal = Animal.findById(id);

        if (animal == null) {
            throw new NotFoundException();
        }

        return animal;
    }
}
