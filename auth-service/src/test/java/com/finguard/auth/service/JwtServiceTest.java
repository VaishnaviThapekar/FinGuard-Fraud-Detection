package com.finguard.auth.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    public void setUp() {
        jwtService = new JwtService();
        // Inject properties manually for unit testing
        ReflectionTestUtils.setField(jwtService, "secretKeyString", "dGhlLXN1cGVyLXNlY3JldC1maW5ndWFyZC1haS1hcGktZ2F0ZXdheS1rZXktMjU2LWJpdHMtZXhhbXBsZQ==");
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", 900000L); // 15 mins
        ReflectionTestUtils.setField(jwtService, "refreshExpiration", 604800000L); // 7 days
    }

    @Test
    public void testGenerateAndValidateToken() {
        String username = "analyst@finguard.com";
        List<String> roles = List.of("ROLE_ANALYST");

        String token = jwtService.generateToken(username, roles);
        assertNotNull(token);

        String extractedUser = jwtService.extractUsername(token);
        assertEquals(username, extractedUser);

        assertTrue(jwtService.isTokenValid(token, username));
        assertFalse(jwtService.isTokenValid(token, "other@user.com"));
    }

    @Test
    public void testGenerateRefreshToken() {
        String username = "analyst@finguard.com";

        String refreshToken = jwtService.generateRefreshToken(username);
        assertNotNull(refreshToken);

        String extractedUser = jwtService.extractUsername(refreshToken);
        assertEquals(username, extractedUser);
    }
}
