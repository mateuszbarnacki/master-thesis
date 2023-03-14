package agh.wfiis.weather.user.service;

import agh.wfiis.weather.user.dto.UserDto;

public interface UserService {
    /**
     * This method is used to create new user.
     *
     * @param userDto Object which contains user account data.
     */
    void registerUser(UserDto userDto);
}
