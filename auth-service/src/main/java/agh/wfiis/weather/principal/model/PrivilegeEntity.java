package agh.wfiis.weather.principal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import org.hibernate.Hibernate;

import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "privilege", schema = "wfiis")
public class PrivilegeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "privileges")
    private Set<RoleEntity> roles = Set.of();

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

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || Hibernate.getClass(this) != Hibernate.getClass(obj)) return false;
        PrivilegeEntity privilegeEntity = (PrivilegeEntity) obj;
        return id != null && Objects.equals(id, privilegeEntity.id);
    }
}
