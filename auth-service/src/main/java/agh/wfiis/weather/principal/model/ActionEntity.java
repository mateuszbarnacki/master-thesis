package agh.wfiis.weather.principal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import org.hibernate.Hibernate;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "action", schema = "wfiis")
public class ActionEntity {
    @Id
    @SequenceGenerator(
            name = "action_seq_gen",
            schema = "wfiis",
            sequenceName = "action_seq",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "action_seq_gen")
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "actions")
    private Set<ProjectEntity> projects = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addProjects(Set<ProjectEntity> projects) {
        this.projects.addAll(projects);
    }

    public void clearProjects() {
        this.projects.clear();
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || Hibernate.getClass(this) != Hibernate.getClass(obj)) return false;
        ActionEntity actionEntity = (ActionEntity) obj;
        return id != null && Objects.equals(id, actionEntity.id);
    }
}
