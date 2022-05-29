package com.example.demojsp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

@Entity
public class TimatrixItem {
    @javax.persistence.Id
    private Long id;

    @JoinColumn(name = "name")
    public String name;
    public String caption;
    public Integer category;


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
