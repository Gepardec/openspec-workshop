package com.gepardec.openspecws;

import java.util.List;

public record EnclosureResponse(
        String name,
        int animalCount,
        List<EnclosureAnimal> animals
) {

    public record EnclosureAnimal(Long id, String name, String species) {
    }
}
