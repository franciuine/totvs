package br.com.totvs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.totvs.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByDocNumber(String docNumber);

}
