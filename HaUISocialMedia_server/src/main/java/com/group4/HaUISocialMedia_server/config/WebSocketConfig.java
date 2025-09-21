package com.group4.HaUISocialMedia_server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // enable client register at url: "http://localhost:8080/ws"
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // user can send message to messenger with prefix "/messenger", for instance, "/messenger/privateMessage"
        registry.setApplicationDestinationPrefixes("/messenger");
        registry.enableSimpleBroker("/notification", "/user");

        // after client registed/connected in stomp endpoint registry, let client subscribe, for example, "/user/" + currentUser.id + "/privateMessage",
        registry.setUserDestinationPrefix("/user");
    }

}
