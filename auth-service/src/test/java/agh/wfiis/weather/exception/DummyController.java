package agh.wfiis.weather.exception;

import agh.wfiis.weather.principal.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/error")
public class DummyController {

    @GetMapping("/role-not-found")
    public ResponseEntity<UserDto> testRoleNotFoundException() {
        throw new RoleNotFoundException("KLAUN");
    }

    @GetMapping("/privilege-not-found")
    public ResponseEntity<UserDto> testPrivilegeNotFoundException() {
        throw new PrivilegeNotFoundException("TEST");
    }

    @GetMapping("/project-not-found")
    public ResponseEntity<UserDto> testProjectNotFoundException() {
        throw new ProjectNotFoundException("test_proj");
    }

    @GetMapping("/action-not-found")
    public ResponseEntity<UserDto> testActionNotFound() {
        throw new ActionNotFoundException("TRUTUTU");
    }

    @GetMapping("user-already-exists")
    public ResponseEntity<UserDto> testUserAlreadyExists() {
        throw new UserAlreadyExistsException();
    }
}
