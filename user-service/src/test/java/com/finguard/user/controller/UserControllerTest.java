package com.finguard.user.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetUserProfile() throws Exception {
        String testUserId = "usr_mock_123456";

        mockMvc.perform(get("/api/v1/users/profile")
                        .header("X-User-Id", testUserId)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(testUserId))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"));
    }

    @Test
    public void testGetAccounts() throws Exception {
        String testUserId = "usr_mock_123456";

        mockMvc.perform(get("/api/v1/users/accounts")
                        .header("X-User-Id", testUserId)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].accountId").value("acc_savings_001"))
                .andExpect(jsonPath("$[0].accountNumber").value("US9876543210"))
                .andExpect(jsonPath("$[0].balance").value(12450.75));
    }
}
