package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.dto.UserInfoDto;

import java.util.List;

public interface UserService {
    /**
     * This method is used to create new user.
     *
     * @param userDto Object which contains user account data.
     */
    void registerUser(UserDto userDto);

    /**
     * This method returns user list with objects contain user information.
     *
     * @return List<UserInfoDto> List of user objects which contains username, roles and projects in
     * which user is enrolled.
     */
    List<UserInfoDto> getUsers();
}
