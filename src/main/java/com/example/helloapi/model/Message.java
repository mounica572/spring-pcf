package com.example.helloapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Document(collection = "messages")
public class Message {
    @Id
    private String id;

    @NotBlank
    @Size(max = 140)
    private String text;

    @NotBlank
    private String username; 

    @NotNull
    private Date createdAt = new Date();

    public Message() {
    }

    public Message(String id, String text, String username) {
        this.id = id;
        this.text = text;
        this.username = username; 
        
    }

    public String getId() {
        return id;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}