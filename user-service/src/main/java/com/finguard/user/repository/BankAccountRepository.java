package com.finguard.user.repository;

import com.finguard.user.entity.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
    List<BankAccount> findByUserProfileUserId(String userId);
}
