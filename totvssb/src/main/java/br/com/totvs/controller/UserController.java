package br.com.totvs.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.totvs.entity.Status;
import br.com.totvs.entity.User;
import br.com.totvs.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/find/all")
	public List<User> findAll() {
		return userRepository.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/save")
	public User save(@RequestBody User user) throws Exception {
		user.setEnabled(true);
		user.setStatus(Status.N);
		if(userRepository.findByDocNumber(user.getDocNumber()) != null) {
			throw new Exception ("Este usuário já existe.");
		}
		return userRepository.save(user);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/import")
	public List<User> importUsers(@RequestBody List<User> users) {
		List<User> repeatedUsers = new ArrayList<>();
		for(User user: users) {
			user.setEnabled(true);
			user.setStatus(Status.I);
			if(userRepository.findByDocNumber(user.getDocNumber()) != null && userRepository.findByDocNumber(user.getDocNumber()).isEnabled()) {
				repeatedUsers.add(user);
			} else {
				userRepository.save(user);
			}
		}
		if(repeatedUsers.isEmpty()) {
			return null;
		} else {
			return repeatedUsers;
		}
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/save/error")
	public void importUsersWithErrors(@RequestBody List<User> users) {
		for(User user: users) {
			user.setEnabled(false);
			user.setStatus(Status.E);
			userRepository.save(user);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(value="/delete/{id}")
	public void delete(@PathVariable(value = "id") Long userId) {
		User user = userRepository.findById(userId).get();
		userRepository.delete(user);
	}

}
