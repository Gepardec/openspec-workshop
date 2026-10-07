package com.gepardec.openspecws;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Path("/enclosures")
@Produces(MediaType.APPLICATION_JSON)
public class EnclosureResource {

    @GET
    public List<EnclosureResponse> listEnclosures() {
        List<Animal> animals = Animal.listAll();

        Map<String, List<Animal>> animalsByEnclosure = animals.stream()
                .filter(animal -> animal.enclosure != null && !animal.enclosure.isBlank())
                .collect(Collectors.groupingBy(animal -> animal.enclosure, TreeMap::new, Collectors.toList()));

        return animalsByEnclosure.entrySet().stream()
                .map(entry -> new EnclosureResponse(
                        entry.getKey(),
                        entry.getValue().size(),
                        entry.getValue().stream()
                                .sorted(Comparator.comparing(animal -> animal.name))
                                .map(animal -> new EnclosureResponse.EnclosureAnimal(animal.id, animal.name, animal.species))
                                .toList()))
                .toList();
    }
}
