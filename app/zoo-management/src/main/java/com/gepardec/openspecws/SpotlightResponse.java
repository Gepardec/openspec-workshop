package com.gepardec.openspecws;

public record SpotlightResponse(
        Long id,
        String name,
        String species,
        Integer age,
        String enclosure,
        String funFact
) {
}
