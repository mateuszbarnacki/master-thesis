package agh.wfiis.weather.principal.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import org.hibernate.Hibernate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "user", schema = "wfiis")
public class UserEntity implements UserDetails {
    @Id
    @SequenceGenerator(
            name = "user_seq_gen",
            schema = "wfiis",
            sequenceName = "user_seq",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_seq_gen")
    private Long id;

    private String username;
    private String email;
    private String description;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_role", schema = "wfiis",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<RoleEntity> roles = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProjectEntity> projects = new HashSet<>();

    public Set<RoleEntity> getRoles() {
        return this.roles;
    }

    public void addRoles(Set<RoleEntity> roles) {
        this.roles.addAll(roles);
    }

    public void clearRoles() {
        this.roles.clear();
    }

    public Set<ProjectEntity> getProjects() {
        return this.projects;
    }

    public void setProjects(Set<ProjectEntity> projects) {
        for (ProjectEntity project : projects) {
            project.setUser(this);
        }
        this.projects.clear();
        this.projects.addAll(projects);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(RoleEntity::getPrivileges)
                .flatMap(Collection::stream)
                .map(PrivilegeEntity::getName)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || Hibernate.getClass(this) != Hibernate.getClass(obj)) return false;
        UserEntity userEntity = (UserEntity) obj;
        return id != null && Objects.equals(id, userEntity.id);
    }
}
