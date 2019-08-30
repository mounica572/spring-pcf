package com.example.helloapi.controller;

import com.example.helloapi.model.Message;
import com.example.helloapi.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/messages")
    public Flux<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/messages")
    public Mono<Message> createMessages(@Valid @RequestBody Message message) {
        return messageRepository.save(message);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/messages/{id}")
    public Mono<ResponseEntity<Message>> getMessageById(@PathVariable(value = "id") String messageId) {
        return messageRepository.findById(messageId).map(savedMessage -> ResponseEntity.ok(savedMessage))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/messages/{id}")
    public Mono<ResponseEntity<Void>> deleteMessage(@PathVariable(value = "id") String messageId) {

        return messageRepository.findById(messageId)
                .flatMap(existingMessage -> messageRepository.delete(existingMessage)
                        .then(Mono.just(new ResponseEntity<Void>(HttpStatus.OK))))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/messages/")
    public Mono<Void> deleteAll() {
        return messageRepository.deleteAll();
    }

    // websocket

    @MessageMapping("/hello")

    @SendTo("/topic/messages")

    public Mono<Message> socketMessage(Message message) throws Exception {

        return messageRepository.save(message);
        // return new Message("123", "test message", message);
    }

    // Messages are Sent to the client as Server Sent Events
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/stream/messages", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Message> streamAllMessages() {
        return messageRepository.findAll();
    }
}