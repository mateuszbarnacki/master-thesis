package agh.wfiis.weather.auth.controller;

import agh.wfiis.weather.auth.jwt.service.JwtService;
import agh.wfiis.weather.auth.dto.AuthenticationDto;
import agh.wfiis.weather.auth.dto.AuthenticationResponseDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authentication")
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(JwtService jwtService, AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/auth")
    public AuthenticationResponseDto createToken(@RequestBody AuthenticationDto dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.username(), dto.password()));
        String token = jwtService.generateToken(authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new AuthenticationResponseDto(token, authentication.getName());
    }
}
