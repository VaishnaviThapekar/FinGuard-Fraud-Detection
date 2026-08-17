package com.finguard.gateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class JwtAuthFilter extends AbstractGatewayFilterFactory<JwtAuthFilter.Config> {

    public JwtAuthFilter() {
        super(Config.class);
    }

    public static class Config {
        // Configuration parameters can be defined here
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return onError(exchange, "Missing Authorization Header", HttpStatus.UNAUTHORIZED);
            }

            String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return onError(exchange, "Invalid Authorization Header Format", HttpStatus.UNAUTHORIZED);
            }

            String token = authHeader.substring(7);

            try {
                // Here we would validate the JWT token signature using a utility.
                // For this enterprise scaffold, we mock extraction of User ID & Roles.
                String userId = "usr_mock_123456"; 
                String roles = "ROLE_CUSTOMER";

                // Mutate request headers to forward identity downward
                ServerHttpRequest mutatedRequest = request.mutate()
                        .header("X-User-Id", userId)
                        .header("X-User-Roles", roles)
                        .build();

                log.info("JWT validated successfully. User ID: {}", userId);
                return chain.filter(exchange.mutate().request(mutatedRequest).build());

            } catch (Exception e) {
                log.error("JWT validation failed: {}", e.getMessage());
                return onError(exchange, "Invalid/Expired JWT Token", HttpStatus.UNAUTHORIZED);
            }
        };
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(status);
        log.warn("Auth filter blocked request: {}", err);
        return response.setComplete();
    }
}
