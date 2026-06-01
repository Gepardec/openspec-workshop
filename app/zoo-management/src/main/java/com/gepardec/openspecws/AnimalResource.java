package com.gepardec.openspecws;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import java.net.URI;
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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createAnimal(@Valid Animal animal, @Context UriInfo uriInfo) {
        animal.persist();
        URI location = uriInfo.getAbsolutePathBuilder().path(String.valueOf(animal.id)).build();

        return Response.created(location).entity(animal).build();
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response updateAnimal(@PathParam("id") Long id, @Valid Animal updatedAnimal) {
        Animal animal = Animal.findById(id);

        if (animal == null) {
            throw new NotFoundException();
        }

        animal.name = updatedAnimal.name;
        animal.species = updatedAnimal.species;
        animal.age = updatedAnimal.age;
        animal.enclosure = updatedAnimal.enclosure;
        animal.notes = updatedAnimal.notes;
        animal.funFact = updatedAnimal.funFact;
        animal.persist();

        return Response.ok(animal).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteAnimal(@PathParam("id") Long id) {
        boolean isDeleted = Animal.deleteById(id);

        if (!isDeleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.noContent().build();
    }
}
