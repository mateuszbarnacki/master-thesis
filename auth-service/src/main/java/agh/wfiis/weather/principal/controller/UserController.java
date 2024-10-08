package agh.wfiis.weather.principal.controller;

import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.dto.UserInfoDto;
import agh.wfiis.weather.principal.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<UserInfoDto> getUsers() {
        return userService.getUsers();
    }

    @GetMapping(value = "/{username}/{project}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<ProjectDto> getUserProject(@PathVariable("username") String username,
                                                 @PathVariable("project") String project) {
        return userService.getUserProject(username, project);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(@Valid @RequestBody UserDto userDto) {
        userService.registerUser(userDto);
    }

    @PatchMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserInfoDto updateRolesAndProjects(@Valid @RequestBody UserInfoDto userInfoDto) {
        return userService.updateRolesAndProjects(userInfoDto);
    }
}
