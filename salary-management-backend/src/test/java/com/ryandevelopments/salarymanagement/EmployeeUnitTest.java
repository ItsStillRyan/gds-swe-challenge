package com.ryandevelopments.salarymanagement;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.ryandevelopments.salarymanagement.repository.EmployeeRepository;
import com.ryandevelopments.salarymanagement.model.Employee;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class EmployeeUnitTest {

    @Autowired
    EmployeeRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void should_find_no_users_if_repository_is_empty() {
        Iterable user = repository.findAll();

        assertThat(user).isEmpty();
    }

    @Test
    public void should_find_all_users() {
        Employee em1 = new Employee("ABC001", "EM1@ABCCO.COM", "EM1", 3000.21);
        entityManager.persist(em1);

        Employee em2 = new Employee("ABC002", "EM2@ABCCO.COM", "EM2", 2000.09);
        entityManager.persist(em2);

        Employee em3 = new Employee("ABC003", "EM3@ABCCO.COM", "EM3", 4000);
        entityManager.persist(em3);

        Iterable users = repository.findAll();

        assertThat(users).hasSize(3).contains(em1, em2, em3);
    }

    @Test
    public void should_find_users_by_id() {
        Employee em1 = new Employee("ABC001", "EM1@ABCCO.COM", "EM1", 3000.21);
        entityManager.persist(em1);

        Employee em2 = new Employee("ABC002", "EM2@ABCCO.COM", "EM2", 2000.09);
        entityManager.persist(em2);

        Employee foundUser = repository.findById(em2.getId()).get();

        assertThat(foundUser).isEqualTo(em2);
    }

    @Test
    public void should_find_users_by_name_containing_string() {
        Employee em1 = new Employee("ABC001", "EM1@ABCCO.COM", "Kenny", 3000.21);
        entityManager.persist(em1);

        Employee em2 = new Employee("ABC002", "EM2@ABCCO.COM", "Bobbey", 2000.09);
        entityManager.persist(em2);

        Employee em3 = new Employee("ABC003", "EM3@ABCCO.COM", "Danny", 4000);
        entityManager.persist(em3);

        Iterable users = repository.findByNameContaining("nny");

        assertThat(users).hasSize(2).contains(em1, em3);
    }

    @Test
    public void should_update_users_by_id() {
        Employee em1 = new Employee("ABC001", "EM1@ABCCO.COM", "EM1", 3000.21);
        entityManager.persist(em1);

        Employee em2 = new Employee("ABC002", "EM2@ABCCO.COM", "EM2", 2000.09);
        entityManager.persist(em2);

        Employee updatedEM = new Employee("updated ABC001", "updated EM1ABCCO.COM", "updated EM1", 6000.42);

        Employee em = repository.findById(em2.getId()).get();
        em.setName(updatedEM.getName());
        em.setSalary(updatedEM.getSalary());
        repository.save(em);

        Employee checkEm = repository.findById(em2.getId()).get();

        assertThat(checkEm.getName()).isEqualTo(updatedEM.getName());
        assertThat(checkEm.getSalary()).isEqualTo(updatedEM.getSalary());
    }

    @Test
    public void should_delete_users_by_id() {
        Employee em1 = new Employee("ABC001", "EM1@ABCCO.COM", "EM1", 3000.21);
        entityManager.persist(em1);

        Employee em2 = new Employee("ABC002", "EM2@ABCCO.COM", "EM2", 2000.09);
        entityManager.persist(em2);

        Employee em3 = new Employee("ABC003", "EM3@ABCCO.COM", "Danny", 4000);
        entityManager.persist(em3);

        repository.deleteById(em2.getId());

        Iterable users = repository.findAll();

        assertThat(users).hasSize(2).contains(em1, em3);
    }
}
