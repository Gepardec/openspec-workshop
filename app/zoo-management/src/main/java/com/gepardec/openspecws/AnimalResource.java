package com.gepardec.openspecws;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
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
}
