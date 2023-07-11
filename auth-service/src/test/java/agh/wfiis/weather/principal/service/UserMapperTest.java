package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.model.RoleEntity;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.RoleRepository;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;
import java.util.Set;

@SpringBootTest
class UserMapperTest {
    private static final String READER_ROLE = "READER";
    private static final String WRITER_ROLE = "WRITER";
    @Autowired
    private UserMapper userMapper;
    @MockBean
    private RoleRepository roleRepository;

    @Test
    void shouldMapDtoToEntity() {
        RoleEntity reader = new RoleEntity();
        RoleEntity writer = new RoleEntity();
        reader.setName(READER_ROLE);
        writer.setName(WRITER_ROLE);
        Mockito.when(roleRepository.findByName(READER_ROLE)).thenReturn(Optional.of(reader));
        Mockito.when(roleRepository.findByName(WRITER_ROLE)).thenReturn(Optional.of(writer));
        UserDto dto = givenUserDto();

        UserEntity entity = whenMapUserDtoToUserEntity(dto);

        AssertionsForClassTypes.assertThat(entity)
                .hasFieldOrPropertyWithValue("username", "Test")
                .hasFieldOrPropertyWithValue("email", "testowy@test.com")
                .hasFieldOrPropertyWithValue("description", "User for test purposes")
                .hasFieldOrPropertyWithValue("roles", Set.of(reader, writer));
    }

    private UserDto givenUserDto() {
        return new UserDto("Test",
                "testowy@test.com",
                "User for test purposes",
                "1243",
                Set.of(UserRole.READER, UserRole.WRITER));
    }

    private UserEntity whenMapUserDtoToUserEntity(UserDto dto) {
        return userMapper.mapDtoToEntity(dto);
    }
}
