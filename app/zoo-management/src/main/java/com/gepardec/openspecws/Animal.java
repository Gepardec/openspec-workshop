package com.gepardec.openspecws;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "animals")
public class Animal extends PanacheEntity {
    public String name;
    public String species;
    public Integer age;
    public String enclosure;
    public String notes;
}
