package agh.wfiis.weather.service;

import agh.wfiis.weather.dto.UserDto;

public interface UserService {
    /**
     * This method is used to create new user.
     *
     * @param userDto Object which contains user account data.
     */
    void registerUser(UserDto userDto);
}
