package pl.clinic.account.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, AccountId> {

    public Account findAppUserByUsername(String username);

    public Account findByUsername(String username);

}
