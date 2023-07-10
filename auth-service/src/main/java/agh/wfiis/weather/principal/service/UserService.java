package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.principal.dto.UserDto;

public interface UserService {
    /**
     * This method is used to create new user.
     *
     * @param userDto Object which contains user account data.
     */
    void registerUser(UserDto userDto);
}
