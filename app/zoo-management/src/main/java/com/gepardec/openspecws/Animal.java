package com.gepardec.openspecws;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "animals")
public class Animal extends PanacheEntity {
    @NotBlank
    public String name;
    @NotBlank
    public String species;
    public Integer age;
    public String enclosure;
    public String notes;
    @Column(name = "fun_fact")
    public String funFact;
}
