package pl.clinic.labolratory_examination.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "examination_state")
public class ExaminationState {

    @Id
    @Column(name = "id", nullable = false)
    protected Long id;


    @Size(max = 20)
    @Column(name = "name", nullable = false)
    protected String name;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }
}